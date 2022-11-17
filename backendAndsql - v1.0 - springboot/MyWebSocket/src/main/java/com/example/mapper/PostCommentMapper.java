package com.example.mapper;

import com.example.msg.CommentFormat;
import com.example.pojo.PostComment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostCommentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PostComment record);

    int insertSelective(PostComment record);

    PostComment selectByPrimaryKey(Integer id);

    List<CommentFormat> queryAllCommentByPostId(Integer postId, Integer page , Integer pageSize);

    int queryAllCommentCountByPostId(Integer postId);

    int updateByPrimaryKeySelective(PostComment record);

    int updateByPrimaryKey(PostComment record);
}