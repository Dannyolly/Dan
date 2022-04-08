import React, { Component,useEffect,useRef,useState } from 'react'
import { 
    Button,
    Text, 
    View ,
    Image,
    TextInput,
    Platform,
    StyleSheet,
    DeviceEventEmitter,
    Animated
} from 'react-native'
/* import EventBus from 'react-native-event-bus' */

/* import {
    getCourseData,
    getCourseFields,
    getCourses
}
    from '../../api/api' */
import { LinearGradient } from 'expo-linear-gradient';
import {NavigationContainer ,useNavigationContainerRef } from '@react-navigation/native'
/* import {createStackNavigator} from '@react-navigation/stack' */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs' 

import { createNativeStackNavigator} from '@react-navigation/native-stack';


import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'



import { Header } from 'react-native/Libraries/NewAppScreen'


/* 底下tabBar - 4  */
import Home from '../pages/Home'
import Friend from '../pages/Friend'
import Discover from '../pages/Discover'
import Individual from '../pages/Individual'
import UserInformation from '../pages/UserInformation'
import Post from '../pages/Post'
import Register from '../pages/Register'

import Login from '../pages/Login'


import { screenSize } from '../util/screenSize'
import { useNavigation } from '@react-navigation/native'


// component

import QRcodeSCanner from '../components/QRcodeScanner'
import OwnQRcode from '../components/OwnQRcode'
import AddUser from '../pages/AddUser'
import FriendDelta from '../pages/AddUser/FriendDelta';
import CheckFriendRequest from '../pages/CheckFriendRequest'
import Message from '../pages/Message'
import Comment from '../pages/Comment'

//header 
import HomeHeader from '../components/Header/HomeHeader';
import FriendHeader from '../components/Header/FriendHeader'
import DiscoverHeader from '../components/Header/Discover'
import CommentHeader from '../components/Header/Comment'

// register
import Step1 from '../pages/Register/Step1'
import Step2 from '../pages/Register/Step2'
import Step3 from '../pages/Register/Step3'
import Last from '../pages/Register/last'

import VideoPlayer from '../components/VIdeoplayer'
import CachedImage from '../components/NonIdCachedImage'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CheckFriend from '../components/Header/CheckFriend';
import {userStore,observer} from '../mobx/store'

import { base_url } from '../api/config';

import {
    getAllFriendRequest, getAllNotReceiveMsg
}from '../api/api'

import UploadImage from '../components/UploadImage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateRequestNotification } from '../util/function';
import { messageResponser, selectionResponser } from '../util/haptic';
import { EventEmitter } from 'react-native';
import test from './test';
import { Easing } from 'react-native';

import {  AppState } from 'react-native'
import SplashView from '../pages/SplashView'
import { imageStore } from '../mobx/lock';
import Collection from '../pages/Collection';

const TabNumber = observer(({ iconName,color,size,index })=>{
    /* index 指的是tabBar 第幾個 下標1開始... */
    return(
        <View>
            
            {
                index===1
                &&
                <View>
                    <Ionicons
                        name={iconName}
                        color={color}
                        size={size}
                    />
                    {
                    userStore.unreadMessageCount!==0
                    &&
                    <View style={{justifyContent:"center",alignItems:"center",position:'absolute',right:-10,top:0,width:15,height:15,borderRadius:7.5,backgroundColor:"#4399FE"}}>
                        <Text style={{fontSize:10,color:"#FFFFFF"}}>{userStore.unreadMessageCount}</Text>
                    </View>
                    }
                </View>
            }
            {
                index===2
                &&    
                <View>
                    <FontAwesome5
                    name={iconName}
                    color={color}
                    size={size}
                    />
                    {
                        userStore.friendRequestDidNotReadNumber!==0
                        &&
                        <View style={{justifyContent:"center",alignItems:"center",position:'absolute',right:-10,top:0,width:15,height:15,borderRadius:7.5,backgroundColor:"#4399FE"}}>
                            <Text style={{fontSize:10,color:"#FFFFFF"}}>{userStore.friendRequestDidNotReadNumber}</Text>
                        </View>
                    }
                </View>
            }
        </View>
    )
})

