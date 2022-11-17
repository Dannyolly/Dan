
import { PULL_FRIEND } from '@/constant/chat'
import { TransFormHanlder } from '@/Handler/transformHanlder'
import { searchUser } from '@/service/friend'
import { objTOParams } from '@/utils'
// import { objTOParams } from '@/utils'



const webSocketPath = 'http://websocket.free.svipss.top/ws'

const ws = new WebSocket(webSocketPath)

/* const onopen = (e) => {
    getUserMainInfo().then(res => {
        console.log('open!!!!', res)
        ws.send(JSON.stringify(chatMsg(CONNECT, res.userInfo.id, 0, '', '')))
        console.log('send Connect MSG')


        online(res.userInfo.id, 1).then(res => {
            showMessage({
                message:JSON.stringify(res.data)
            })
        })

        // 長連接..
        setInterval(()=>{
            let serverMsg =  chatMsg(KEEPALIVE,res.userInfo.id)
            ws.send(JSON.stringify(serverMsg))
            //console.log('send Heart bead package')
        },10000)
    }
    )


    
     定時發送心跳包... 10秒
     

} */


const receiveChatMessage = async (msg) => {
    let params = objTOParams({
        id: msg.sendUserId
    })
    
    let res = await searchUser(params)
    // @ts-ignore
    let formatMsg: any
    // @ts-ignore
    let flag: boolean 
    if (msg.msg.substring(0, 1) === "/") {
        flag = false
        formatMsg = TransFormHanlder.transformToFormatMsg(undefined, res.data[0], msg.msg, true)
    } else {
        flag = true
        formatMsg = TransFormHanlder.transformToFormatMsg(msg.msg, res.data[0])
    }


    // receiveMsg --> Home.jsx
    /**
     * @link {./home.jsx}
     */
    //DeviceEventEmitter.emit('receiveMsg', formatMsg)

    
    //userStore.setUnReadMessageCount(userStore.unreadMessageCount + 1)
    //console.log(userStore.unreadMessageCount)
}

const initOnMessage = async (e) => {
    let msg = JSON.parse(e.data)

    if (msg.action !== undefined && msg.action === PULL_FRIEND) {
        // 好友請求...
        //userStore.setFriendRequestDidNotRead(userStore.friendRequestDidNotReadNumber + 1)

    } else {

        // 聊天信息..
        receiveChatMessage(msg)
    }


}

const onerror = (e) => {
    // an error occurred
    console.log(e.message);
};

const onclose = (e) => {
    // connection closed

};

ws.onerror = onerror
ws.onclose = onclose
//ws.onopen = onopen
ws.onmessage = initOnMessage

export {
    ws,
    webSocketPath,
    onerror,
    onclose,
    //onopen,
    initOnMessage
}
