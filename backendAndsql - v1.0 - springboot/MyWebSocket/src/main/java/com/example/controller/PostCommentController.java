package com.example.controller;

import com.example.mapper.PostCommentMapper;
import com.example.msg.CommentFormat;
import com.example.pojo.PostComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
@CrossOrigin
@RestController
public class PostCommentController {

    @Autowired
    PostCommentMapper postCommentMapper;


    @GetMapping("/addComment")
    public boolean submitComment(PostComment postComment){

        postComment.setLikeCount(0);
        postComment.setCommetDate(new Timestamp(new Date().getTime()));

        return  postCommentMapper.insertSelective(postComment) == 1;
    }


    @GetMapping("/getComment")
    public List<CommentFormat> getComment(int postId, int page, int pageSize){

        return postCommentMapper.queryAllCommentByPostId(postId,page,pageSize);
    }


    @GetMapping("/getAllCommentCount")
    public int getAllCommentCount(int postId){

        return postCommentMapper.queryAllCommentCountByPostId(postId);
    }




}
