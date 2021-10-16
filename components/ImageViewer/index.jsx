import React,{useEffect, useState,useRef,useMemo,useCallback} from 'react'
import {DeviceEventEmitter, 
    View, 
    Text 
    ,Modal,
    Image, 
    TouchableWithoutFeedback,
     CameraRoll,
     StyleSheet
} from 'react-native'


import ImageViewer from 'react-native-image-zoom-viewer';
import { screenSize } from '../../util/screenSize';

import { AntDesign ,Feather } from '../../util/Icon';


import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

// import ImagePicker from 'react-native-image-crop-picker';

import * as ImagePicker from 'expo-image-picker';

import {
    getUserIcon,
    searchUser,
    uploadIcon 
} from '../../api/api'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStore } from '../../mobx/store'
import { observer } from 'mobx-react'



/* import {Image} from "react-native-expo-image-cache"; */

import CachedImage from '../CachedImage'
import NonIdCachedImage from '../NonIdCachedImage'


import { base_url } from '../../api/config';
import { getUserMainInfo } from '../../util/function';


export default observer( ({ urls , style ,title  ,setIsUpload ,id,item})=>{


    const refRBSheet = useRef();

    const [isClick, setIsClick] = useState(false)


    let images = [{
        // Simplest usage.
        url: item!==undefined?base_url+item.icon:'',
        /* width: 200,
        height: 200, */
        // Optional, if you know the image size, you can set the optimization performance
    
        // You can pass props to <Image />.
        props: {
            // headers: ...
            source: {uri:item!==undefined?base_url+item.icon:''},
            url:'',
            index:-1
        }

    }
    ]

    const setArrayIndex=()=>{
        for (const index in images) {
            images[index].props.index=index
            images[index].props.url = base_url+item.icon
        }

        
        images[0].url=base_url+item.icon
        

        /* console.log(images) */

    }


    const header=()=>{
        return(
            <TouchableWithoutFeedback  onPress={()=>console.log('test')} style={{flex:1}}>
            <View style={{width:screenSize.width,height:60,position:'absolute',top:60}}>
                <AntDesign
                name="left"
                size={20}
                style={{color:"#FFFFFF",position:'absolute',left:20}}
                />            
                <Text style={{textAlign:'center',color:"#FFFFFF",fontSize:16}}>
                    個人照片
                </Text>
                <View style={{position:'absolute',right:-10}}>
                    <TouchableOpacity
                        style={{width:50,height:30,position:'relative'}} 
                        onPressIn={()=>console.log('hi')}
                        >
                        <Feather
                        name="more-horizontal"
                        size={20}
                        style={{color:"#FFFFFF"}}
                        
                        />
                    </TouchableOpacity>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        )
    }

    useEffect(() => {
        if(item!==undefined){
            setArrayIndex()
        }
    }, [item])

    

    const longPress=(image)=>{
        /* 保存功能... */
        // console.log(image)
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
                if(res!== undefined){
                    uploadIcon(res.uri, userStore.userInfo.userInfo.userInfo.id)
                    .then(res=>{
                        /* console.log(res.data.msg) */
                    })
                }
                return;
            case 1:
                res = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [5, 5],
                    quality: 1,
                });
                
                if(res!== undefined){
                    // 
                    
                    const id =userStore.userInfo.userInfo.id
                    console.log(res.uri,id)

                    

                    uploadIcon(res.uri,id)
                    .then(async res=>{
                        console.log(res.data.msg)
                        if(res.data.msg==='上傳成功'){

                            refRBSheet.current.close()
                            setIsClick(!isClick)
                            
                            let { data } =  await searchUser(`id=${id}`)
                            let userInfo = {
                                userInfo:data[0]
                            }

                            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo)).then(res1=>{
                                userStore.setUserInfo({
                                    userInfo:data[0]
                                })
                                DeviceEventEmitter.emit('updateIcon')
                            })
                            
                            


                                
                        }
                    }).catch(err=>{
                        console.log('this way is wrong')
                    })
                }
                return;
            default:
                break;
        }
    }

    /* console.log(id) */
    if(item!==undefined){
        console.log(base_url+item.icon)
    }
    console.log('re-fresh');
    return (
        <>
        {
            isClick!==undefined  && item!==undefined
            && 
                <View>
                    <TouchableHighlight 
                    activeOpacity={0.8}
                    style={{borderRadius:50,width:style.width}}
                    underlayColor="#FFFFFF"
                    onPress={() => {
                        setIsClick(true)
                    }}
                    >
                    {/* <CachedImage 
                    style={{...style,borderRadius:50} }
                    id={item.id}
                    uri={item.icon}
                    /> */}
                    <NonIdCachedImage
                    uri={base_url+item.icon}
                    style={{...style,borderRadius:50}}
                    />
                    </TouchableHighlight>
                    {
                        isClick===true
                        &&
                        <Modal visible={true} transparent={true} style={{paddingTop:0,justifyContent:'center',alignItems:'center'}} >
                            <ImageViewer 
                             renderHeader={header}
                             onLongPress={longPress}  
                             style={{justifyContent:'center',alignItems:'center'}}
                             saveToLocalByLongPress={false} 
                             imageUrls={images} 
                             onClick={()=>setIsClick(!isClick)}  
                             renderImage={(props)=>{
                                return(        
                                    
                                    <View style={{paddingTop:0,justifyContent:'center',alignItems:'center'}}>
                                        <NonIdCachedImage
                                        uri={props.source.uri}
                                        style={{width:screenSize.width,height:400}}
                                        />
                                    </View>
                                 )
                             }}
                             />
                            
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
                                openDuration={300}
                                closeDuration={300}
                                /* animationType={'none'} */
                                height={280}
                            >
                                <View onTouchStart={()=>action(0)} style={{width:screenSize.width,justifyContent:"center",alignContent:'center',backgroundColor:"#FFFFFF",height:60,marginBottom:10,position:'absolute',bottom:220}}>
                                    <Text style={{textAlign:"center",fontSize:16}}>拍照</Text>
                                </View>
                                <View onTouchStart={()=>action(1)} style={{width:screenSize.width,justifyContent:"center",alignContent:'center',backgroundColor:"#FFFFFF",height:60,marginBottom:10,position:'absolute',bottom:160}}>
                                    <Text style={{textAlign:"center",fontSize:16}}>從相冊選取圖片</Text>
                                </View>
                                <View onTouchStart={()=>action(2)} style={{width:screenSize.width,justifyContent:"center",alignContent:'center',backgroundColor:"#FFFFFF",height:60,marginBottom:10,position:'absolute',bottom:100}}>
                                    <Text style={{textAlign:"center",fontSize:16}}>保存圖片</Text>
                                </View>
                                <View onTouchStart={()=>refRBSheet.current.close()} style={{width:screenSize.width,justifyContent:"center",alignContent:'center',backgroundColor:"#FFFFFF",height:100,position:'absolute',bottom:0}}>
                                    <Text style={{textAlign:"center",fontSize:16}}>取消</Text>
                                </View>
                            </RBSheet>
                        </Modal>
                        
                    }
                </View>
        }
        </>
    )
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
  