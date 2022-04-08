import React,{useRef,useEffect} from 'react'
import { View, Text, Modal ,StyleProp , ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RBSheet from "react-native-raw-bottom-sheet";

import { screenSize } from '../../../util/screenSize';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import Content from './Content';
import Header from './Content/Header';

import { TapGestureHandler } from 'react-native-gesture-handler'



/**
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {( style : StyleProp<ViewStyle> , number: number )=> number } props.setIsOpen
 * @param {()=>void} props.addPic 
 * @param {StyleProp<ViewStyle>} [props.style] 
 * @returns {JSX.Element}
 */
export default function index({ isOpen ,setIsOpen ,addPic , style  } ) {

    const refRBSheet = useRef(undefined);
    
    const navigation = useNavigation()
    
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
                addPic(res.uri)
                return;
            case 1:
                res = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [5, 5],
                    quality: 1,
                });
                console.log(res)
                if(res!==undefined && res !==null && res.cancelled!==true){
                    addPic(res.uri)
                }
                refRBSheet.current.close()
                return;
            default:
                break;
        }
    }


    return (
        
        <TapGestureHandler  onActivated={()=>console.log('close')} >
            <RBSheet
            
            ref={refRBSheet}
            closeOnDragDown={true}
            dragFromTopOnly={true}
            closeOnPressMask={true}
            keyboardAvoidingViewEnabled={true}
            onClose={()=>setIsOpen()}
            
            customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                draggableIcon: {
                    backgroundColor: "#333"
                },
                container:{
                    //borderRadius:20,
                    
                    backgroundColor:"#FFFFFF",
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10
                }
            }}
            openDuration={200}
            closeDuration={200}
            
            animationType={'slide'}
            height={540}
            
            >       
                <View onPress={()=>console.log('close')} >
                    <Content  />
                </View>
            </RBSheet>
        </TapGestureHandler>
    )
}
