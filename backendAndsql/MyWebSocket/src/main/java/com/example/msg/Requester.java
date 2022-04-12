package com.example.msg;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Requester {

    /**
     * @description  請求信息的字段...
     */
    private Integer userId;
    private Integer requestId;
    private Integer senderId;
    private Integer receiverId;
    private String username;
    private String password;
    private String icon;
    private String qrcode;
    private String cid;
    private Date requestDateTime;
    private String requestMessage;
    private int status;
    private int read;
}
