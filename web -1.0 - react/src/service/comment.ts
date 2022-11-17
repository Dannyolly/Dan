import {
    get,
    post, 
    axios 
} from '../api/config'
import { AxiosResponse } from 'axios'
import { UserInfo } from '@/Model/user'
import { ws } from '@/websocket'


export const addComment = (userId, postId, commentInfo) => get(`/addComment?userId=${userId}&postId=${postId}&commentInfo=${commentInfo}`)

export const getAllComment = (postId, page, pageSize) => get(`/getComment?postId=${postId}&page=${page}&pageSize=${pageSize}`)

export const getAllCommentCount = (postId) => get(`/getAllCommentCount?postId=${postId}`)
