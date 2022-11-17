import {
    get,
    post, 
    axios 
} from '../api/config'
import { AxiosResponse } from 'axios'
import { UserInfo } from '@/Model/user'
import { ws } from '@/websocket'


export const signMessage = (id) => get(`/signMsg?ids=${id}`)

export const getAllNotReceiveMsg = (userId) => get(`/getNotReceiveMsg?userId=${userId}`)

/**
 * @description 上傳圖片
 */
export const sendPic = (files : Array<String>, senderId: number, receiverId : number, setProgress : (present : number)=>void) => {
   /*  let param = transformToFormDataByMessage(files, senderId, receiverId)

    return axios({
        method: 'POST',
        url: '/sendMessage',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
            let present = (progressEvent.loaded / progressEvent.total * 100 | 0) //上传进度百分比
 
            setProgress(present * 0.01)
         
                setTimeout(()=>{r
                    setProgress(0)
                },4000)

        }
    }) */
}

