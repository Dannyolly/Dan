import React, { useEffect, useState ,useCallback, useRef} from 'react'
import { View, Text ,DeviceEventEmitter, Platform,Animated ,FlatList} from 'react-native'
import { screenSize } from '../../util/screenSize'
import HomeHeader from '../../components/Header/HomeHeader'


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
import { getMsgFormat, MessageHandler } from '../Message/MessageHandler'
import { base_url } from '../../api/config'
import { dateCompare, getMostUnReadMessageArr } from './homeUtils'
import { SwipeListView } from 'react-native-swipe-list-view';
import { SafeAreaView } from 'react-native-safe-area-context'

import { ChatMsg } from '../Message/MessageHandler'
import DownScrollLoading from '../../components/DownScrollLoading'
export default observer(()=>{

    const [chatList, setChatList] = useState(undefined)

    const navigation = useNavigation()

    //const [userInfo, setUserInfo] = useState(undefined)
    
    const userInfo = useRef(undefined)

    /*  這個是用來監聽信息 */
    let eventEmitter

    /*  這個是用來監聽是否刷新 */
    let refreshEmitter

    const chatListRef = useRef()

    // scrollRef
    const onScrollRef = useRef()

    // 這個是scroll變量
    const scrollRef = useRef(true)

    //這個是用來控制當移動時,限制scrollRef變化
    const setting = useRef(false)
    
    const currentTopOffset = useRef(new Animated.Value(0)).current
    
    const isFoundUnReadMessage = useRef(false)


    /**
    * @description 這里只是為了找出各聊天的最後一句和跟多少聊天過,并列出所有列表
    * @mark        可視為刷新函數...
    */
    const findOutChatList = async ()=>{
        let a =new Date().getTime()
        console.log(a)

        /** @type {{ userInfo  : import('../../api/api').UserInfo}} */
        let userInfoTemp  
        if(userInfo.current ===undefined){
            userInfoTemp = userStore.userInfo
            
            userInfo.current  = userInfoTemp
        }else{
            userInfoTemp = userInfo.current
        }

        let { data } = await getAllFriend(userInfoTemp.userInfo.id)

        let messageArr = [] 
        for (const item of data) {


            let itemDetails = await MessageHandler.getTheMessageFromLocal(item.id , userInfoTemp.userInfo.id)

            if(itemDetails===null){
                // 兩者沒有對話...

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
            }
            
        }
        //  排序...
        messageArr  = messageArr.sort(dateCompare)
        console.log(messageArr)
        if(messageArr.length !== 0 ){

            setChatList(()=>messageArr)
        
        }else{
            // 新用戶....
            console.log('new User')
            findOutUnReadMessage()

        }
        
        chatListRef.current=messageArr
        console.log('findOutChatList')

        
    }

    /**
     * @description 找出離線收到的信息,并展示出頁面...
     */
    const findOutUnReadMessage = async ()=>{
        let userInfo = userStore.userInfo

        let { data }  = await getAllNotReceiveMsg(userInfo.userInfo.id)

        // 記錄新信息是甚麼的數組, 先進行初始化
        let newMessageList = await getMostUnReadMessageArr()
        
        // 是記錄原數組沒有的人... 比如沒人跟此人對過話,則應從後方推入
        let neverCommunicatedList = []
        
        // 最後用來排序的數組...
        let sortList = []

        //console.log(data,newMessageList[0].length)

        /**
         * @step 1 
         * @description 先分類并排序chatList(只記錄最後一條信息)  ( 這里先假設每個朋友都有談話..後尾會補上 )
         * @tips        根據每個朋友的ID再去匹配1,然後找出每個信息的所在地...
         */
        if(data!==undefined || data.length===0){
            for (const item of data) {
                // 所在地方...
                let index = 0

                /**
                 * @description 
                 *      這里是找一下chatlist chatlist也是只記一下最後消息
                        看看有沒有跟他對話,有則往數組加上...
                 */
                if(chatList!==undefined){
                    for( const list of chatList ) {
                    
                        if(list.objectInfo!==undefined &&list.objectInfo.id===item.sendUserId){
                            newMessageList[index].push(getMsgFormat(item.msg,item))
                            break;
                        }
                        index+=1
                    } 
                }
                
                // 在chatList找不到 ,則往chatList推一個...
                if(newMessageList[index].length===0){
                    newMessageList[index].push(getMsgFormat(item.msg,item))
                    
                    
                    let obj={
                        lastMsgDetail:newMessageList[index][0],
                        objectInfo:undefined
                    }

                    let {data} = await searchUser(`id=${item.sendUserId}`)
                    let formatInfo  = getMsgFormat(item.msg,data[0])
                    obj.objectInfo=formatInfo.user

                    // 格式化後,則往數組push一個obj...
                    let newChatList = []
                    newChatList.push(obj)
                    neverCommunicatedList.push(...newChatList)
                }
            }
            
            // 排序
            if(chatList!==undefined){
                
                sortList = [...neverCommunicatedList , ...chatList]

            }else{

                sortList = [...neverCommunicatedList ]
            }
           // console.log(neverCommunicatedList)
            //console.log('sortList',sortList)
            // 先把新信息插進去...
            if(sortList.length === 1 ){
                // 只有一條信息,就不排了...
                isFoundUnReadMessage.current = true

            }else{

                for (const index in sortList) {
                    if(newMessageList[index].length !== 0 ){
                        sortList[index].lastMsgDetail = newMessageList[index][0]
                    }
                }
                sortList =  sortList.sort(dateCompare)
                isFoundUnReadMessage.current = true
            }
            setChatList(()=>[...sortList])
            
        }
        

        /**
         * @step 2
         * @description 這里是因為原數組換了位置, 提示新信息數組也應一起換位置
         */
        let unReadMessageList = [...newMessageList]

        if(unReadMessageList.length !==1 ){
            unReadMessageList  = sortUnreadMsg(sortList ,newMessageList ,unReadMessageList )
        }
        
        

        /**
         * @step 3
         * @description 設置
         */
        userStore.setUnReadMessage(unReadMessageList,undefined,undefined,true)
        userStore.calculateUnreadMsgCount()

       // console.log('findOutUnReadMessage')
    }

    const sortUnreadMsg = (sortList , newMessageList , unReadMessageList ) =>{
        // 先清空...
        for (const index in unReadMessageList) {
            unReadMessageList[index] = []
        }


        for (const sortListIndex in sortList) {
            for (const newMessageListIndex in newMessageList) {
                if(newMessageList[newMessageListIndex].length === 0 ){
                    continue
                }
                if(newMessageList[newMessageListIndex][0]._id === sortList[sortListIndex].lastMsgDetail._id){
                    unReadMessageList[sortListIndex] = newMessageList[newMessageListIndex]

                }
            }
        }
        return unReadMessageList
    }

    const getData=async ()=>{
        /**
         * @step1 
         */
        await findOutChatList()

        
    }


    /**
     * @description 當收到信息時,馬上對該用戶頭上加上消息...
     */
    const findOutMessageLocation = async (msgInfo) => {
        let list = chatListRef.current
        //用來記錄數組第幾個信息來信息了...
        let listIndex = 0;
        //下列這種情況是當在兩方發過信息時的情況...
        let userInfo = userStore.userInfo
        
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
                //console.log('add?')
            }else{
                newChatListArr.push(obj)
            }
            setChatList(()=>newChatListArr)
            chatListRef.current=newChatListArr
            listIndex=newChatListArr.length-1
            

        }else{
            // 這個是有記錄的,那則可以在chatList對應找出對話,從而插入對話....

            for (const index in list) {
                if (msgInfo.user.id === list[index].objectInfo.id) {
                    break;
                }
                listIndex++
            }

            chatListRef.current = sortMessage( list ,listIndex)
            
            setChatList(()=>chatListRef.current)
        }
        
        // 排序一下....
        //console.log('remind ~~~~~',remindListTemp)


        //setRemindList(()=>remindListTemp)
        //remindListRef.current=remindListTemp

        /* 設置多少個信息未看 */
        userStore.setUnReadMessage({...msgInfo},0)
        userStore.calculateUnreadMsgCount()


        
        
    }
    
    /**
     * 
     * @param {Array}   arr     排序數組
     * @param {Number}  index   需要放到第一位的index
     */
    const sortMessage =  ( arr , index ) =>{
        
        arr.unshift(arr[index])

        return  arr.filter((item,i)=>i!==index+1)

        
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
            //console.log(msgInfo)
            findOutMessageLocation(msgInfo)
        })

        refreshEmitter =DeviceEventEmitter.addListener("refresh",function (){
            console.log(' start to refresh')
            getData()
        })

        return()=>{


            console.log('EMitter removed ')

            eventEmitter.remove()
            refreshEmitter.remove()
        }
    }, [])

    useEffect(() => {
        /**
         * 查找多少未讀消息...
         */
        if(chatList!==undefined && !isFoundUnReadMessage.current){
            console.log('??')
            findOutUnReadMessage()
        }
    
    }, [chatList])

    /* const ListHeader = ()=>{
        return (
            <Animated.View 
            style={{backgroundColor:"transparent",
            zIndex:0,height:50,
            }}
            >
                <HomeHeader navigation={navigation} />
            </Animated.View>
        )
    } */


    return (

            <View style={{width:screenSize.width,height:screenSize.height,backgroundColor:"#FfFfFf"}}>
            {/* header */}
            
            {
                chatList!==undefined
                && 
                <FlatList 
                overScrollMode={'always'}
                ref={c=>onScrollRef.current=c}
                data={chatList}
                refreshControl={props=><DownScrollLoading  {...props} />}
                onScroll={
                    Animated.event(
                    [
                    {
                        nativeEvent: {contentOffset: {y: currentTopOffset}},
                    },
                    ],
                    {useNativeDriver: false}
                
                    )
                } 
                //ListHeaderComponent={ListHeader}
                /* scrollEnabled={false} */
                renderItem={({ item,index })=>
                <Item 
                    isSwipe={scrollRef.current} 
                    setOnScroll={handleToggle}
                    item={item} 
                    index={index} 
                    userInfo={userInfo}  
                    navigation={navigation} 
                /> 
            }
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