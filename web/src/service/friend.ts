
import {
    get,
    post, 
    axios 
} from '../api/config'
import { AxiosResponse } from 'axios'
import { UserInfo } from '@/Model/user'
import { ws } from '@/websocket'


export const getAllFriend = (id) => get(`/friendList?userId=${id}`)

export const searchUser = (info : Object):Promise<AxiosResponse<Array<UserInfo>>> => get(`/searchUser?${info}`)

export const updateUserInfo = (info) => get(`/updateUserSetting?${info}`)

export const addRequest = (userId, otherId, message) => {


    //let chatFormatMsg = chatMsg(PULL_FRIEND, userId, otherId, "", "")

    //ws.send(JSON.stringify(chatFormatMsg))
    

}

// 確認請求
export const confirmRequest = (requestId, receiverId, senderId) => get(`/confirmRelationship?requestId=${requestId}&senderId=${senderId}&receiverId=${receiverId}`)

// 獲取所有請求
export const getAllFriendRequest = (userId) => get(`/getAddRequest?userId=${userId}`)

/** 這個是讀好友請求的... */
export const readMessage = (id) => get(`/readMessage?id=${id}`)


