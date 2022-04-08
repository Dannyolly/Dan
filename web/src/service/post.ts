import {
    get,
    post, 
    axios 
} from '../api/config'
import { AxiosResponse } from 'axios'
import { UserInfo } from '@/Model/user'
import { Post } from '@/Model/post'
import { ws } from '@/websocket'
import { TransFormHanlder } from '../Handler/transformHanlder'
type Response<T> = Promise<AxiosResponse<T>>
/**
 * @description 上傳文章
 */
 export const uploadPost = (files :File[] , userId:string , introduction:string ) => {
    let param = TransFormHanlder.transformToFormDataByPost(files, userId, introduction)
    console.log(param);
    return axios({
        method: 'POST',
        url: '/uploadPost',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}


/**
 * 
 * @returns {Promise<AxiosResponse<Array<Post>>>}
 */
export const getAllUserOwnPost= (userId, page, pageSize): Response<Array<Post>> => get(`/getUserOwnPost?userId=${userId}&page=${page}&pageSize=${pageSize}`)


/**
 * 
 * @param {object} info 
 * @returns {Response<Array<Post>>}
 */
 export const getAllUserPost = (userId, page, pageSize):Response<Array<Post>> => get(`/getAllPost?userId=${userId}&page=${page}&pageSize=${pageSize}`)


export const getPostByPostId = (postId:number ):Promise<AxiosResponse<Post>> => get(`/searchPostByPostId?postId=${postId}`)

export const addLike = (postId, userId, likeCount) => get(`/likeCount/add?postId=${postId}&userId=${userId}&likeCount=${likeCount}`)

export const cancelLike = (postId, userId, likeCount) => get(`/likeCount/cancel?postId=${postId}&userId=${userId}&likeCount=${likeCount}`)

export const likeCheck = (postId, userId) => get(`/like/check?postId=${postId}&userId=${userId}`)

