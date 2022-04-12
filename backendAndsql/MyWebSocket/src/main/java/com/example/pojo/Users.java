package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users {
    private Integer id;

    private String username;

    private String password;

    private String icon;

    private String qrcode;

    private String cid;

    private Integer online;

    private String introduction;

    private String backgroundImage;


}