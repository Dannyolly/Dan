package com.example.controller;

import com.example.mapper.MyFriendsMapper;
import com.example.mapper.UsersMapper;
import com.example.pojo.MyFriends;
import com.example.pojo.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class MyFriendsController {


    @Autowired
    MyFriendsMapper myFriendsMapper;

    @Autowired
    UsersMapper usersMapper;

    /**
     * @description  根據userID 返回所有好友
     * @param   userId
     * @return  List<Users>
     */
    @GetMapping("/friendList")
    public List<Users> queryAllFriendById(int userId){
        return  myFriendsMapper.queryAllMyFriendsLimitByMul(userId);
    }


    /**
     * @description 給定userId 查詢是否為好友關系
     */
    @GetMapping("/friendRelationship")
    public boolean queryTheFriendRelationship(int userId,int otherId){
        int res = myFriendsMapper.friendRelationship(userId,otherId);
        return res == 1;
    }





}
