import React, { Component, useEffect,useCallback } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import { screenSize } from '../../util/screenSize'
import { AntDesign ,SimpleLineIcons} from '../../util/Icon'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import FriendList from '../../components/FriendList'

import { userStore,observer } from '../../mobx/store'
import { useFocusEffect } from '@react-navigation/native'
import { DeviceEventEmitter } from 'react-native'
import { messageResponser, selectionResponser } from '../../util/haptic'

export default observer(()=>{


    useFocusEffect(
        useCallback(() => {
            // 刷新好友是否上線
        selectionResponser()
        DeviceEventEmitter.emit('checkOutOnlineState')
          
          
        }, [])
      );
    

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.onlineContainer}>
                    <View style={{paddingLeft:20,alignItems:'center',flexDirection:'row',width:screenSize.width*0.85,height:35,borderRadius:50,backgroundColor:"#F4F4F4",marginBottom:10}}>
                        <AntDesign  name="search1" size={18} style={{color:"#CDCDCD"}} />
                        <Text style={{color:"#CDCDCD"}}>Search By name or nickName</Text>
                    </View>
                </View>

                <FriendList />

            </ScrollView>
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFFFFF",
        height:screenSize.height,
        paddingTop:10
    },
    search:{
        width:screenSize.width-40,
        height:30,
        borderRadius:20,
        backgroundColor:"#F7F5F8",
        flexDirection:'row',
        justifyContent:'center'
    },
    onlineContainer:{
        width:screenSize.width,
        height:40,
        alignItems:"center"
    },
    
})