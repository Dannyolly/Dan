package com.example.msg;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentFormat {

    private int postCommentId;
    private int userId;
    private String commentInfo;
    private Date commetDate;
    private int likeCount;
    private int postId;
    private String username;
    private String icon;

}
