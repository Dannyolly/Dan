package com.example.netty.enums;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
public enum ActionEnums {

    CONNECT(1,"第一次(或重連)初始化"),
    CHAT(2,"聊天信息"),
    SIGNED(3,"消息簽收"),
    KEEPALIVE(4,"客戶端保持心跳"),
    PULL_FRIEND(5,"拉取好友");

    public final Integer type;
    public final String content;

    public  Integer getType() {
        return type;
    }

    public String getContent() {
        return content;
    }


}
