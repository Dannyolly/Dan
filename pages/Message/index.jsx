import React,{useState,useEffect,useCallback, useRef} from 'react'
import { View, Text ,Platform,DeviceEventEmitter} from 'react-native'
import MessageHeader from '../../components/Header/Message'
import { GiftedChat } from 'react-native-gifted-chat'
import { screenSize } from '../../util/screenSize'
import { base_url } from '../../api/config'
import CachedImage from '../../components/CachedImage'


import { 
    getUserMainInfo, 
    uuid 
} from '../../util/function'

import {
    ws,
    webSocketPath,
    onclose,
    onerror,
    onopen,
    initOnMessage
} from '../../webSocket/index'

import { 
    SIGNED,
    CONNECT,
    CHAT,
    KEEPALIVE,
    PULL_FRIEND,


    chatMsg,
    getMsgFormat,
    signTheMsg,
    saveTheMessageToLocal,
    getTheMessageFromLocal,
    getTheMessageFromLocalByCurrentPage,
} from './messageUtils'
import UploadImage from '../../components/UploadImage'
import { getAllNotReceiveMsg, sendPic } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChatMessageContainer from '../../components/ChatMessageContainer'
import { userStore } from '../../mobx/store'
import { messageResponser} from '../../util/haptic'
import Messages from './messages'
import Loading from './Loading'
import { showMessage } from 'react-native-flash-message'

import BottomSheet from '../../components/BottomSheet/Message'
import MessageBox from './MessageBox'

