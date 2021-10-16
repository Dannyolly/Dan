
import React,{useState,useEffect,useCallback, useRef} from 'react'
import { StyleSheet, Text, View,Image, Button ,TextInput, Animated, Keyboard} from 'react-native'
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenSize } from '../../util/screenSize'
import MyTextInput from '../../components/MyTextInput'
import Progress from '../../components/Progress'

import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, MaterialIcons } from '../../util/Icon'
import SkeletonView from '../../components/SkeletonView'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { userStore,observer } from '../../mobx/store'

import BottomSheet from '../../components/BottomSheet/Post'
import { register, userLogin } from '../../api/api'
import { defaultShowMessage, objTOParams } from '../../util/function'
import AsyncStorage from '@react-native-async-storage/async-storage'

const step1 = observer(() => {

    const navigation = useNavigation()

    const [isOpen, setIsOpen] = useState(false)

    const [progress, setProgress] = useState(0)

    useFocusEffect(
        useCallback(
            () => {
                setTimeout(()=>{
                   // console.log('set')
                    //userStore.setRegisterProgress(1)
                    register([userStore.submitInfo.icon,userStore.submitInfo.backgroundImage], JSON.stringify(userStore.submitInfo),(progress)=>setProgress(()=>progress))
                    .then(res=>{
                        console.log(res.data)
                        turnToMainScreen(res.data.result)
                    })
                },50)
            },[])
    )
    
    

    const turnToMainScreen=async ( users )=>{
        const {username ,password } = users
        userLogin(username,password).then(async res=>{
            
            defaultShowMessage(res.data.msg==='error'? '帳號或者密碼錯誤':'登入成功')
            console.log(res.data.msg)
            if(res.data.msg!=='error'){
                //存入userStore..
                userStore.setUserInfo({/* 
                    sessionId:res.data.sessionId,
                    userInfo: */
                    ...res.data.userInfo
                })
                
                await AsyncStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));
                let info = await AsyncStorage.getItem('userInfo')
                let result = JSON.parse(info)
                userStore.setIsSignIn(true)
                navigation.replace('Tab')
            }

        }).catch(err=>{
            console.log(err)
        })
        
    }


    return (
        <View style={{backgroundColor:"#FFFFFF",paddingTop:0,width:screenSize.width,height:screenSize.height}}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} style={{paddingTop:100,width:screenSize.width}}>
                <View style={{justifyContent:"center",alignItems:'center',paddingTop:20}}>
                    <Image  source={require('../../assets/home.png')} style={{width:100,height:100}} />
                    <Text style={{fontWeight:'bold',fontSize:40,color:"#3672CF"}}>DanDan</Text>
                </View>
                
                <View style={{width:screenSize.width,justifyContent:'center',alignItems:'center'}}>       
                    
                    {
                        progress!==1?
                        <Image  source={require('../../assets/upload.gif')} style={{width:400,height:400}} />
                        :
                        <Image  source={require('../../assets/finish2.gif')} style={{width:800,height:400}} />
                    }
                    {
                        progress!==1?
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Progress progress={progress} color={'#28C1FD'}  size={100}  />
                            <Text style={{paddingTop:20,fontWeight:'500',fontSize:14}}>上傳你的個人資料中.....</Text>
                        </View>
                        :
                        <View onTouchStart={turnToMainScreen} style={{backgroundColor:"#28C1FD",width:200,height:40,justifyContent:'center',alignItems:'center',borderRadius:20}}>
                            <Text style={{fontWeight:'500',fontSize:14,color:'#FFFFFF'}}> 立即使用 !</Text>
                        </View>
                    }
                </View>
                
                
            </TouchableWithoutFeedback>
            
            
        </View>
    )
})

export default step1

const styles = StyleSheet.create({
    
})
