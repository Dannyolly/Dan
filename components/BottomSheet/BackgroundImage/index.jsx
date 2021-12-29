import React,{useRef,useEffect} from 'react'
import { View, Text, Modal } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RBSheet from "react-native-raw-bottom-sheet";

import { screenSize } from '../../../util/screenSize';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { uploadBackgroundImage } from '../../../api/api';
import { showMessage } from 'react-native-flash-message';
import { userStore } from '../../../mobx/store';
import { defaultShowMessage } from '../../../util/function';
export default function index({ isOpen ,setIsOpen ,setBackgroundImage } ) {

    const refRBSheet = useRef();

    const navigation = useNavigation()

    
    //console.log(isOpen,'?')
    if(isOpen===true && isOpen!==undefined){
        refRBSheet.current.open()
    }

    const action = async (which)=>{
        let res;
        switch (which) {
            case 0:
                const status =await ImagePicker.requestCameraPermissionsAsync()
                res = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                console.log(res)
                return;
            case 1:
                res = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [5, 5],
                    quality: 1,
                });
                
                //  用戶取消
                if(res.cancelled===true) {
                    refRBSheet.current.close()
                    return 
                }
                
                
                
                // 先存去本地.. 數據庫的是給其它用戶看
                await AsyncStorage.setItem("backgroundImage",res.uri)
                
                if(res!== undefined){
                    uploadBackgroundImage(res.uri, userStore.userInfo.userInfo.id)
                    .then(res1=>{
                        //console.log(res.data)
                        setBackgroundImage(res.uri)
                        if(res1.data.msg==='上傳成功'){
                            refRBSheet.current.close()
                            defaultShowMessage({
                                message:`${res1.data.msg}`
                            })
                            
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
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
            height={240}
        >       
                <View onTouchStart={()=>action(0)}
                 style={{width:screenSize.width,justifyContent:"center",alignContent:'center',
                 backgroundColor:"#FFFFFF",height:80,position:'absolute',bottom:160}}>
                    <Text style={{textAlign:"center",fontSize:16}}>相機</Text>
                </View>
                <View onTouchStart={()=>action(1)}
                 style={{width:screenSize.width,justifyContent:"center",alignContent:'center',
                 backgroundColor:"#FFFFFF",height:80,position:'absolute',bottom:80}}>
                    <Text style={{textAlign:"center",fontSize:16}}>從相冊中選取</Text>
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
