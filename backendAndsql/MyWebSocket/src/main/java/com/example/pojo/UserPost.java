package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPost {
    private Integer id;

    private Integer userId;

    private String postImage;

    private Integer likeCount;

    private String introduction;

    private Date postDate;


}