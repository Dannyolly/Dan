import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text ,Image ,DeviceEventEmitter} from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { base_url } from '../../../api/config'
import { screenSize } from '../../../util/screenSize'

import CachedImage from '../../../components/NonIdCachedImage'
import { searchUser } from '../../../api/api'
import { defaultShowMessage } from '../../../util/function'


export default function item({ item , index, onTap }) {

    const [online, setOnline] = useState(false)

    const navigation = useNavigation()


    const checkOutLoginIn=()=>{
        searchUser(`id=${item.id}`).then(res=>{
            if(res.data[0].online===1){
                setOnline(()=>true)
            }else{
                setOnline(()=>false)
            }
        })
    }
    
    useEffect(() => {

        checkOutLoginIn()

        const a =  DeviceEventEmitter.addListener('checkOutOnlineState',()=>{
            checkOutLoginIn()
        })

        return()=>{
            a.remove()
        }
    },[])

    useEffect(() => {
       
    }, [])

    //defaultShowMessage(JSON.stringify(item))

    //console.log('friend list',item)
    return (
        <TouchableHighlight 
        activeOpacity={0.6} 
        underlayColor={"#F7F5F8"} 
        onPress={
            () =>{
                if(onTap!==undefined){
                    onTap()
                }
                navigation.navigate('friendDelta',{
                item:item,
                isFriend:true,
                self:false,
            }
        )}}
        /* onPress={()=>navigation.navigate('qrcode')} */
        >
            <View style={{paddingLeft:40,paddingTop:10}}>
                <View style={{width:screenSize.width-60,height:40,marginBottom:20}}>
                <View style={{flexDirection:'row'}}>
                  
                    <CachedImage
                    uri={base_url + item.icon}
                    style={{width:40,height:40,borderRadius:30,marginRight:10}}
                    />

                    {
                        online===true?
                        <View style={{width:10,height:10,borderRadius:20,backgroundColor:"#28EF93",position:'absolute',left:30,bottom:0}}/>
                        :
                        <View style={{width:10,height:10,borderRadius:20,backgroundColor:"#CDCDCD",position:'absolute',left:30,bottom:0}}/>
                    }

                    

                    <Text style={{lineHeight:40,fontSize:17,fontWeight:'500'}}>{item.username}</Text>
                    <View style={{
                        backgroundColor:"#F7F5F8",
                        width:screenSize.width-90,
                        height:2,
                        position:'absolute',
                        bottom:-20,
                        right:0,
                    }} 
                    
                    /> 
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}
