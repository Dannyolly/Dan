package com.example.netty.messageData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMsg implements Serializable {

    private Integer receiverId;
    private Integer senderId;
    private String message;
    private Integer status;
    private Date sendTime;


}
