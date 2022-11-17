package com.example.mapper;

import com.example.msg.ChatFormat;
import com.example.pojo.ChatMsg;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ChatMsgMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ChatMsg record);

    int insertSelective(ChatMsg record);

    ChatMsg selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ChatMsg record);

    List<ChatMsg> queryAllChatMsgLimitByMul(ChatMsg chatMsg, int page , int pageSize);

    List<ChatFormat> queryAllMsgWithSenderInfo(int userId, int page, int pageSize);

    int updateMulChatMsg(List<ChatMsg> chatMsgs);
}