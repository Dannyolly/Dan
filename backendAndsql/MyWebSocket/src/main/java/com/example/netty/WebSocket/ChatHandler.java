package com.example.netty.WebSocket;

import com.alibaba.fastjson.JSON;
import com.example.controller.FriendRequestController;
import com.example.controller.UserController;
import com.example.mapper.ChatMsgMapper;
import com.example.mapper.UsersMapper;
import com.example.netty.enums.ActionEnums;
import com.example.netty.messageData.ChatMsg;
import com.example.netty.messageData.MessageData;
import com.example.netty.userChannelRelationship.UserChannelRelationship;
import com.example.pojo.Users;
import com.example.utils.JsonUtils;
import com.example.utils.SpringUtil;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.codec.http.*;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.util.CharsetUtil;
import io.netty.util.concurrent.GlobalEventExecutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

import static com.example.netty.enums.ActionEnums.CHAT;


@ChannelHandler.Sharable
public class ChatHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {



    //用于記錄 和 管理所有客戶端的channel;
    public static final ChannelGroup clients = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) throws Exception {


        // 1. 這里是獲取信息...
        String message =msg.text();
        ChatMsgMapper chatMsgMapper =(ChatMsgMapper) SpringUtil.getBean("chatMsgMapper");
        String s = JSON.parse(message).toString();
        MessageData messageData = JsonUtils.jsonToPojo(s,MessageData.class);
        Integer action = messageData.getAction();
        Channel channel= ctx.channel();

        // 2.判斷甚麼類型
        if(action.equals(ActionEnums.CONNECT.type)){
            // 2.1 第一次連的時候...
            Integer senderId = messageData.getChatMsg().getSenderId();
            UserChannelRelationship.put(senderId,channel);
            UserChannelRelationship.put(channel.id(),senderId);
            System.out.println("id:"+senderId+"已連接");

        }else if(action.equals(CHAT.type)){
            //2.2 聊天類型, 保存到數據庫
            ChatMsg chatMsg= messageData.getChatMsg();
            chatMsg.setSendTime(new Timestamp(new Date().getTime()));

            com.example.pojo.ChatMsg chatMsg1 = new com.example.pojo.ChatMsg();
            chatMsg1.setMsg(chatMsg.getMessage());
            chatMsg1.setReceiveUserId(chatMsg.getReceiverId());
            chatMsg1.setSendUserId(chatMsg.getSenderId());
            chatMsg1.setCreateTime(chatMsg.getSendTime());
            chatMsg1.setSignFlag(0);

            // 這個是給收圖片用到簽到狀態.
            if(chatMsg.getMessage().charAt(0) == '/' ){

            }else{
                chatMsgMapper.insertSelective(chatMsg1);
            }



            //發送消息
            Channel receiverChannel=UserChannelRelationship.get(chatMsg.getReceiverId());
            if(receiverChannel == null){
                // 即發送給的用戶沒有連接
                // 用戶從沒連接過

            }else {
                // 在線用戶...

                //1. 先查找一下用戶是不是在用戶表當中..
                Channel liveUser = clients.find(receiverChannel.id());
                if(liveUser != null){
                    if(messageData.getExtendField() != null){
                        chatMsg1.setId(Integer.parseInt(messageData.getExtendField()));
                    }
                    liveUser.writeAndFlush(
                            new TextWebSocketFrame(
                                 JsonUtils.pojoToJson(chatMsg1)
                            )
                    );
                }else {
                   //離線用戶... 連接但離線...
                    System.out.println("你發送的對象為離線用戶...");

                }

            }

        }else if (action.equals(ActionEnums.SIGNED.type)){

            //簽收

            com.example.pojo.ChatMsg chatMsg = new com.example.pojo.ChatMsg();


            // 擴展符是用來前端傳給後端的消息ID  有, 分開...
            String extendField = messageData.getExtendField();
            String[] msgIds = extendField.split(",");
            // 不為空則...
            if(msgIds.length !=0 ){

                chatMsg.setSignFlag(1);
                for (String msgId:msgIds) {
                    chatMsg.setId(Integer.parseInt(msgId));
                    chatMsgMapper.updateByPrimaryKeySelective(chatMsg);
                }

            }



        }else if (action.equals(ActionEnums.KEEPALIVE.type)){
            System.out.println("收到來自Channel ["+channel.id()+"]的心跳包...");

        }else if (action.equals(ActionEnums.PULL_FRIEND.type)){

            ChatMsg chatMsg= messageData.getChatMsg();
            Channel receiverChannel=UserChannelRelationship.get(chatMsg.getReceiverId());
            if(receiverChannel != null){

                //1. 先查找一下用戶是不是在用戶表當中..
                Channel liveUser = clients.find(receiverChannel.id());
                if(liveUser != null){
                    // 線上用戶...
                    liveUser.writeAndFlush(
                            new TextWebSocketFrame(
                                    JsonUtils.pojoToJson(messageData)
                            )
                    );

                }
                // 用戶離線 或 在線都要先存入數據庫...
                FriendRequestController friendRequestController = (FriendRequestController) SpringUtil.getBean("friendRequestController");
                friendRequestController.AddRequest(chatMsg.getSenderId(),chatMsg.getReceiverId(),"");


            }

        }

    }



    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        super.handlerRemoved(ctx);
        clients.remove(ctx.channel());


        Integer userId = UserChannelRelationship.get(ctx.channel().id());
        UserController userController = (UserController) SpringUtil.getBean("userController");
        Users users = new Users();
        users.setId(userId);
        users.setOnline(0);
        userController.userOnline(users);

        System.out.println("客戶端斷開 ,channel ID="+ctx.channel().id().asLongText());
        System.out.println("客戶端斷開 ,channel ID="+ctx.channel().id().asShortText());
    }

    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {


        clients.add(ctx.channel());
        System.out.println("add handler");
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        super.channelActive(ctx);
        System.out.println("channel active");
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        super.channelInactive(ctx);
        System.out.println("channel inactive");
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        super.channelReadComplete(ctx);
        System.out.println("channel Read Complete");
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        super.userEventTriggered(ctx, evt);
        System.out.println("user Event Triggered");
    }

    @Override
    public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
        super.channelWritabilityChanged(ctx);
        System.out.println("channel 可寫更改");
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {


        super.exceptionCaught(ctx, cause);
        ctx.channel().close();
        clients.remove(ctx.channel());
        System.out.println(clients);


    }



}
