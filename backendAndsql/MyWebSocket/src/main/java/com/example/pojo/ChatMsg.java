package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatMsg {
    private Integer id;

    private Integer sendUserId;


    private Integer receiveUserId;

    private String msg;

    private Integer signFlag;

    private Date createTime;


}