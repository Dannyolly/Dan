import React,{useRef} from 'react'
import { View, Text, Modal } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RBSheet from "react-native-raw-bottom-sheet";

import { screenSize } from '../../../util/screenSize';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';
import { messageResponser } from '../../../util/haptic';
import { userStore } from '../../../mobx/store';
export default function index({ isOpen ,/* navigation  */ } ) {

    const refRBSheet = useRef();

    const navigation = useNavigation()

    
    if(isOpen===true && isOpen!==undefined){
        refRBSheet.current.open()
    }

    return (
        <TouchableWithoutFeedback onPress={()=>console.log('close')}>
            <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                },
                draggableIcon: {
                    backgroundColor: "#f4f4f4"
                },
                container:{
                    //borderRadius:20,
                    backgroundColor:"#f4f4f4",
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10
                }
            }}
            openDuration={200}
            closeDuration={200}
            animationType={'fade'}
            height={180}
        >
                <View onTouchStart={()=>{
                    refRBSheet.current.close()
                    AsyncStorage.removeItem('userInfo')
                    userStore.setIsSignIn(false)
                    navigation.replace("login")
                    
                    messageResponser()
                    
                }} style={{width:screenSize.width,justifyContent:"center",alignContent:'center',backgroundColor:"#FFFFFF",height:80,marginBottom:5,position:'absolute',bottom:100}}>
                    <Text style={{textAlign:"center",fontSize:16}}>登出</Text>
                </View>
                
                <View onTouchStart={()=>refRBSheet.current.close()}
                 style={{width:screenSize.width,justifyContent:"center",alignContent:'center',
                 backgroundColor:"#FFFFFF",height:100,position:'absolute',bottom:0}}>
                    <Text style={{textAlign:"center",fontSize:16}}>取消</Text>
                </View>
            </RBSheet>
        </TouchableWithoutFeedback>
    )
}
