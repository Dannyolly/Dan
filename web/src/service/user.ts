
import {
    get,
    post, 
    axios 
} from '../api/config'
import { AxiosResponse } from 'axios'
import { UserInfo } from '@/Model/user'
import { ws } from '@/websocket'
import { TransFormHanlder } from '../Handler/transformHanlder'

export const userLogin = (username, password) => get(`/login?username=${username}&password=${password}`)

export const checkLogIn = (sessionId) => get(`/checkLogin?sessionId=${sessionId}`)

export const uploadIcon = (url, id) => {
    let param = new FormData()
    console.log('id=', id);
    param.append('id', id)
    param.append('file', {
        // @ts-ignore
        uri: url,
        type: 'multipart/form-data',
        name: ".png"
    })
    return axios({
        method: 'POST',
        url: '/upLoadIcon',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const uploadBackgroundImage = (url, id) => {
    let param = new FormData()
    param.append('id', id)
    param.append('file', {
          // @ts-ignore
        uri: url,
        type: 'multipart/form-data',
        name: ".png"
    })
    return axios({
        method: 'POST',
        url: '/upLoadBackgroundImage',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const getUserIcon = (id) => get(`/getUserIcon?id=${id}`)

export const getAllFriend = (id) => get(`/friendList?userId=${id}`)

export const searchUser = (info : Object):Promise<AxiosResponse<Array<UserInfo>>> => get(`/searchUser?${info}`)

export const updateUserInfo = (info) => get(`/updateUserSetting?${info}`)

/**
 * 
 * @param {Number} userId 
 * @param {Number} online  0 為下線 1為上線...
 * @returns {Promise} res
 */
export const online = (userId, online) => get(`/online?id=${userId}&online=${online}`)


/**
 * @description 注冊
 */
export const register = (files:Array<String>, user:UserInfo, callBack:(progress:number)=>void) => {
    let param = TransFormHanlder.transformToFormDataByRegisterInfo(files, user)

    return axios({
        method: 'POST',
        url: '/register',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
            let present = (progressEvent.loaded / progressEvent.total * 100 | 0) //上传进度百分比
            callBack(present * 0.01)
                //console.log(present);
        },

    })
}