const UserTabIcon = observer(()=>{
    

 

    return(
        <View  style={{paddingTop:5}} >
            {
                userStore.userInfo.userInfo!==undefined
                &&
                <CachedImage  
                uri={base_url+userStore.userInfo.userInfo.icon}
                style={styles.picStyle}
                />
            }
        </View>
    )
})


const BottomTab = observer((props)=>{

    
    
    const ref = useNavigationContainerRef()


    const Tab =createBottomTabNavigator();

    const navigation = useNavigation()
    
    const [opacity, setOpacity] = useState(1)


    const translateY = useRef(new Animated.Value(0)).current

    

    useEffect(() => {
       


        DeviceEventEmitter.addListener('setOpacity',( opacity )=>{
            //console.log(`opacity = ${opacity}`)
            setOpacity(()=>opacity)
        })

        

        /* return ()=>{
            DeviceEventEmitter.removeAllListeners()
        } */
    }, [])


    
    return (
        <View style={{flex:1,zIndex:0}}>
        <Tab.Navigator
         
         screenOptions={ ({route}) => ({
            
            tabBarIcon:( {focused,color,size} ) =>{
                let iconName;
                switch(route.name){
                    case 'Dan':
                        iconName ='chatbubbles';
                        return(

                            <TabNumber {...{color,size,iconName} }  index={1} />
                        )
                     
                    case '通讯录':
                        iconName ='user-friends';
                        return (
                            <TabNumber {...{color,size,iconName} }  index={2} />
                        )
                    case 'discover':
                        iconName = 'find'
                        return(
                            focused?
                            <Image  source={require('../assets/home.png')} 
                            style={{width:30,height:30,paddingBottom:10}}  />
                            :
                            <Image  source={require('../assets/home.png')} 
                            style={{width:30,height:30,paddingBottom:10,opacity:0.5}}  />
                        )
                    case '個人頁':
                        iconName = 'md-person-circle'
                        return(
                            <Ionicons 
                            name={iconName}
                            color={color}
                            size={size}
                            />
                        )
                    case 'userInformation':
                        return(
                            <UserTabIcon />
                        )
                }
                
            },
            headerStyle:{
                shadowColor: 'transparent',
                zIndex:0,
            },
            headerShadowVisible:false,
            headerTitle:'',
            
            tabBarStyle:{
                /* display:'none', */
                zIndex:0,
                position:'absolute',
                paddingTop:5,
                transform:[{translateY:translateY}],
                borderTopColor:'#FFFFFF',
                shadowRadius:2,
                shadowOffset:{
                    width:0,
                    height:10
                },
                //elevation:5,
                shadowColor:"#CDCDCD",
                height:88,
                opacity:opacity,
            },

            tabBarItemStyle:{
                paddingTop:5,
                height:45,
            },
            tabBarInactiveTintColor:'#999',
            tabBarActiveTintColor:'#22CAFE',
            //headerShown:false,
            
         })}
            sceneContainerStyle={{
                zIndex:0
            }}
            
            
            
        >
            <Tab.Screen
                name="discover"
                component={ Discover}
                listeners={{
                    tabPress:e=>{
                        selectionResponser()
                    },
                    
                }}
                options={{
                    title:"發現",
                    headerShown:false
                    
                }}
            />

            <Tab.Screen
                name="Dan"
                children={()=><Home />}
                listeners={{
                    tabPress:e=>{
                        selectionResponser()
                    },
                }}
                options={{
                    lazy:Platform.OS==='ios'?false:true,
                    headerLeft:({navigation})=>(
                        <HomeHeader  navigation={navigation} />
                    )
         
                }}
            />
            
            <Tab.Screen
                name="post"
                component={Post}
                options={{
                    headerShown:false,
                    tabBarButton:()=>{
                        return(
                            <View style={{paddingTop:5}}>
                                <View 
                                onTouchEnd={()=>{
                                    navigation.navigate('Post')
                                    messageResponser()
                                }} 
                                style={{shadowColor:"#22CAFE",shadowRadius:40,shadowOffset:{width:20,height:20},marginLeft:15,marginRight:15,width:40,height:40,borderRadius:20,justifyContent:"center",alignItems:"center",backgroundColor:"#22CAFE"}}>
                
                                    <Text style={{fontSize:30,fontWeight:'500',color:'#FFFFFF',lineHeight:30}} >+</Text>
                                </View>
                            </View>
                        )
                    },
                    
                   
                    
                }}
            />
            <Tab.Screen
                name="通讯录"
                component={ Friend}
                options={{
                    lazy:Platform.OS==='ios'?false:true,
                    headerShown:false,
                   
                }}
            />

            <Tab.Screen
                name="userInformation"
                children={()=><UserInformation />}
                listeners={{
                    tabPress:e=>{
                        selectionResponser()
                    }
                }}
                options={{
                    headerShown:false,
                    title:"個人頁",
                    lazy:Platform.OS==='ios'?false:true,
                    /* headerLeft:props=><HomeHeader {...props} navigation={navigation} />, */
                    /* headerTitle:'聊天室' */
                }}
            />
            

            {/* <Tab.Screen
                name="video"
                component={ test }
                options={{
                    headerTitle:"video",
                    headerTitleStyle:{
                        color:"#FFFFFF"
                    },
                    headerShown:false
                }}
            /> */}


        </Tab.Navigator>
        </View>
    )
})




