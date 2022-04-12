package com.example.netty.userChannelRelationship;

import io.netty.channel.ChannelId;

import io.netty.channel.Channel;
import java.util.HashMap;

/**
 * id 和 channel 的關聯
 */
public class UserChannelRelationship {

    private static HashMap<Integer, Channel> map =new HashMap<>();

    // 這個是存 channelId 相應的用戶
    private static HashMap<ChannelId, Integer> userMap =new HashMap<>();


    public static void put(Integer senderId, Channel channel){
        map.put(senderId,channel);
    }

    public static void put(ChannelId channelId, Integer senderId){
        userMap.put(channelId,senderId);
    }

    public static Channel get(Integer senderId){
       return map.get(senderId);
    }

    public static Integer get(ChannelId channelId){
        return userMap.get(channelId);
    }



}
