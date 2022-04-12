package com.example.demo;

import com.example.controller.FriendRequestController;
import com.example.controller.UserController;
import com.example.mapper.*;
import com.example.pojo.*;
import com.example.utils.QRCodeGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MySpringBootWebSocketApplicationTests {

	@Autowired
	ChatMsgMapper chatMsgMapper;

	@Autowired
	UsersMapper usersMapper;

	@Autowired
	MyFriendsMapper myFriendsMapper;

	@Autowired
	FriendRequestController friendRequestController;

	@Autowired
	UserController userController;

	@Autowired
	UserPostMapper userPostMapper;


	@Autowired
	LikeRelationShipMapper likeRelationShipMapper;


	@Autowired
	PostCommentMapper postCommentMapper;


	@Test
	void contextLoads() {


	}

}
