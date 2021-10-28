import React, { useState ,useEffect,useRef} from 'react'
import { View, Text ,StyleSheet,Image,TextInput,TouchableWithoutFeedback, Keyboard,Animated,DeviceEventEmitter} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenSize } from '../../util/screenSize'
import { FontAwesome5 } from '../../util/Icon'


// mobx 
import { userStore } from '../../mobx/store'

import { observer } from 'mobx-react'
import {
    userLogin,
    checkLogIn
}
from '../../api/api'
import { showMessage, hideMessage } from "react-native-flash-message";

import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { defaultShowMessage } from '../../util/function'

export default observer( (props)=>{

    const viewRef = useRef()

    const dx = 140


    const [username, onChangeUsername] = React.useState();

    const [password, onChangePassword] = React.useState();

    const [usernamePadding, setUsernamePadding] = useState(dx)

    const [passwordPadding, setPasswordPadding] = useState(dx)

    const topOffSet = useRef(new Animated.Value(0)).current;

    const navigation =  useNavigation()

    const reLoginIn = useRef()

    const ChangeText=(value)=>{
        if(value===0){
            setUsernamePadding(()=>{
                // console.log(30-5*username.length)
                return dx-1*username.length
            })
        }else{
            setPasswordPadding(()=>{
                // console.log(30-5*password.length)
                return dx-1*password.length
            })
        }
        
    }

    useEffect(() => {
        if(username!==undefined){
            ChangeText(0)
        }
    }, [username])

    useEffect(() => {
        if(password!==undefined){
            ChangeText(1)
        }
    }, [password])

    const pressKeyBoard=(value)=>{
        
        /* console.log('hi') */
        Animated.timing(topOffSet, {
            toValue: 70,
            duration: 250,
            useNativeDriver:false
          }).start();
    }

    const collapseKeyBoard=()=>{
        Keyboard.dismiss()
        Animated.timing(topOffSet, {
            toValue: 0,
            duration: 250,
            useNativeDriver:false
          }).start();
    }


    const login=()=>{
        userLogin(username,password).then(async res=>{

            defaultShowMessage(res.data.msg==='error'? '帳號或者密碼錯誤':'登入成功')
            

            if(res.data.msg!=='error'){
                //存入userStore..
                userStore.setUserInfo({/* 
                    sessionId:res.data.sessionId,
                    userInfo: */
                    ...res.data.userInfo
                })
                //console.log(await AsyncStorage.getAllKeys())
                let data = await AsyncStorage.setItem('userInfo',JSON.stringify(res.data.userInfo),err=>{
                    console.log(err)
                });
                
                // 通知信息刷新...  -- >MainContent.Notification()
                //DeviceEventEmitter.emit('refreshNotification')

                await userStore.resetUnReadMessage()

               // defaultShowMessage(JSON.stringify(userStore.unreadMessage))
                userStore.setIsSignIn(true)
                navigation.replace('Tab')
            }

        }).catch(err=>{
            console.log(err)
        })
       
    }

    /**
     * @description 檢查是否以前登錄過...
     */
    const checkUserLogIn=async ()=>{
        //await AsyncStorage.clear()
        let userInfo = await AsyncStorage.getItem('userInfo')

       // console.log(await AsyncStorage.getAllKeys())
       // console.log(JSON.parse(userInfo))

        if(userInfo!==undefined && userInfo!==null){

            userStore.setUserInfo({
                userInfo:JSON.parse(userInfo)
            })    
            userStore.setIsSignIn(true)
            navigation.replace('Tab')
            
        }
    }

    useEffect(()=>{
        async function clearData (){
            checkUserLogIn()
        }
        clearData()



    },[])

    return (
        <View style={styles.container} ref={viewRef} >
            <TouchableWithoutFeedback onPress={collapseKeyBoard} style={{flex:1}} /* accessible={false} */>
                <SafeAreaView style={{flex:1}} >
                    <Animated.View style={{position:"absolute",
                    transform:[{translateY:Animated.subtract(130,Animated.divide(topOffSet,2))}]  }}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:screenSize.width}}>
                            <Image source={require('../../assets/home.png')} 
                            style={{width:60,height:60,marginRight:5}} />
                            <Text style={{lineHeight:60,fontSize:30,fontWeight:"bold",color:"#3672CF"}}>DanDan</Text>
                        </View>
                    </Animated.View>
                    {/* input username password */}
                    <Animated.View  
                    style={{position:'relative',opacity:0.7,width:screenSize.width,justifyContent:'center',alignItems:'center',height:40,
                            transform:[{translateY:Animated.subtract(220,topOffSet) }] }}>
                        
                        <View style={{justifyContent:"center",alignItems:'center',position:'absolute',left:55,top:-3,height:45,width:45,backgroundColor:"#FFFFFF",borderRadius:55/2,zIndex:1}}>
                            <Image
                            style={{width:35,height:35,zIndex:2}}
                            source={require('../../assets/home.png')}
                            />
                        </View>
                        <TextInput 
                            editable
                            style={{height:75,
                                borderRadius:40,
                                width:screenSize.width-80,
                                backgroundColor:'#E9EBF1',
                                paddingLeft:usernamePadding,
                                fontSize:19,
                                fontWeight:'500'

                            }}
                            onFocus={pressKeyBoard}
                            value={username}
                            placeholder="輸入帳號"
                            onChangeText={text=>onChangeUsername(text)}
                        />
                    </Animated.View>
                    <Animated.View 
                    style={{opacity:0.7,width:screenSize.width,justifyContent:'center',alignItems:'center',height:40,
                    transform:[{translateY:Animated.subtract(270,topOffSet)}] }}>
                        <TextInput 
                            
                            editable
                            style={{height:75,
                                borderRadius:40,
                                width:screenSize.width-80,
                                backgroundColor:'#E9EBF1',
                                paddingLeft:passwordPadding,
                                fontSize:19,
                                fontWeight:'500'

                            }}
                            secureTextEntry={true}
                            onFocus={pressKeyBoard}
                            value={password}
                            placeholder="輸入密碼"
                            onChangeText={text=>onChangePassword(text)}
                        />
                    </Animated.View>

                    <Animated.View  
                    style={{width:screenSize.width,justifyContent:'center',alignItems:'center',
                    transform:[{translateY:Animated.subtract(350,Animated.multiply(topOffSet,1.5)) }]}}>
                        <View onTouchStart={()=>login()}style={{width:100,height:100,borderRadius:50,backgroundColor:"#E9EBF1",justifyContent:'center',alignItems:'center'}}>
                            <FontAwesome5
                            name="arrow-right"
                            size={30}
                            style={{color:"#FFFFFF"}}
                            />
                          
                        </View>

                    </Animated.View>

                    <Animated.View style={{paddingLeft:60,paddingRight:60,width:screenSize.width,height:60,position:'absolute',justifyContent:'space-around',alignItems:'center',flexDirection:"row",transform:[{translateY:Animated.subtract(750,Animated.multiply(topOffSet,3))}]}}>
                        <Text style={{fontWeight:'500',fontSize:14}} >找回密碼</Text>
                        <Text style={{fontWeight:'500',fontSize:14}} onPress={()=>navigation.navigate("register")} >注冊帳號</Text>
                    </Animated.View>

                </SafeAreaView>
            </TouchableWithoutFeedback>
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        height:screenSize.height
    }
})
