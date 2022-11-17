package com.example.mapper;

import com.example.pojo.MyFriends;
import com.example.pojo.Users;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MyFriendsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(MyFriends record);

    int insertSelective(MyFriends record);

    List<Users> queryAllMyFriendsLimitByMul(int userId);

    int updateByPrimaryKeySelective(MyFriends record);

    int  friendRelationship(int userId ,int otherId);

}