package com.example.controller;


import com.example.mapper.FriendRequestMapper;
import com.example.mapper.MyFriendsMapper;
import com.example.msg.Requester;
import com.example.pojo.FriendRequest;
import com.example.pojo.MyFriends;
import com.example.pojo.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
public class FriendRequestController {

    @Autowired
    FriendRequestMapper friendRequestMapper;

    @Autowired
    MyFriendsMapper myFriendsMapper;

    /**
     * @description     發送好友  status 0 是未接受
     * @param           senderId
     * @param           receiverId
     * @return
     */
    @GetMapping("/addRequest")
    public Map<String, Object> AddRequest(int senderId , int receiverId,String message){

        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setSendUserId(senderId);
        friendRequest.setReceiveUserId(receiverId);
        friendRequest.setStatus(0);
        friendRequest.setRequestMessage(message);
        friendRequest.setRead(0);
        friendRequest.setRequestDateTime(new Timestamp(new Date().getTime()));
        int res = friendRequestMapper.insertSelective(friendRequest);

        if(res!=0){
            HashMap<String, Object> map = new HashMap<>();
            map.put("msg","inserted");
            return  map;
        }else{
            HashMap<String, Object> map = new HashMap<>();
            map.put("msg","error");
            return  map;
        }
    }


    /**
     * @description 獲取所有請求好友的資料
     * @param       userId Interger
     * @return
     */
    @GetMapping("/getAddRequest")
    public List<Requester> getAllAddRequest(int userId){
        return friendRequestMapper.getAllRequester(userId);
    }

    /**
     * @description  確認好友請求
     */
    @GetMapping("/confirmRelationship")
    public boolean confirmRelationship(int requestId,int receiverId ,int senderId){
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setStatus(1);
        friendRequest.setId(requestId);
        friendRequestMapper.updateByPrimaryKeySelective(friendRequest);

        MyFriends myFriends = new MyFriends();
        MyFriends myFriends1 = new MyFriends();

        myFriends1.setMyUserId(receiverId);
        myFriends.setMyUserId(senderId);
        myFriends.setMyFriendsId(receiverId);
        myFriends1.setMyFriendsId(senderId);

        myFriendsMapper.insertSelective(myFriends);
        myFriendsMapper.insertSelective(myFriends1);

        return true;
    }

    /**
     * @description  已讀好友請求
     */
    @GetMapping("/readMessage")
    public boolean readMessage(int id ){
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setRead(1);
        friendRequest.setId(id);

        return 0 != friendRequestMapper.updateByPrimaryKeySelective(friendRequest);
    }


}