export default function index( { route, navigation } ) {

    const { item } = route.params
    /* console.log(item) */
    let webSocket = ws

    const [messages, setMessages] = useState([]);

    const [userInfo, setUserInfo] = useState(undefined)

    const [friendInfo, setFriendInfo] = useState(undefined)
    
/*     const [currentPage, setCurrentPage] = useState(0) */

    const currentPage = useRef(0)

    const [loading, setLoading] = useState(false)

    const setting = useRef(false)

    const [open, setOpen] = useState(false)

    const [progress, setProgress] = useState(0)

    webSocket.onmessage=(e)=>{
        let msg =JSON.parse(e.data)
        let formatMsg  
        if(msg.msg.substring(0,1) === '/'){
            formatMsg = getMsgFormat(undefined,friendInfo,base_url+msg.msg,true)
        }else{
            formatMsg = getMsgFormat(msg.msg,friendInfo)
        }


        console.log(msg.id,msg)
        signTheMsg([msg.id])
        saveTheMessageToLocal(formatMsg,msg.sendUserId,msg.receiveUserId) 
        setMessages(previousMessages => GiftedChat.append(previousMessages, [formatMsg]))

        DeviceEventEmitter.emit('refresh')
    }
    

    const onSend = useCallback((messages = []) => {
        
        //messageResponser()
        let msg=JSON.stringify(chatMsg(CHAT,userInfo.id,friendInfo.id,userStore.text))    
        /* let obj = {
             _id:messages[0]._id,
             createdAt:messages[0].createdAt,
             text:userStore.text,
             user:messages[0].user,
        }
        let a = [obj] */

        /* 保存到本地... */
        let res = getMsgFormat(userStore.text,userInfo)
        //console.log(obj,res)
        saveTheMessageToLocal(res,friendInfo.id,userInfo.id) 
        webSocket.send(msg)
        setMessages(previousMessages => GiftedChat.append(previousMessages, [res]))

        userStore.setText('')
        DeviceEventEmitter.emit('refresh')

        //console.log('send')
        
    }, [JSON.stringify(friendInfo),JSON.stringify(userInfo),userStore.text])


    const sendPicMessage = async (pic)=>{
        
        
        
        let res =getMsgFormat(undefined,userInfo,pic)
        setMessages(previousMessages=>GiftedChat.append(previousMessages, [res]))
        let { data } = await sendPic([pic],userInfo.id,item.id,num=>{
            setTimeout(()=>{
                setProgress(()=>num)
            },10)
            console.log(num)
        })
        res =getMsgFormat(undefined,userInfo,pic,true)
        saveTheMessageToLocal(res,friendInfo.id,userInfo.id) 
        
        let msg=JSON.stringify(chatMsg(CHAT,userInfo.id,friendInfo.id,data.imagePath,data.msgId))    

        //console.log('send')
        webSocket.send(msg)
        setTimeout(()=>{
            setProgress(0)
        },4000)
        DeviceEventEmitter.emit('refresh')
    }


    



    /** ------------------------------  初始化--------------------------------------------------- */
    const getData= async()=>{
        

        let resu = await AsyncStorage.getAllKeys()
        /**
         * @Step1   獲取用戶信息...
         */
        let res =await getUserMainInfo()
        setFriendInfo(()=>item)
        setUserInfo(()=>res.userInfo)   

        /**
         * @step2 加載之前的信息
         */
        if(res.userInfo.id!==undefined ){
           let messages  = await getTheMessageFromLocalByCurrentPage(item.id,res.userInfo.id,currentPage.current)
           if(messages!==undefined && messages !==null){
                //console.log('message',messages)
                setMessages(previousMessages => {
                    //console.log('pre message',previousMessages)
                    return GiftedChat.append(previousMessages, messages)
                })
            }
        }

        /**
         * @Step3  獲取未讀信息 --- 如有
         */
        if(res.userInfo.id !== undefined){
            let res1 = await getAllNotReceiveMsg(res.userInfo.id)
            //讀取後則簽收....
            let ids   =   []
            let msgs  =   []
            //console.log('not receive',res1.data)
            for (const item1 of res1.data) {
                ids.push(item1.id)
                
                if(item1.msg.substring(0,1)==='/'){
                    msgs.push(getMsgFormat(undefined,item1,base_url+item1.msg,true))
                    await saveTheMessageToLocal(getMsgFormat(undefined,item1,base_url+item1.msg,true),item.id,res.userInfo.id)
                }else{
                    msgs.push(getMsgFormat(item1.msg,item1))
                    await saveTheMessageToLocal(getMsgFormat(item1.msg,item1),item.id,res.userInfo.id)
                }

            }
            if(res1.data.length!==0){
                setMessages(previousMessages => GiftedChat.append(previousMessages, msgs))
                signTheMsg(ids); 
            }
            
            /* 通知首頁刷新... 因為外面的信息是依賴localMessage 所以要通知..   */
            DeviceEventEmitter.emit('refresh')
        }
      
    }

    const loadMoreMessage = async ()=>{
        //console.log('loading message  hey~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        let res =await getUserMainInfo()
        //console.log(currentPage.current)
        let messages  = await getTheMessageFromLocalByCurrentPage(item.id,res.userInfo.id,++currentPage.current)
        //console.log(messages.length)
           if(messages!==undefined && messages !==null){
                //console.log('message',messages)
                setMessages(previousMessages => {
                    //console.log('pre message',previousMessages)
                    return [...previousMessages,...messages]
                })
            }else{
                //console.log('no message ')
            }
        setting.current=false
        setTimeout(()=>{
            setLoading(()=>false)
        },1000)
    }

    


    useEffect(() => {
        if(loading===true){
            loadMoreMessage()
        }
    }, [loading])

    useEffect(()=>{
        getData()
        setting.current=false
       

        return ()=>{
            /* 取消連接  當關閉時... */
            ws.onmessage=initOnMessage
        }
        
    },[])


    return (
        userInfo!==undefined
        &&
        <View /* style={{paddingTop:89}} */>
            {/* header */}
            <MessageHeader   item={item} navigation={navigation}   />
            <View style={{width:screenSize.width,height:screenSize.height,backgroundColor:"#EBEDF5"}}>
                <GiftedChat
                    listViewProps={{
                        scrollEventThrottle: 1,
                        onScroll: ({ nativeEvent }) => {
                            const { contentOffset , contentSize,layoutMeasurement} = nativeEvent
                            const loaderHeight =  0
                            //console.log(contentSize.height,layoutMeasurement.height);
                            if(contentSize.height-(layoutMeasurement.height)-loaderHeight<=contentOffset.y && setting.current===false && loading===false){
                                setting.current=true
                                /* console.log('setting'); */
                                setLoading(()=>true)
                            }
                        }
                    }}
                    /* renderComposer={ChatMessageContainer} */
                    /* renderSend={ChatMessageContainer} */
                    renderLoadEarlier={props=><Loading {...props}  />}
                    isLoadingEarlier={true}
                    onLoadEarlier={()=>loadMoreMessage()}
                    
                    // 控制是否加載...
                    loadEarlier={loading}
                    infiniteScroll={true}
                    renderInputToolbar={props=><ChatMessageContainer  {...props} setIsOpen={()=>setOpen(()=>!open)} />}
                    /* keyboardShouldPersistTaps={} */
                    maxComposerHeight={35}
                    minInputToolbarHeight={60}
                    renderMessageImage={props=>{
                        return(
                            <UploadImage {...props.currentMessage} progress={progress}   />
                        )
                    }}
                    rendermes
                    /* renderMessage={message=><Messages message={message} />} */
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    alwaysShowSend={true}
                    user={{
                        _id:userInfo.id,
                        name:userInfo.username,
                        avatar:base_url+userInfo.icon,
                        id:userInfo.id           
                    }}
                    showUserAvatar={true}
                    /* renderAvatarOnTop={true} */
                    renderAvatar={(props)=>{
                        const {currentMessage} =props
                        return(
                            <CachedImage 
                            uri={currentMessage.user.avatar} 
                            id={currentMessage.user.id} 
                            style={{width:40,height:40,borderRadius:20}} 
                             />
                        )
                    }}
                    renderTime={()=><Text></Text>}
                    /* renderMessage={props=>{
                        return(
                            <MessageBox  {...props.currentMessage}  />
                        )
                    }} */
                    
                    
                />
            </View>
            
            <BottomSheet isOpen={open} setIsOpen={()=>setOpen(()=>!open)} sendPic={sendPicMessage}  />
        </View>
    )
}
