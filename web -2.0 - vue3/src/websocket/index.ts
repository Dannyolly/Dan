import { useNotificationStore } from "@/store/Notification";
import { InformType, Message } from "@/types/Notification";
import { UserInfo } from "@/types/user";
import { LocalStorageManager } from "@/utils/localStorage";
import { ElNotification } from "element-plus";

const base =  'ws://127.0.0.1:2346'
const url =  'ws://dws.free.svipss.top'
const ws = new WebSocket(url);
ws.onopen = function(e){
    console.log("open",e);
    const id = LocalStorageManager.getLocalStorageInfo('userInfo')?.id
    if(id){
      ws.send(JSON.stringify({
        mode:4,
        user_id: id,
        to_id:0,
        message:'',
        pic:'',
        post_id:0
    }))  
    }
    
}

ws.onclose = function(e){
//当客户端收到服务端发送的关闭连接请求时，触发onclose事件
    ElNotification({
        type:'error',
        message:'close'
    })
}
ws.onerror = function(e){

    ElNotification({
        type:'error',
        message:'error'
    })
}


const sendMessageToServer = function(data:Message<any>){
    console.log(JSON.stringify(data));
    ws.send(JSON.stringify(data))
}

export {
    ws,
    sendMessageToServer,
    
}

