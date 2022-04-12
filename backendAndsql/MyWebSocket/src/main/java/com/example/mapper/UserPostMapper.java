package com.example.mapper;

import com.example.pojo.UserPost;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserPostMapper {


    int deleteByPrimaryKey(Integer id);

    int insertSelective(UserPost record);

    UserPost selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserPost record);

    List<UserPost>  queryAllUserPostByUserId(int userId,int page,int pageSize);

    List<UserPost>  queryAllUserOwnPost(int userId,int page,int pageSize);

}