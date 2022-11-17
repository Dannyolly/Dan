import React,{useRef,useEffect} from 'react'
import { View, Text, Modal } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RBSheet from "react-native-raw-bottom-sheet";

import { screenSize } from '../../../util/screenSize';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { defaultShowMessage, uuid } from '../../../util/function';
export default function index({ isOpen ,setIsOpen ,imageUrl, savedImage } ) {

    const refRBSheet = useRef();

    const navigation = useNavigation()

    
    //console.log(isOpen,'?')
    if(isOpen===true && isOpen!==undefined){
        refRBSheet.current.open()
    }

    const action = async (which)=>{

        let myUuid  = uuid()

        switch (which) {
            case 0:
                
                let data = (await FileSystem.downloadAsync(imageUrl,`${FileSystem.documentDirectory}${myUuid}.png`,{
                    cache:true
                }))
                console.log(data.uri)
                MediaLibrary.saveToLibraryAsync(data.uri).then(res=>{
                    refRBSheet.current.close()
                    savedImage()
                    //refRBSheet.current.close()
                    
                }).catch(err=>{
                    console.log("can't")
                })
                
            return;

            default:
                break;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={()=>console.log('close')}>
            <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            
            onClose={()=>setIsOpen()}
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
            height={160}
        >       
                <View onTouchStart={()=>action(0)}
                 style={{width:screenSize.width,justifyContent:"center",alignContent:'center',
                 backgroundColor:"#FFFFFF",height:80,position:'absolute',bottom:80}}>
                    <Text style={{textAlign:"center",fontSize:16}}>保存至手機</Text>
                </View>
            
                <View onTouchStart={()=>refRBSheet.current.close()}
                 style={{width:screenSize.width,justifyContent:"center",alignContent:'center',
                 backgroundColor:"#FFFFFF",height:80,position:'absolute',bottom:0}}>
                    <Text style={{textAlign:"center",fontSize:16}}>取消</Text>
                </View>
            </RBSheet>
        </TouchableWithoutFeedback>
    )
}
