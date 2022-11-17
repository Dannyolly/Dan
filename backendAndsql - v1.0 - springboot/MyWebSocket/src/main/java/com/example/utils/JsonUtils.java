package com.example.utils;

import com.alibaba.fastjson.JSON;

public class JsonUtils {

    public static  <T>  T jsonToPojo( String obj,Class<T> t){
        return JSON.parseObject(obj,t);
    }

    public static String pojoToJson(Object obj){
        return JSON.toJSONString(obj);
    }

}
