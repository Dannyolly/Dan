import React,{useEffect,useState,useCallback} from 'react'
import { View, Text ,StyleSheet ,FlatList ,Image} from 'react-native'

import { userStore,observer } from '../../mobx/store'
import { getAllFriend } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Item from './item'
import { base_url } from '../../api/config'

export default observer(({ navigation })=>{

    
    const [list, setList] = useState(undefined)
    
    
    async function getData(){
        let jsonUserInfo  = await AsyncStorage.getItem('userInfo');
        let userInfo = JSON.parse(jsonUserInfo)
        getAllFriend(userInfo.userInfo.id).then(res=>{
            setList(()=>res.data)
        })
        
    }

    useEffect(() => {
        
        getData()

    }, [])

    
    return (
        list!==undefined
        &&
        <FlatList
        data={list}
        renderItem={({ item })=><Item  item={item} />}
        keyExtractor={item=>item.id.toString()}
        />
    )
})

const styles = StyleSheet.create({
    
})