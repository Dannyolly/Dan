package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FriendRequest {

    private Integer id;

    private Integer sendUserId;

    private Integer receiveUserId;

    private Date requestDateTime;

    private String requestMessage;

    private int status;

    private int read;


}