import React, { useEffect, useState ,useCallback, useRef} from 'react'
import { View, Text ,DeviceEventEmitter, Platform,} from 'react-native'
import { screenSize } from '../../util/screenSize'
import HomeHeader from '../../components/Header/HomeHeader'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import {
    getAllFriend,
    getAllNotReceiveMsg,
    searchUser
}from '../../api/api'
import { calculateSum, getUserMainInfo } from '../../util/function'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Item from './item'
import { useNavigation } from '@react-navigation/native'
import { EventEmitter } from '@unimodules/react-native-adapter'

import { userStore,observer } from '../../mobx/store'
import { getMsgFormat } from '../Message/messageUtils'
import { base_url } from '../../api/config'
import { getMostUnReadMessageArr } from './homeUtils'
import { SwipeListView } from 'react-native-swipe-list-view';

export default observer(()=>{

    const [chatList, setChatList] = useState(undefined)

    const navigation = useNavigation()

    const [userInfo, setUserInfo] = useState(undefined)
    
    /*  這個是用來監聽信息 */
    let eventEmitter

    /*  這個是用來監聽是否刷新 */
    let refreshEmitter

    const chatListRef = useRef()

    /**    這個是記錄有多少新信息   */
    const [remindList, setRemindList] = useState([])

    const remindListRef =useRef()

    // scrollRef
    const onScrollRef = useRef()

    // 這個是scroll變量
    const scrollRef = useRef(true)

    //這個是用來控制當移動時,限制scrollRef變化
    const setting = useRef(false)
    
    
    
    /**
    * @description 這里只是為了找出各聊天的最後一句和跟多少聊天過,并列出所有列表
    * @mark        可視為刷新函數...
    */
    const findOutChatList = async ()=>{
        let userInfo = await getUserMainInfo()  
        console.log('userinfo',userInfo)
        setUserInfo(()=>userInfo.userInfo)
        let { data } = await getAllFriend(userInfo.userInfo.id)
        let messageArr = [] 
        let remindListTemp =  []
        console.log(userStore.userInfo.userInfo.id)
        //await AsyncStorage.removeItem(`${item.id}msg${userInfo.userInfo.id}`)

        for (const item of data) {
            let a = await AsyncStorage.getItem(`${item.id}msg${userInfo.userInfo.id}`)
            let itemDetails = JSON.parse(a)

            if(itemDetails===null){
                // 兩者沒有對話...
                break;
            }else{
                // 其中一方對話或兩者都對話...
                let obj={
                    lastMsgDetail:itemDetails[0],
                    objectInfo:undefined
                }
                let {data} = await searchUser(`id=${item.id}`)
                let formatInfo  = getMsgFormat(item.msg,data[0],1)
                obj.objectInfo=formatInfo.user
                messageArr.push(obj)
                remindListTemp.push(0)
            }
            
        }
        setRemindList(()=>remindListTemp)
        setChatList(()=>messageArr)
        //console.log('messageArr',messageArr)
        chatListRef.current=messageArr
        remindListRef.current=remindListTemp
    }

    /**
     * @description 找出離線收到的信息,并展示出頁面...
     */
    const findOutUnReadMessage = async ()=>{
        let userInfo = await getUserMainInfo()

        let { data }  = await getAllNotReceiveMsg(userInfo.userInfo.id)


        /**
         * @step 1 
         * @description 先分類... 這里先假設每個朋友都有談話..後尾會補上
         * @tips        根據每個朋友的ID再去匹配1,然後找出每個信息的所在地...
         */

        let listTemp = await getMostUnReadMessageArr()
        if(data!==undefined || data.length===0){
            for (const item of data) {
                // 所在地方...
                let index = 0

                /**
                 * @description 
                 *      這里是找一下chatlist chatlist也是只記一下最後消息
                        看看有沒有跟他對話,有則往數組加上...
                 */
                for( const list of chatList ) {
                    
                    if(list.objectInfo!==undefined &&list.objectInfo.id===item.sendUserId){
                        listTemp[index].push(getMsgFormat(item.msg,item))
                        break;
                    }
                    index+=1
                } 
                
                // 在chatList找不到 ,則往chatList推一個...
                if(listTemp[index].length===0){
                    listTemp[index].push(getMsgFormat(item.msg,item))
                    let obj={
                        lastMsgDetail:listTemp[index][0],
                        objectInfo:undefined
                    }
                    let {data} = await searchUser(`id=${item.sendUserId}`)
                    let formatInfo  = getMsgFormat(item.msg,data[0])
                    obj.objectInfo=formatInfo.user

                    // 格式化後,則往數組push一個obj...
                    let newChatList = [...chatList]
                    newChatList.push(obj)
                    setChatList(()=>newChatList)
                    chatListRef.current=newChatList
                }
            }
            
        }
        
        userStore.setUnReadMessage(listTemp,undefined,undefined,true)
        

        userStore.calculateUnreadMsgCount()

        
    }

    const getData=async ()=>{
        /**
         * @step1 
         */
        findOutChatList()

        
    }

    useEffect(() => {
        /**
         * 查找多少未讀消息...
         */
        if(chatList!==undefined){
            findOutUnReadMessage()
        }
    
    }, [chatList])


    /**
     * @description 當收到信息時,馬上對該用戶頭上加上消息...
     */
    const findOutMessageLocation = async (msgInfo) => {
        let list = chatListRef.current
        let remindListTemp = [...remindListRef.current]
        //用來記錄數組第幾個信息來信息了...
        let listIndex = 0;
        //下列這種情況是當在兩方發過信息時的情況...
        let userInfo = await getUserMainInfo()
        console.log(msgInfo.user.id)
        let a = await AsyncStorage.getItem(`${msgInfo.user.id}msg${userInfo.userInfo.id}`)
        let chatHistory = JSON.parse(a)

        
        if(chatHistory===null || chatHistory===undefined){
            // 沒有記錄的情況,則往chatList插入一個...

            let newChatListArr = [] 
            let obj={
                lastMsgDetail:msgInfo,
                objectInfo:msgInfo.user
            }
            // 這里要判斷它是否沒有跟任何人談話過...
            if(chatListRef.current!==undefined ){
                newChatListArr= [obj,...chatListRef.current]
                console.log('add?')
            }else{
                newChatListArr.push(obj)
            }
            setChatList(()=>newChatListArr)
            chatListRef.current=newChatListArr
            remindListTemp[newChatListArr.length-1]+=1
            listIndex=newChatListArr.length-1
            
        }else{
            // 這個是有記錄的,那則可以在chatList對應找出對話,從而插入對話....

            for (const index in list) {
                if (msgInfo.user.id === list[index].objectInfo.id) {
                    remindListTemp[index]+=1
                    break;
                }
                listIndex++
            }
        }
        
        setRemindList(()=>remindListTemp)
        remindListRef.current=remindListTemp

        /* 設置多少個信息未看 */
        userStore.setUnReadMessage({...msgInfo},listIndex)
        userStore.calculateUnreadMsgCount()

        
    }
    
    const handleToggle = ()=>{
        if(!setting.current){
            setting.current=true
            scrollRef.current =!scrollRef.current
            //console.log(scrollRef.current)
            onScrollRef.current.setNativeProps({
                scrollEnabled:scrollRef.current
            })   
            setTimeout(()=>{
                setting.current=false
            },300)
        }
    }

    useEffect(() => {
        getData()
        eventEmitter = DeviceEventEmitter.addListener("receiveMsg",function (msgInfo){
            console.log(msgInfo)
            findOutMessageLocation(msgInfo)
        })

        refreshEmitter =DeviceEventEmitter.addListener("refresh",function (){
            getData()
        })

        return()=>{
            eventEmitter.remove()
            refreshEmitter.remove()
        }
    }, [])

   

   


    return (
        <View style={{width:screenSize.width,height:screenSize.height,backgroundColor:"#FfFfFf"}}>
            
            {
                chatList!==undefined
                && 
                <FlatList
                ref={c=>onScrollRef.current=c}
                data={chatList}
                /* scrollEnabled={false} */
                renderItem={({ item,index })=><Item 
                isSwipe={scrollRef.current}  setOnScroll={handleToggle}
                 item={item} index={index} userInfo={userInfo}  navigation={navigation} /> }
                keyExtractor={item=>{
                    if(item.objectInfo!==undefined){
                        return item.objectInfo.id.toString()
                    }
                }}
                /> 
            }
                    


        </View>
    )
})