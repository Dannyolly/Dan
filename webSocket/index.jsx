import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect} from 'react'
import { View, Text } from 'react-native'
import { getUserMainInfo, objTOParams } from '../util/function';

import { chatMsg } from '../pages/Message/messageUtils';
import { CONNECT ,KEEPALIVE} from '../pages/Message/messageUtils';


import { EventEmitter } from '@unimodules/react-native-adapter';

import { getMsgFormat } from '../pages/Message/messageUtils';
import { online, searchUser } from '../api/api';
import { DeviceEventEmitter } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { base_url } from '../api/config';

import MessageIcon from '../components/MessageIcon'



const ws = new WebSocket('ws://3kq8557234.zicp.vip:13044/ws');
const webSocketPath= 'ws://3kq8557234.zicp.vip:13044/ws'



const onopen=(e)=>{
    getUserMainInfo().then(res=>{
        //console.log('open!!!!',res)
        ws.send(JSON.stringify(chatMsg(CONNECT,res.userInfo.id,0,'','')))
        console.log('send Connect MSG')


        online(res.userInfo.id,1).then(res=>{
            /* showMessage({
                message:JSON.stringify(res.data)
            }) */
        })


        // 長連接..
        /* setInterval(()=>{
            let serverMsg =  chatMsg(KEEPALIVE,res.userInfo.id)
            ws.send(JSON.stringify(serverMsg))
            //console.log('send Heart bead package')
        },10000) */

        }
    )


    /**
     * 定時發送心跳包... 10秒
     */
    
}

const initOnMessage = async (e)=>{
    let msg =JSON.parse(e.data)
    let params = objTOParams({
        id:msg.sendUserId
    })
    let res = await searchUser(params)
    let formatMsg
    let flag 
    if(msg.msg.substring(0,1) === "/"){
        flag=false
        formatMsg = getMsgFormat(undefined,res.data[0],msg.msg,true)
    }else{
        flag=true
        formatMsg = getMsgFormat(msg.msg,res.data[0])
    }
    

    // receiveMsg --> Home.jsx
    DeviceEventEmitter.emit('receiveMsg',formatMsg)

    showMessage({
        icon:'info',
        message:formatMsg.user.name,
        description:flag?formatMsg.text:"[ 圖片 ]",
        renderFlashMessageIcon:(icon,style,image)=><MessageIcon icon={icon} style={style} image={formatMsg.user.avatar}  />,
        /* titleStyle:{lineHeight:30,fontSize:18,fontWeight:'400'} */
        
    })
}

const onerror = (e) => {
// an error occurred
    console.log(e.message);
};

const onclose = (e) => {
// connection closed
    
};

ws.onerror=onerror
ws.onclose=onclose
ws.onopen=onopen
ws.onmessage=initOnMessage

export{
    ws,
    webSocketPath,
    onerror,
    onclose,
    onopen,
    initOnMessage
}


    



