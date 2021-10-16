import React, { useEffect, useRef } from 'react'
import { View, Text ,StyleSheet, Platform} from 'react-native'
import { screenSize } from '../../util/screenSize'
import CachedImage from '../../components/CachedImage'
import { base_url } from '../../api/config'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { calculateDate, getUserMainInfo } from '../../util/function'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { userStore,observer } from '../../mobx/store'
import { DeviceEventEmitter } from 'react-native'
import Swipeable from 'react-native-swipeable';

import { Entypo ,MaterialCommunityIcons} from '../../util/Icon'
export default observer(( { item,navigation,index,setOnScroll,isSwipe } )=>{

    // 控制當左右拉時,不能點入聊天
    const control = useRef(true)

    useEffect(() => {
        //calculateDate(item.lastMsgDetail.createdAt)
        
    }, [])

    const deleteLocalChatMsg=async ()=>{
        let userInfo = await getUserMainInfo()
        console.log(item.objectInfo.id,userInfo.userInfo.id)
        
        await AsyncStorage.removeItem(`${item.objectInfo.id}msg${userInfo.userInfo.id}`)
        DeviceEventEmitter.emit('refresh')
    }


    const rightButtons = [
        <TouchableHighlight underlayColor={"#f4f4f4"} style={{paddingLeft:25,height:90,backgroundColor:"#F4F4F4"}}>
            <View style={{paddingTop:25}}>
                <Entypo name='flickr-with-circle' onPress={()=>null}  size={24} style={{color:"#21CFFF",marginBottom:2}} />
                <Text style={{fontSize:13}} >更多</Text>
            </View>
        </TouchableHighlight>
        ,
        <TouchableHighlight onPress={()=>deleteLocalChatMsg()} underlayColor={"#21CFFF"} style={{paddingLeft:25,height:90,backgroundColor:'#21CFFF'}}>
           <View style={{paddingTop:22}}>
                <MaterialCommunityIcons name='delete-alert' size={27} style={{color:"#FFFFFF",marginBottom:2}} />
                <Text style={{fontSize:13}} >刪除</Text>
            </View>
        </TouchableHighlight>
    ];



    return (
        <Swipeable  
        rightButtons={rightButtons} 
        rightActionActivationDistance={0}
        onSwipeStart={()=>{
            control.current=!control.current
            //console.log('control.current',control.current);
            setOnScroll()
        }} 
        >
            <View style={{width:screenSize.width,height:90}}>
                
                    <TouchableHighlight 
                    style={{width:screenSize.width,height:90,padding:10,paddingLeft:20,paddingRight:20,paddingTop:20,marginBottom:10}}
                    activeOpacity={0.6} 
                    underlayColor={"#F7F5F8"}
                    //underlayColor={"#F4F4F4"}
                    
                    onPressIn={()=>{
                        if(control.current===true){
                            userStore.setUnReadMessage([],index,true)
                            userStore.calculateUnreadMsgCount()

                            navigation.navigate('Message',{
                                item:item.objectInfo
                            })
                        }
                    }}>
                        <View style={{width:screenSize.width,height:80,paddingLeft:65}}>
                            <CachedImage
                            uri={base_url+item.objectInfo.avatar}
                            id={item.objectInfo.id}
                            style={styles.picStyle}
                            />
                            <View style={{width:screenSize.width,height:70,padding:5,position:'relative'}}>
                                <Text style={{fontSize:18,fontWeight:'400',marginBottom:5}}>{item.objectInfo.name}</Text>
                                <View style={{width:screenSize.width,height:70,flexDirection:'row'}}>
                                {
                                    item.lastMsgDetail.user.id===item.objectInfo.id?
                                    <Text style={{color:"#B2B2B3",marginRight:15,fontSize:13,lineHeight:18}}>
                                        
                                        {
                                            index!==undefined
                                            &&
                                            userStore.unreadMessage.length>0
                                            &&
                                            userStore.unreadMessage[index]!==undefined
                                            &&
                                            userStore.unreadMessage[index].length>0?
                                            <Text>{userStore.unreadMessage[index][userStore.unreadMessage[index].length-1].text || "圖片"}</Text> 
                                            :
                                            <Text>{item.lastMsgDetail.text || "圖片"}</Text>
                                        }
                                    </Text>
                                    :
                                        
                                    <Text style={{color:"#B2B2B3",marginRight:15,fontSize:13,lineHeight:18}}>
                                        {
                                            index!==undefined
                                            &&
                                            userStore.unreadMessage.length>0
                                            &&
                                            userStore.unreadMessage[index]!==undefined
                                            &&
                                            userStore.unreadMessage[index].length>0?
                                            <Text>{`${userStore.unreadMessage[index][userStore.unreadMessage[index].length-1].text}`|| "圖片"}</Text> 
                                                :
                                            <Text>{`你: ${item.lastMsgDetail.text!==undefined?item.lastMsgDetail.text:"[ 圖片 ]"}`}</Text>
                                        }
                                    </Text>
                                }
                                
                                </View>
                            </View>
                            <Text style={{color:"#B2B2B3",fontSize:13,lineHeight:23,position:'absolute',right:40}}>
                                {
                                    index!==undefined
                                    &&
                                    userStore.unreadMessage.length>0
                                    &&
                                    userStore.unreadMessage[index]!==undefined
                                    &&
                                    userStore.unreadMessage[index].length===0?
                                    calculateDate(item.lastMsgDetail.createdAt)
                                    :
                                    calculateDate(userStore.unreadMessage[index][userStore.unreadMessage[index].length-1].createdAt)
                                }

                            </Text>
                            {
                                index!==undefined
                                &&
                                userStore.unreadMessage.length>0
                                &&
                                userStore.unreadMessage[index]!==undefined
                                &&
                                userStore.unreadMessage[index].length!==0
                                &&
                                <View style={{justifyContent:"center",alignItems:'center',width:20,height:20,borderRadius:10,backgroundColor:'#28C1FD',position:"absolute",right:40,bottom:32}}>
                                    <Text style={{fontSize:12,color:"#F4F4F4"}}>{userStore.unreadMessage[index].length}</Text>
                                </View>
                            }
                        </View>
                    </TouchableHighlight>
                
            </View>
        </Swipeable>
    )
})


const styles = StyleSheet.create({
    picStyle:{
        width:50,
        height:50,
        borderRadius:25,
        position:'absolute',
        left:0,
        top:5
    }
})