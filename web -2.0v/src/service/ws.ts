import { InformType } from '@/types/Notification'
import { sendMessageToServer } from '@/websocket'
import { focusNode } from 'element-plus/es/utils'


function sentAddRequest(user_id,to_id){
    sendMessageToServer({
        message: '',
        user_id,
        to_id,
        mode: 7,
        pic: '',
        post_id:0
    })
}

function sendNotification(user_id,to_id,mode:number,post_id:number,message:string){
    sendMessageToServer({
        message,
        user_id,
        to_id,
        mode,
        pic: '',
        post_id:post_id
    })
}

function sendMessage(user_id,to_id,message,pic){
    sendMessageToServer({
        mode:1,
        user_id,
        to_id,
        message,
        pic,
        post_id:0
    })
}



export{
    sentAddRequest,
    sendNotification,
    sendMessage
}