package com.example.netty.WebSocket;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;

/**
 * 用于檢測channel的心跳handler
 */
public class HeartBeatHandler extends ChannelInboundHandlerAdapter {



    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        //super.userEventTriggered(ctx, evt);
        if(evt instanceof IdleStateEvent){
            IdleStateEvent evt1 = (IdleStateEvent) evt;
            if(evt1.state()== IdleState.READER_IDLE){

            }else if(evt1.state()== IdleState.WRITER_IDLE){

            }else if(evt1.state()== IdleState.ALL_IDLE){
                System.out.println("channel 關閉之前的 user 數量:"+ChatHandler.clients.size() );

                Channel channel = ctx.channel();
                channel.close();
                System.out.println("channel 關閉之後的 user 數量:"+ChatHandler.clients.size());
            }
        }
    }
}
