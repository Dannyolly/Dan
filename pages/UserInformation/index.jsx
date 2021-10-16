import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { userStore , observer } from '../../mobx/store'
import Individual from '../../pages/Individual'

import Delta from '../AddUser/FriendDelta'

export default observer(()=>{

    const route={
        params:{
            item:userStore.userInfo.userInfo,
            isFriend:true, // 自己或好友統一選true
            self:true
        }   
    }


   
    const navigation =  useNavigation()

    return (
        <View style={{flex:1}}>
            <Delta navigation={navigation} route={route}  />
            {/* <Individual navigation={navigation} /> */}
        </View>
    )
})
