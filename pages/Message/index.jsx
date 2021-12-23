import React,{useState,useEffect,useCallback, useRef} from 'react'
import { View, Text ,Platform,DeviceEventEmitter} from 'react-native'
import MessageHeader from '../../components/Header/Message'
import { GiftedChat } from 'react-native-gifted-chat'
import { screenSize } from '../../util/screenSize'
import { base_url } from '../../api/config'
import CachedImage from '../../components/NonIdCachedImage'


import { 
    defaultShowMessage,
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
} from './MessageHandler'


import ChatImage from '../../components/ChatImage'
import { getAllNotReceiveMsg, sendPic } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChatMessageContainer from '../../components/ChatMessageContainer'
import { userStore } from '../../mobx/store'
import { messageStore ,observer} from '../../mobx/chat'


import { messageResponser} from '../../util/haptic'
import { showMessage } from 'react-native-flash-message'
import Loading from './Loading'
import BottomSheet from '../../components/BottomSheet/Message'

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

    // 父ref
    const containerRef = useRef()

    const scrollRef = useRef()


    webSocket.onmessage = (e)=>{
        let msg =JSON.parse(e.data)
        let formatMsg  
        let index  =0 
        if(msg.msg.substring(0,1) === '/'){
            
            //index = 0 
            formatMsg = getMsgFormat(undefined,friendInfo,base_url+msg.msg,true)
        }else{
            
           // index = 1 
            formatMsg = getMsgFormat(msg.msg,friendInfo)
        }


       // console.log(msg.id,msg)
        signTheMsg([msg.id])
        saveTheMessageToLocal(formatMsg,msg.sendUserId,msg.receiveUserId) 

        /* showMessage({
            message:JSON.stringify(formatMsg.text),
            style:{paddingTop:100,width:screenSize.width,height:400},
            duration:6000
        }) */

        setMessages(previousMessages => GiftedChat.append(previousMessages, [formatMsg]))

        DeviceEventEmitter.emit('refresh')
    }
    

    const onSend = useCallback((messages = []) => {
        

        let msg=JSON.stringify(chatMsg(CHAT,userInfo.id,friendInfo.id,userStore.text))    

        /* 保存到本地... */
        let res = getMsgFormat(userStore.text,userInfo)
        //console.log(obj,res)
        //console.log(webSocket.CONNECTING)
        saveTheMessageToLocal(res,friendInfo.id,userInfo.id) 
        //console.log(typeof msg)
        webSocket.send(msg)
        /* showMessage({
            message:JSON.stringify(msg),
            style:{paddingTop:100,width:screenSize.width,height:300},
            duration:6000
        }) */
        setMessages(previousMessages => GiftedChat.append(previousMessages, [res]))

        userStore.setText('')
        DeviceEventEmitter.emit('refresh')

        //console.log('send')
        
    }, [JSON.stringify(friendInfo),JSON.stringify(userInfo),userStore.text])


    const sendPicMessage = async (pic)=>{
        
        
        
        let res =getMsgFormat(undefined,userInfo,pic)
        setMessages(previousMessages=>GiftedChat.append(previousMessages, [res]))
        let { data } = await sendPic([pic],userInfo.id,item.id, num =>{
            setTimeout(()=>{
                setProgress(()=>num)
            },10)
            //console.log('progress',num)
        })


        res = getMsgFormat(undefined,userInfo,pic,true)
        saveTheMessageToLocal(res,friendInfo.id,userInfo.id) 
        
        let msg=JSON.stringify(chatMsg(CHAT,userInfo.id,friendInfo.id,data.imagePath,data.msgId))    
        ///defaultShowMessage()
        //console.log('send')
        //console.log(msg)
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
           //console.log('message',messages)
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
        <View  /* style={{paddingTop:89}} */>
            {/* header */}
            <MessageHeader   item={item} navigation={navigation}   />
            <View style={{width:screenSize.width,height:screenSize.height,backgroundColor:"#EBEDF5"}}>
                <GiftedChat
                    ref={c=>containerRef.current=c}
                    listViewProps={{
                        scrollEventThrottle: 1,
                        onContentSizeChange:(width, height) => {
                            messageStore.setContainerSize({width,height})
                        },
                        onScrollEndDrag:()=>{
                            if(messageStore.scrolling){
                                messageStore.setScrolling(false)
                               // console.log('End');
                            }

                            
                        },
                        onScrollBeginDrag:()=>{
                            messageStore.setScrolling(true)
                            //console.log('begin')
                        },
                        onScroll: ({ nativeEvent }) => {
                            const { contentOffset , contentSize,layoutMeasurement} = nativeEvent
                            const loaderHeight =  0
                            messageStore.setCurrentOffset(contentOffset.y)
                            if(contentSize.height-(layoutMeasurement.height)-loaderHeight<=contentOffset.y && setting.current===false && loading===false){
                                setting.current=true
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
                            <ChatImage  
                            parentRef={containerRef.current}  
                            {...props.currentMessage} 
                            progress={progress}   
                            />
                        )
                    }}
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
                    renderAvatar={(props)=>{
                        const {currentMessage} =props
                        //console.log('avatar',currentMessage.user)
                        return(
                            <CachedImage 
                            uri={currentMessage.user.avatar} 
                            style={{width:40,height:40,borderRadius:20}} 
                             />
                        )
                    }}
                    
                    renderTime={()=><Text></Text>}

                    
                />
            </View>
            
            <BottomSheet isOpen={open} setIsOpen={()=>setOpen(()=>!open)} sendPic={sendPicMessage}  />
        </View>
    )
}
