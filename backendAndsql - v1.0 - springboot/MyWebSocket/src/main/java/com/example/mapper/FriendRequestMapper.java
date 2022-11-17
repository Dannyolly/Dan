package com.example.mapper;

import com.example.msg.Requester;
import com.example.pojo.FriendRequest;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FriendRequestMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(FriendRequest record);

    int insertSelective(FriendRequest record);

    FriendRequest selectByUserId(Integer userId);

    int updateByPrimaryKeySelective(FriendRequest record);


    List<Requester> getAllRequester( int userId );


}