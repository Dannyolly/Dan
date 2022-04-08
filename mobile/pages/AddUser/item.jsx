import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text ,Image} from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { base_url } from '../../api/config'
import { screenSize } from '../../util/screenSize'
import { friendStore } from '../../mobx/friend'
export default function item({ item ,navigation , text }) {


    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor={"#F7F5F8"} 
        onPress={() =>{
            let isFriend = false
            for (const index in friendStore.friendList) {
                let res = friendStore.friendList[index].username.toLowerCase().search(`${text.toLowerCase()}`)
                if(res>=0){
                    isFriend = true
                    break;
                }
            }

            navigation.navigate('friendDelta',{
                item:item,
                isFriend:isFriend,
                self:false
            })
        }}
        
        >
            <View style={{paddingLeft:20,paddingTop:10}}>
                <View style={{width:screenSize.width-40,height:40,marginBottom:20}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                    source={{
                        uri:base_url+item.icon
                    }}
                    defaultSource={require('../../assets/appicon.png')}
                    style={{width:40,height:40,borderRadius:20,marginRight:10}}
                    />
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