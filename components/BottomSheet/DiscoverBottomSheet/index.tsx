import React,{useRef,useEffect, ReactElement} from 'react'
import { View, Text, Modal } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RBSheet from "react-native-raw-bottom-sheet";

import { screenSize } from '../../../util/screenSize';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult} from 'expo-image-picker'
import { uploadBackgroundImage } from '../../../api/api';
import { showMessage } from 'react-native-flash-message';
import { userStore } from '../../../mobx/store';
import { defaultShowMessage } from '../../../util/function';
import { Feather, Ionicons, MaterialIcons, Octicons } from '../../../util/Icon';

interface DiscoverBottomSheetProps {

    isOpen? : boolean , 

    setIsOpen? : ()=>void,

    setCallBack? : (uri :string)=>void



}




export default function index({ isOpen ,setIsOpen ,setCallBack } : DiscoverBottomSheetProps ) : ReactElement {

    const refRBSheet = useRef<RBSheet>();

    const navigation = useNavigation()

    
    //console.log(isOpen,'?')
    if(isOpen===true && isOpen!==undefined){
        refRBSheet.current.open()
    }

    const action = async (which)=>{
        
        
    }

    return (
        <TouchableWithoutFeedback >
            <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            
            onClose={()=>setIsOpen()}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                },
                draggableIcon: {
                    backgroundColor: "#CDCDCD"
                },
                container:{
                    //borderRadius:20,
                    backgroundColor:"#fFfFfF",
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    paddingTop:0
                }
            }}
            openDuration={200}
            closeDuration={200}
            animationType={'fade'}
            height={360}
        >       
            <View style={{flex:1,padding:0,paddingTop:0,alignItems:'center'}}>
                    <Text style={{fontSize:16,color:"#CDCDCD"}} >相關操作</Text>
                    <View onTouchStart={()=>action(0)}
                        style={{
                            width:screenSize.width,
                            alignContent:'center',
                            backgroundColor:"#FFFFFF",
                            height:70,flexDirection:'row',
                            padding:20,
                            borderBottomWidth:1.5,
                            borderBottomColor:"#F4F4F4"
                        }}
                        >
                        <Ionicons name='trash-bin-outline' size={20} style={{marginRight:20,lineHeight:40}} />
                        <Text style={{textAlign:"center",fontSize:16,lineHeight:38}}>隱藏此文章</Text>
                    </View>
                    <View onTouchStart={()=>action(1)}
                        style={{
                            width:screenSize.width,
                            alignContent:'center',
                            backgroundColor:"#FFFFFF",
                            height:70,flexDirection:'row',
                            padding:20,
                            borderBottomWidth:1.5,
                            borderBottomColor:"#F4F4F4"}}
                        >
                        <Feather name='share' size={20} style={{marginRight:20,lineHeight:40}} />
                        <Text style={{textAlign:"center",fontSize:16,lineHeight:38}}>分享</Text>
                    </View>
                    <View onTouchStart={()=>refRBSheet.current.close()}
                        style={{
                            width:screenSize.width,
                            alignContent:'center',
                            backgroundColor:"#FFFFFF",
                            height:70,flexDirection:'row',
                            padding:20,
                            
                            borderBottomWidth:1.5,
                            borderBottomColor:"#F4F4F4"}}
                        >
                        <Octicons name='report' size={20} style={{marginRight:20,lineHeight:40}} />
                        <Text style={{textAlign:"center",fontSize:16,lineHeight:38}}>舉報</Text>
                    </View>
                    <View onTouchStart={()=>refRBSheet.current.close()}
                        style={{
                            width:screenSize.width,
                            alignContent:'center',
                            backgroundColor:"#FFFFFF",
                            height:70,flexDirection:'row',
                            padding:20,
                            
                            borderBottomWidth:1.5,
                            borderBottomColor:"#F4F4F4"}}
                        >
                        <MaterialIcons name='cancel-presentation' size={20} style={{marginRight:20,lineHeight:40}} />
                        <Text style={{textAlign:"center",fontSize:16,lineHeight:38}}>取消</Text>
                    </View>
                    
                    
            </View>
            </RBSheet>
        </TouchableWithoutFeedback>
    )
}
