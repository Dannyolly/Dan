import React, { useEffect, useRef } from 'react'
import { View, Text ,StyleSheet, StatusBar, StatusBarIOS, SafeAreaView,Image, DeviceEventEmitter, Animated, Easing} from 'react-native'

import { screenSize } from '../../util/screenSize'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign ,FontAwesome,FontAwesome5,Ionicons} from '../../util/Icon';
import { userStore,observer } from '../../mobx/store';

import CachedImage from '../CachedImage'
import { base_url } from '../../api/config';
import PostItem from '../../pages/Discover/PostItem';
import { imageStore } from '../../mobx/lock';

export default observer(({ navigation })=>{


    const translateY = useRef(new Animated.Value(0)).current

    const collapseBottomTabBar = () =>{
    
        Animated.timing(translateY,{
            toValue:-85,
            easing:Easing.linear,
            duration:200,
            useNativeDriver:true
        }).start()
    }

    const showBottomTabBar = () =>{
     
        Animated.timing(translateY,{
            toValue:0,
            easing:Easing.linear,
            duration:200,
            useNativeDriver:true
        }).start()
    }

    useEffect(()=>{

        DeviceEventEmitter.addListener('collapseBottomTabBar',( data )=>{
            collapseBottomTabBar()
        })

        DeviceEventEmitter.addListener('showBottomTabBar',( data )=>{
            showBottomTabBar()
        })


    },[])


    return(
        <Animated.View style={[{transform:[{translateY}]},{width:screenSize.width,height:85,backgroundColor:"#FFFFFF",zIndex:0,opacity:imageStore.isStart===true?0:1}]}>    
            {/* <View onTouchEnd={()=>navigation.navigate('userInfo')} style={{position:'absolute',bottom:10,left:20}}>
                {
                    userStore.userInfo!==undefined
                    &&
                    <CachedImage  
                    uri={base_url+userStore.userInfo.userInfo.avatar}
                    style={styles.picStyle}
                    />
                }
            </View> */}
            <View style={{width:screenSize.width,justifyContent:"center"}}>
              
                <Text style={[styles.headerTitle,{paddingLeft:10}]}>DanDan</Text>
            </View>
            <View  onTouchStart={()=>navigation.navigate('qrcode')} style={{paddingLeft:1,backgroundColor:"#21CFFF",borderRadius:25,width:35,height:35,justifyContent:"center",alignItems:'center',position:'absolute',right:10,bottom:8}}>
                <Ionicons   name="scan" style={{fontSize:20,color:"#FFFFFF"}} />
            </View>
           
            <View  style={{paddingLeft:1,backgroundColor:"#21CFFF",borderRadius:25,width:35,height:35,justifyContent:"center",alignItems:'center',position:'absolute',right:55,bottom:8}}>
                <FontAwesome5  name="plus" style={{fontSize:18,color:"#FFFFFF",fontWeight:'100'}} />
            </View>

        </Animated.View>
    )
})

const styles = StyleSheet.create({
    headerTitle:{
        position:'absolute',
        top:40,
        /* left:70, */
        color:"#3672CF",
        fontSize:30,
        fontWeight:'bold'
    },
  
    picStyle:{
        width:40,
        height:40,
        borderRadius:22.5
    }
})