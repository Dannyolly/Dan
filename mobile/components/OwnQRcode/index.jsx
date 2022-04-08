import React,{useState,useEffect} from 'react'
import { View, Text ,Image} from 'react-native'

import { userStore,observer } from '../../mobx/store'
import { screenSize } from '../../util/screenSize'
import {
    base_url
}from '../../api/config'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'

import CachedImage from '../../components/NonIdCachedImage'
import item from '../../pages/Friend/FriendList/item'

export default observer(()=>{
    
    const [data, setData] = useState(undefined)

    const getData=async ()=>{
        let json = await AsyncStorage.getItem('userInfo') 

        let res =JSON.parse(json)
        let qrcode =res;
        /* console.log(qrcode.userInfo) */
        setData(()=>qrcode.userInfo)
    }

    useEffect(() => {
        getData()

        

    }, [])

    
    return (
        <View >
            {
                data!==undefined
                &&
                <LinearGradient 
                        locations={[0.1,0.5,1]}
                        colors={['#4399FE','#28C1FD','#21CFFF']}
                        style={{width:screenSize.width,height:screenSize.height,alignItems:"center",paddingTop:200}}
                        >
                <View style={{padding:20,width:screenSize.width-40,height:400,borderRadius:10,shadowOpacity:0.1,
                    shadowOffset:{
                        width:5,
                        height:5,
                    },
                    shadowRadius:10,backgroundColor:"#FFFFFF"}}> 
        
                        <View style={{flexDirection:"row",marginBottom:10}}>
                            
                            <CachedImage
                            uri={base_url+data.icon}
                            style={{width:70,height:70,borderRadius:35,marginRight:20}}
                            />
                            

                            <Text style={{fontSize:16,lineHeight:50}}>{data.username}</Text>
                        </View>
        
                        <View style={{width:screenSize.width-80,height:270}}>
                            
                             <CachedImage
                            uri={base_url+data.qrcode}
                            id={data.id+12345}
                            style={{flex:1}}
                            />
                        </View>
                    </View>
                </LinearGradient>
            }
        </View>
        
    )

})
