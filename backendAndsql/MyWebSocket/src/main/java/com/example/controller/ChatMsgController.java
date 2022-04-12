package com.example.controller;

import com.example.mapper.ChatMsgMapper;
import com.example.msg.ChatFormat;
import com.example.pojo.ChatMsg;
import com.example.pojo.UserPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

@CrossOrigin
@RestController
public class ChatMsgController {

    @Autowired
    ChatMsgMapper chatMsgMapper;

    /**
     * @description  簽收信息...
     * @param ids    字符串ID
     */
    @GetMapping("/signMsg")
    public  boolean signMsg(String ids){
        String[] split = ids.split(",");
        List<ChatMsg> chatMessages =new ArrayList<>();
        for (String id:split) {
            ChatMsg chatMsg = new ChatMsg();
            chatMsg.setSignFlag(1);
            chatMsg.setId(Integer.parseInt(id));
            chatMessages.add(chatMsg);
        }
        return 1==chatMsgMapper.updateMulChatMsg(chatMessages);
    }


    /**
     * @description 返回未簽收的信息...不是指未讀
     * @return
     */
    @GetMapping("/getNotReceiveMsg")
    public List<ChatFormat> getUnReceiveMsg(int userId){

        return chatMsgMapper.queryAllMsgWithSenderInfo(userId,0,100);

    }

    @GetMapping("/addMessage")
    public boolean addMessage(ChatMsg chatMsg){
        return 1==chatMsgMapper.insertSelective(chatMsg);
    }


    @PostMapping("/sendMessage")
    public Map<String, Object> sendMessage (MultipartFile []files, int senderId, int receiverId){


        HashMap<String, Object> map = new HashMap<String,Object>();
        ChatMsg chatMsg = new ChatMsg();

        //  File isExist =new File("C:\\Users\\Computer\\Desktop\\springboot\\MyWebSocket"+
        //          usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getIcon()
        //  );
        // System.out.println(usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getIcon());
        /**
         * @description  這里把多張圖片存放到同一個字符串....例如:  1.png,2.png, .....
         */
        StringBuffer imagesPath =new StringBuffer();

        for (int i = 0; i < files.length ; i++) {
            String filename = System.currentTimeMillis()+files[i].getOriginalFilename();

            String filePath = System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                    +System.getProperty("file.separator")+"message"+System.getProperty("file.separator");
            //路徑不存在,迎增該路徑....
            File file1=new File(filePath);
            if(!file1.exists()){
                file1.mkdir();
            }
            //實際的文件地址...
            File dist=new File(filePath+System.getProperty("file.separator")+filename);
            //存到數據庫...
            String storePath="/img/message/"+filename;

            if(i == files.length-1){
                imagesPath.append(storePath);
            }else {
                imagesPath.append(storePath+',');
            }


            try {
                files[i].transferTo(dist);

            } catch (IOException e) {
                e.printStackTrace();
                map.put("msg","文件上傳失敗");
                return map;
            }
        }


        chatMsg.setMsg(imagesPath.toString());
        chatMsg.setSendUserId(senderId);
        chatMsg.setReceiveUserId(receiverId);
        chatMsg.setSignFlag(0);
        chatMsg.setCreateTime(new Timestamp(new Date().getTime()));


        int i = chatMsgMapper.insertSelective(chatMsg);

        if(i>0){
            map.put("msg","圖片上傳成功");
            map.put("imagePath",imagesPath);
            map.put("msgId",chatMsg.getId());
            return  map;
        }


        map.put("msg","圖片上傳失敗");
        return  map;


    }


}
