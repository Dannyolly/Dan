package com.example.msg;

import com.example.pojo.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMsg {

    public String msg;
    public String sessionId;
    public Map<String ,Object> userInfo;

}
