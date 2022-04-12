package com.example.controller;


import com.example.mapper.UsersMapper;
import com.example.msg.UserMsg;
import com.example.pojo.Users;
import com.example.utils.BASE64DecodedMultipartFile;
import com.example.utils.JsonUtils;
import com.example.utils.QRCodeGenerator;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.*;
@CrossOrigin
@RestController
public class UserController {
    
    @Autowired
    UsersMapper usersMapper;


    /**
     * @param  sessionId     保存在服務器中---15分鍾
     * @return true or false
     * @description 驗證是否登錄
     */
    @GetMapping("/checkLogin")
    public UserMsg checkLogin(String sessionId, HttpServletRequest request){
        if(request.getSession().getId().equals(sessionId)){
            return new UserMsg("登錄成功",sessionId,null);
        }

        return new UserMsg("請重新登入",sessionId,null);
    }

    /**
     * @param username  用戶名
     * @param password 密碼
     * @param request  http請求
     * @return
     */
    @GetMapping ("/login")
    public UserMsg login(String username, String password, HttpServletRequest request){
        Users users = new Users();
        users.setUsername(username);
        users.setPassword(password);
        List<Users> usersList = usersMapper.queryAllUsersLimitByMul(users,0,5);
        Users user;
        if (usersList.size() != 0) {
            user = usersList.get(0);
        }else
        {
            HashMap<String, Object> map = new HashMap<>();
            map.put("userInfo",null);
            return new UserMsg("error","",map);
        }

        if(user.getUsername().equals(username) && user.getPassword().equals(password)){
            request.getSession(true).setAttribute("username",username);
            HashMap<String, Object> map = new HashMap<>();
            map.put("userInfo",user);
            return new UserMsg("登錄成功",request.getSession(true).getId(),map);
        }

        return  null;
    }


    /**
     * @description  上傳用戶圖片...
     * @param file
     * @param id
     * @return
     */
    @PostMapping("/upLoadIcon")
    public Map<String, Object> upLoadImage(MultipartFile file, int id){
        System.out.println(file!=null);
        System.out.println("uploading~~~~~~");
        HashMap<String, Object> map = new HashMap<>();
        //MultipartFile file = BASE64DecodedMultipartFile.base64ToMultipart(imageBase64);
        Users users = new Users();
        users.setId(id);

        File isExist =new File("C:\\Users\\boybo\\IdeaProjects\\MyWebSocket"+
                usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getIcon()
        );
        // System.out.println(usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getIcon());
        if(isExist.exists()){
            //System.out.println("exist");
            isExist.delete();
        }

        // System.out.println(id);
        // System.out.println(file);

        String filename = System.currentTimeMillis()+file.getOriginalFilename();
        String filePath = System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                +System.getProperty("file.separator")+"icon"+System.getProperty("file.separator");
        //路徑不存在,迎增該路徑....
        File file1=new File(filePath);
        if(!file1.exists()){
            file1.mkdir();
        }
        //實際的文件地址...
        File dist=new File(filePath+System.getProperty("file.separator")+filename);
        //存到數據庫...
        String storePath="/img/icon/"+filename;
        try {
            file.transferTo(dist);
            users.setIcon(storePath);
            int msg = usersMapper.updateByPrimaryKeySelective(users);
            if(msg!=0) {
                map.put("msg", "上傳成功");
                map.put("pic", storePath);
                return map;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        map.put("msg","文件上傳失敗");
        return map;


    }

    @PostMapping("/upLoadBackgroundImage")
    public Map<String, Object> upLoadBackgroundImage(MultipartFile file, int id){


        HashMap<String, Object> map = new HashMap<>();
        //MultipartFile file = BASE64DecodedMultipartFile.base64ToMultipart(imageBase64);
        Users users = new Users();
        users.setId(id);

        File isExist =new File("C:\\Users\\Computer\\Desktop\\springboot\\MyWebSocket"+
                usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getBackgroundImage()
        );
        // System.out.println(usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getIcon());
        if(isExist.exists()){
            //System.out.println("exist");
            isExist.delete();
        }

        // System.out.println(id);
        // System.out.println(file);

        String filename = System.currentTimeMillis()+file.getOriginalFilename();
        String filePath = System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                +System.getProperty("file.separator")+"backgroundImage"+System.getProperty("file.separator");
        //路徑不存在,迎增該路徑....
        File file1=new File(filePath);
        if(!file1.exists()){
            file1.mkdir();
        }
        //實際的文件地址...
        File dist=new File(filePath+System.getProperty("file.separator")+filename);
        //存到數據庫...
        String storePath="/img/backgroundImage/"+filename;
        try {
            file.transferTo(dist);
            users.setBackgroundImage(storePath);
            int msg = usersMapper.updateByPrimaryKeySelective(users);
            if(msg!=0) {
                map.put("msg", "上傳成功");
                map.put("pic", storePath);
                return map;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        map.put("msg","文件上傳失敗");
        return map;

    }


    /***
     * @description  獲取ICON 根據ID
     * @param id
     * @return
     */
    @GetMapping("/getUserIcon")
    public String getIcon(int id ){
        Users users = new Users();
        users.setId(id);
        return usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getIcon();
    }

    /**
     * @description 根據用戶名或ID 查詢用戶...
     * @param   users
     * @return
     */
    @GetMapping("/searchUser")
    public List<Users> searchUser(Users users){
        return usersMapper.queryAllUsersLimitByMul(users,0,10);

    }

    /**
     * @description 標記為線上 或 下線...
     */
    @GetMapping("/online")
    public boolean userOnline(Users users){

        return 1==usersMapper.updateByPrimaryKeySelective(users);
    }


    /**
     * @description  改變設定..
     */
    @GetMapping("/updateUserSetting")
    public boolean updateUserSetting(Users users){
        return 1 == usersMapper.updateByPrimaryKeySelective(users);
    }


    @Transactional(propagation = Propagation.REQUIRED)
    @PostMapping("/register")
    public Map<String,Object> register(MultipartFile []files,String users){
        Map<String, Object> resultMap = new HashMap<>();

        Users users1 = JsonUtils.jsonToPojo(users, Users.class);

        users1.setIcon("");
        users1.setBackgroundImage("");
        users1.setOnline(0);
        usersMapper.insertSelective(users1);
        Map<String, Object> icon;
        Map<String, Object> image;

        if (files.length == 0){



        }else {
             icon = upLoadImage(files[0], users1.getId());
             image = upLoadBackgroundImage(files[1], users1.getId());

            String pic =(String) icon.get("pic");
            String pic1 = (String) image.get("pic");

            users1.setIcon(pic);
            users1.setBackgroundImage(pic1);
            //Random random = new Random();

            users1.setCid(UUID.randomUUID().toString().substring(0,6));
            users1.setQrcode(QRCodeGenerator.generateQRCodeImage(users1.toString(),300,300,users1.getId().toString()));
            resultMap.put("msg","上傳成功");
            resultMap.put("result",users1);

            return  resultMap;
        }

        resultMap.put("msg","上傳失敗");
        return resultMap;


    }




}
