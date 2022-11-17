package com.example.controller;

import com.example.mapper.LikeRelationShipMapper;
import com.example.mapper.UserPostMapper;
import com.example.pojo.LikeRelationShip;
import com.example.pojo.UserPost;
import com.example.pojo.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
public class UserPostController {


    @Autowired
    UserPostMapper userPostMapper;


    @Autowired
    LikeRelationShipMapper likeRelationShipMapper;

    @PostMapping ("/uploadPost")
    public Map<String,Object> uploadPost(MultipartFile []files, int userId,String introduction){


        System.out.println(files.length+"     "+userId+"    "+introduction);


        HashMap<String, Object> map = new HashMap<String,Object>();
        UserPost userPost = new UserPost();
        //  File isExist =new File("C:\\Users\\Computer\\Desktop\\springboot\\MyWebSocket"+
        //          usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getIcon()
        //  );
        // System.out.println(usersMapper.queryAllUsersLimitByMul(users,0,5).get(0).getIcon());
        /**
         * @description  這里把多張圖片存放到同一個字符串....例如:  1.png,2.png, .....
         */
        StringBuffer imagesPath =new StringBuffer();

        for (int i = 0; i < files.length ; i++) {
            String filename = System.currentTimeMillis()+files[i].getOriginalFilename();

            String filePath = System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                    +System.getProperty("file.separator")+"post"+System.getProperty("file.separator");
            //路徑不存在,迎增該路徑....
            File file1=new File(filePath);
            if(!file1.exists()){
                file1.mkdir();
            }
            //實際的文件地址...
            File dist=new File(filePath+System.getProperty("file.separator")+filename);
            //存到數據庫...
            String storePath="/img/post/"+filename;

            if(i == files.length-1){
                imagesPath.append(storePath);
            }else {
                imagesPath.append(storePath+',');
            }


            try {
                files[i].transferTo(dist);

            } catch (IOException e) {
                e.printStackTrace();
                map.put("msg","文件上傳失敗");
                return map;
            }
        }


        userPost.setPostDate(new Timestamp(new Date().getTime()));
        userPost.setPostImage(imagesPath.toString());
        userPost.setLikeCount(0);
        userPost.setUserId(userId);
        userPost.setIntroduction(introduction);

        int i = userPostMapper.insertSelective(userPost);

        if(i>0){
            map.put("msg","文章上傳成功");
            map.put("postId",userPost.getId());
            map.put("postImage",imagesPath);
            return  map;
        }


        map.put("msg","文件上傳失敗");
        return  map;
    }


    @GetMapping("/getUserOwnPost")
    public List<UserPost> getUserOwnPost(int userId,int page,int pageSize){
        return  userPostMapper.queryAllUserOwnPost(userId,page,pageSize);
    }

    @GetMapping("/getAllPost")
    public List<UserPost> getAllPost(int userId,int page,int pageSize){


        /**
         * @description  查找好友和自己的貼..
         */

        return userPostMapper.queryAllUserPostByUserId(userId,page,pageSize);

    }

    @GetMapping("/likeCount/add")
    public boolean setLikeCount(int postId , int userId ,int likeCount){
        UserPost userPost = new UserPost();
        LikeRelationShip likeRelationShip = new LikeRelationShip();
        userPost.setId(postId);
        userPost.setLikeCount(likeCount);

        likeRelationShip.setUserId(userId);
        likeRelationShip.setPostId(postId);
        int a = userPostMapper.updateByPrimaryKeySelective(userPost);

        int b =0 ;
        if(likeRelationShipMapper.selectByMul(likeRelationShip) == null){
            b = likeRelationShipMapper.insertSelective(likeRelationShip);

            return true;
        }



        return false;

    }

    @GetMapping("/likeCount/cancel")
    public boolean cancelLike(int postId , int userId ,int likeCount){
        UserPost userPost = new UserPost();
        userPost.setId(postId);
        userPost.setLikeCount(likeCount);


        int a = userPostMapper.updateByPrimaryKeySelective(userPost);
        int b = likeRelationShipMapper.deleteByMul(postId,userId);

        return 0!=a && 0!=b;
    }

    @GetMapping("/like/check")
    public LikeRelationShip checkIsLiked(int postId ,int userId){

        LikeRelationShip likeRelationShip = new LikeRelationShip();
        likeRelationShip.setPostId(postId);
        likeRelationShip.setUserId(userId);

        return likeRelationShipMapper.selectByMul(likeRelationShip);

    }

    @GetMapping("searchPostByPostId")
    public UserPost getPostById(int postId){
        return  userPostMapper.selectByPrimaryKey(postId);
    }




}
