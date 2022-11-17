package com.example.msg;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatFormat {

    private Integer id;

    private Integer sendUserId;


    private Integer receiveUserId;

    private String msg;

    private Integer signFlag;

    private Date createTime;

    private String username;

    private String password;

    private String icon;

    private String qrcode;

    private String cid;

}
