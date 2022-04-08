import React,{useEffect,useState,useCallback} from 'react'
import { View, Text ,StyleSheet ,Image, DeviceEventEmitter} from 'react-native'

import { userStore,observer } from '../../../mobx/store'
import { getAllFriend } from '../../../api/api'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Item from './item'
import { base_url } from '../../../api/config'
import FriendHeader from '../../../components/Header/FriendHeader'
import {friendStore } from '../../../mobx/friend'
import DownScrollLoading from '../../../components/DownScrollLoading'
export default observer(({ navigation })=>{

    
    const [list, setList] = useState(undefined)
    
    
    async function getData(){
        let jsonUserInfo  = await AsyncStorage.getItem('userInfo');
        let userInfo = JSON.parse(jsonUserInfo)
        getAllFriend(userInfo.userInfo.id).then(res=>{
            //console.log(res.data)
            friendStore.setFriendList(res.data)
            setList(()=>res.data)
        })
        
    }

    useEffect(() => {
        
        getData()

        DeviceEventEmitter.addListener('refreshFriendList',(data)=>{
            getData()
        })

    }, [])

    //console.log('???')
    return (
        list!==undefined
        &&
        <FlatList
        data={list}
        /* refreshControl={()=><DownScrollLoading />} */
        renderItem={({ item })=><Item  item={item} />}
        keyExtractor={item=>item.id.toString()}
        />
    )
})

const styles = StyleSheet.create({
    
})