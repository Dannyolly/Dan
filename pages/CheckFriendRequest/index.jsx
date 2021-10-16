import React,{useEffect,useState} from 'react'
import { View, Text ,StyleSheet ,Image} from 'react-native'
import { FlatList, ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { screenSize } from '../../util/screenSize'

import{
    getAllFriendRequest,
    confirmRequest,
    readMessage
}from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { base_url } from '../../api/config'
import { userStore,observer } from '../../mobx/store'

import CachedImage from '../../components/CachedImage'

export default observer(()=> {
    

    const navigation =useNavigation()

    const [data, setData] = useState(undefined)


    const getData=async ()=>{
        let jsonRes =await AsyncStorage.getItem('userInfo')
        let res =JSON.parse(jsonRes)

        //console.log(res)
        getAllFriendRequest(res.userInfo.id).then(res=>{
            setData(()=>res.data)
        })
    }

    const confirmFriendRequest=(item)=>{
        confirmRequest(item.requestId,item.receiverId,item.senderId).then(async (res)=>{
            let jsonRes =await AsyncStorage.getItem('userInfo')
            let result =JSON.parse(jsonRes)
            getAllFriendRequest(result.userInfo.id).then(res=>{
                setData(()=>res.data)
            })
        })
    }


    const readTheMessage=()=>{
        for (const index in userStore.friendRequestInfo) {
            readMessage(userStore.friendRequestInfo[index].requestId).then(res=>{
                
            })
        }
    }

    useEffect(() => {
        userStore.setFriendRequestDidNotRead(0)
        readTheMessage()
    }, [])


    const FriendItem=( { item } )=>{
        return(
            <TouchableHighlight 
            style={{paddingLeft:20,marginBottom:10}}
            activeOpacity={1} underlayColor={"#F7F5F8"} 
            onPress={() =>navigation.navigate('friendDelta',{
                item:item
            })}
            >
                <View >
                    <View style={{width:screenSize.width-40,height:80,paddingLeft:75}}> 
                        
                        <CachedImage
                        style={{width:70,height:70,borderRadius:35,position:'absolute',left:0}}
                        uri={base_url+item.icon}
                        id={item.senderId}
                        />
                        <View style={{height:80,width:screenSize.width-40-80,padding:10}}>
                            <Text style={{marginBottom:10}}>{item.username}</Text>
                            <Text style={{color:"#CDCDCD"}}>{item.requestMessage}</Text>
                        </View>
                        
                        <View style={{position:'absolute',right:10,height:80,alignItems:"center",paddingTop:15}}>
                            {
                                item.status===0?
                                <TouchableWithoutFeedback onPress={()=>confirmFriendRequest(item)}>
                                    <View style={{justifyContent:"center",alignItems:"center",width:60,height:30,backgroundColor:'#28C1FD',borderRadius:25}}>
                                        <Text style={{color:"#FFFFFF",fontSize:12}}>確認</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <View style={{justifyContent:"center",alignItems:"center",width:60,height:30,backgroundColor:'#CDCDCD',borderRadius:25}}>
                                    <Text style={{color:"#FFFFFF",fontSize:12}}>已確認</Text>
                                </View>
                            }
                        </View>
                    </View>     
                </View>
            </TouchableHighlight>

            


        )
    }

    useEffect(() => {
        getData()
    }, [])
    
    
    return (
        <View style={{backgroundColor:"#FFFFFF",width:screenSize.width,height:screenSize.height}}>
            <ScrollView  style={{flex:1}}>
                <Text style={{padding:20,paddingBottom:0,color:"#C3C3C3",marginBottom:30}}>新的通知</Text>
                {
                    
                    data!==undefined
                    &&
                    data.map((item,index)=>{
                        return(
                            <FriendItem  item={item}  key={index} />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
})

const styles = StyleSheet.create({
    
})
