package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostComment {
    private Integer id;

    private Integer userId;

    private String commentInfo;

    private Date commetDate;

    private Integer likeCount;

    private Integer postId;

}