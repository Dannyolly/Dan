package com.example.mapper;

import com.example.pojo.LikeRelationShip;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeRelationShipMapper {


    int deleteByPrimaryKey(Integer id);

    int deleteByMul(int postId,int userId);

    int insertSelective(LikeRelationShip record);

    LikeRelationShip selectByMul(LikeRelationShip likeRelationShip);

    int updateByPrimaryKeySelective(LikeRelationShip record);

}