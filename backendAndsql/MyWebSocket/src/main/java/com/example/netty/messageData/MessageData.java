package com.example.netty.messageData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageData implements Serializable {

    private Integer action;
    private String extendField;
    private ChatMsg chatMsg;

}
