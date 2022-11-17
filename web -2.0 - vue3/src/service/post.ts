import { get, post } from "@/api/request"
import { Post } from "@/types/post";
import axios from "axios";
import { normalUrl } from '@/api/config'
const  getUnReceivePosts = (userId,lastPostId,page,pageSize)=>get<Post[]>(
    `/getUnReceivePosts/${userId}/${lastPostId}/${page}/${pageSize}`
);

const getUserPosts = (userId,lastPostId,page,pageSize)=>get(
    `/getUserPosts/${userId}/${lastPostId}/${page}/${pageSize}`
)
    

const likeAction = (postId)=>get(
    `/likeAction/${postId}`
)

const cancelLike = (postId)=>get(
    `/cancelLike/${postId}`
)

const getPostById =(postId)=>get(
    `/getPostById/${postId}`
)


const uploadPost = (file:File | null,title,content,user_id)=>{
  let param = new FormData()
  file && param.append('image',file);
  param.append('title',title)
  param.append('content',content)
  param.append('user_id',user_id)
  return axios({
    method:'post',
    url:'/api/uploadPost',
    baseURL: normalUrl,
    data: param,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
  })
}

export {
    getUnReceivePosts,
    getUserPosts,
    likeAction,
    cancelLike,
    uploadPost,
    getPostById
}