export default observer((props)=>{

    
    const Stack = createNativeStackNavigator()

    let instance

    const [isClose, setIsClose] = useState(false)

    const appState = useRef(AppState.currentState);

    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
        AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
        if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
        ) {
        console.log("App has come to the foreground!");
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        //console.log("AppState", appState.current);
    };

    


    const getAllNotification=async ()=>{      
        let json =await AsyncStorage.getItem('userInfo')
        if(json!==undefined && json!==null){
            let res =JSON.parse(json)
            userStore.setUserInfo(res)
            getAllFriendRequest(res.userInfo.id).then(res=>{
                
                userStore.setFriendRequestDidNotRead(calculateRequestNotification(res.data))
                userStore.setFriendRequestInfo(res.data);
            })

            getAllNotReceiveMsg(res.userInfo.id).then(res=>{
                userStore.setUnReadMessageCount(res.data.length)
            })
            

        }
        
        // 初始化數組....
        await userStore.resetUnReadMessage()
        //console.log('getNotification~~~~')
    }

    
    useEffect(()=>{

        getAllNotification() 
          
        // 接收信息,,,
        instance =  DeviceEventEmitter.addListener('refreshNotification',()=>{
           // console.log('getNotification~~~~')
            getAllNotification()
            
        })

        return ()=>{
            instance.remove()
        }

    },[])


    const checkUserLogIn=async ()=>{
        //await AsyncStorage.clear()
        let userInfo = await AsyncStorage.getItem('userInfo')

        let res = JSON.parse(userInfo)
       // console.log('?',res.userInfo.id)
        
       // console.log(await AsyncStorage.getAllKeys())
       // console.log('test',JSON.parse(userInfo))

        if(userInfo!==undefined && userInfo!==null){

            userStore.setUserInfo({
                ...JSON.parse(userInfo)
            })    
            //console.log('checked')
            userStore.setIsSignIn(true)
            
        }


        AsyncStorage.setItem(`${res.userInfo.id}userInfo`,userInfo)
       
    }

    useEffect(() => {
        // 先檢查一下有沒有登入過...
        checkUserLogIn()
        
        setTimeout(()=>{
            setIsClose(()=>true)
        },2000)

    }, [])
    

    
    if(!userStore.isSignIn && isClose!==true){
        return <SplashView/>
    }


    return (
        <View style={{flex:1}}>
            {
                !isClose
                &&
                <SplashView/>
            }
        <NavigationContainer 
          
        >   
            
            <Stack.Navigator 
            screenOptions={{
                headerStyle:{
       
                    shadowColor: 'transparent',
        
                },          
                headerShadowVisible:false,
                headerBackTitleStyle:{
                    color:"black"
                },
                headerShown:false,
                
                }}>
                
                {
                    userStore.isSignIn===false?
                    <>
                    <Stack.Screen 
                    name="login" 
                    component={Login}
                    options={{
      
                        headerShown:false
                    }}
                    />
                    <Stack.Screen 
                    name="register" 
                    component={Register}
                    options={{
    
                        headerShown:false,
                        
                    }}
                    />
                    

                    <Stack.Screen 
                    name="step1" 
                    component={Step1}
                    options={{
     
                        headerShown:false,
                    }}
                    />

                    <Stack.Screen 
                    name="step2" 
                    component={Step2}
                    options={{
   
                        headerShown:false,
                    }}
                    />

                    <Stack.Screen 
                    name="step3" 
                    component={Step3}
                    options={{
 
                        headerShown:false,
                    }}
                    />

                    <Stack.Screen 
                    name="last" 
                    component={Last}
                    options={{
        
                        headerShown:false,
                    }}
                    />
                    </>
                    :
                    <>
                        <Stack.Screen 
                        name="Tab" 
                        children={()=><BottomTab  />}
                        options={{
      
                            headerShown:false,
                            
                        }}
                        />

                        <Stack.Screen 
                        name="Post" 
                        component={Post}
                        options={{
    
                            headerShown:false,
                            presentation:'modal'
                        }}
                        />

                        <Stack.Screen 
                        name="comment" 
                        component={Comment}
                        options={{
              
                        headerBackTitle:"",
                        headerTitle:'留言',
                        headerShown:false

                        }}
                        />

                        <Stack.Screen 
                        name="videoPlayer" 
                        component={ VideoPlayer }
                        options={{
                       
                    
                        headerShown:false
                       
                        }}
                        />

                        

                        

                        
                        <Stack.Screen 
                        name="userInfo" 
                        component={UserInformation}
                        options={{

                            headerShown:false,
                            headerBlurEffect:'dark',
                            presentation:Platform.OS==='ios'?'modal':'fullScreenModal',
       
                            
                        }}
                        />
                    
                        

                        

                        <Stack.Screen 
                        name="Message" 
                        component={Message}
                        options={{
       
                            headerShown:false,
                            
                        }}
                        />


                        <Stack.Screen 
                        name="checkFriendRequest" 
                        children={()=><CheckFriendRequest />}
                        options={{
          
                            headerShown:true,
                            headerStyle:{backgroundColor:"#FFFFFF"},
                            headerBackVisible:true,
                            headerTitle:"新朋友",
                            headerRight:props=><CheckFriend  />
                        }}
                        />



                        <Stack.Screen 
                        name="addUser" 
                        children={()=><AddUser/>}
                        options={{
      
                            headerTitle:"添加好友",
                            headerBackTitle:"",                      
                            headerStyle:{backgroundColor:"#FFFFFF"}
                        }}
                        />
                        
                        <Stack.Screen 
                        name="friendDelta" 
        
                        component={FriendDelta}
                        options={{
                            headerShown:false
                        }}
                        />
                        
                        <Stack.Screen 
                        name="qrcode" 
                        children={()=><QRcodeSCanner />}
                        options={{
                            headerShown:false,
                            
                        }}
                        />

  
                        <Stack.Screen 
                        name="OwnQRcode" 
                        children={()=><OwnQRcode/>}
                        options={{

                            headerBackTitle:"",
                            presentation:'modal',
                            headerShown:false
                        }}
                        />

                        <Stack.Screen 
                        name="individual" 
                        component={Individual}
                        options={{
            
                            headerShown:false,
                            presentation:'modal'
                        }}
                        />
                        

                        <Stack.Screen 
                        name="collection" 
                        component={Collection}
                        options={{
            
                            headerShown:true,
                            presentation:'modal',
                            title:'收藏',
                            headerTintColor:'#21CFFF'
                        }}
                        />


                    </>

                }
                

                
                
                
               


                

                

                

            </Stack.Navigator>

        </NavigationContainer>
    </View>
    )
})



const styles = StyleSheet.create({
    headerTitle:{
        position:'absolute',
        top:50,
        /* left:70, */
        color:"#3672CF",
        fontSize:30,
        fontWeight:'bold'
    },
    picStyle:{
        paddingTop:5,
        width:32,
        height:32,
        marginBottom:8,
        borderRadius:22.5
    }
})