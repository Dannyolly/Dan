import React ,{useState,useEffect} from 'react'
import {DeviceEventEmitter, View, Text ,StyleSheet, Image } from 'react-native'
import { screenSize } from '../../util/screenSize'
import { LinearGradient } from 'expo-linear-gradient';
import ImageViewer from '../../components/ImageViewer'
import { AntDesign } from '../../util/Icon';

import{
    getUserIcon
} from '../../api/api'

import{
    base_url
} from '../../api/config'

import { userStore } from '../../mobx/store'
import { observer } from 'mobx-react'


import AsyncStorage from '@react-native-async-storage/async-storage';

import CachedImage from '../../components/CachedImage'
import { showMessage } from 'react-native-flash-message';


export default observer(( {  } ) =>{

    const [icon, setIcon] = useState()

    const [id,setId] =useState()

    const [userInfo ,setUserInfo ]=useState(undefined)


    const getIcon=async ()=>{
     

        let json = await AsyncStorage.getItem(`userInfo`)
        let res =JSON.parse(json)
        /* console.log('res',res.userInfo) */
        /* showMessage({
            message:JSON.stringify(res.userInfo)
        }) */
        setId(()=>res.userInfo.id)
        setUserInfo(()=>({...res.userInfo}))
    }
    
    useEffect(() => {

        
        getIcon()
        let a=DeviceEventEmitter.addListener('updateIcon',()=>{
            getIcon()
            DeviceEventEmitter.emit('loadingIcon')
        })

        return()=>{
            a.remove()
        }


    }, [])




    return (
        <View 
        style={{
        alignItems:'center',justifyContent:'center',
        height:200,paddingTop:10,paddingLeft:5,paddingRight:5,marginBottom:10}
        }>
                <ImageViewer 
                /* urls={[icon]} */
                id={id}
                item={userInfo}
                style={{width:100,height:100,marginRight:8,borderRadius:50}} 
                />
                <Text style={{paddingTop:5,fontSize:26,fontWeight:'bold',color:"#ffffff"}}>
                    {userStore.userInfo.userInfo.username}
                </Text>
        </View>
    )
})

const myheight = 140

const styles = StyleSheet.create({
    container:{
        width:screenSize.width-10,
        height:90,
        borderRadius:10,
        backgroundColor:"#FFFFFF",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        
    },
})
