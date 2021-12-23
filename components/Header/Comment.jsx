import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { base_url } from '../../api/config'
import { calculateDate } from '../../util/function'
import { Ionicons,Feather } from '../../util/Icon'
import { screenSize } from '../../util/screenSize'

import CachedImage from '../NonIdCachedImage'



const Comment = ({ item , collapse }) => {

    const navigation =useNavigation()

    // console.log(item)
    return (
        <View style={{zIndex:100,width:screenSize.width,height:80,paddingTop:45,flexDirection:'row',paddingLeft:0,marginBottom:10}}>    
            <TouchableWithoutFeedback onPress={()=>{
                console.log('???');
                return collapse?collapse():navigation.goBack()
            }}>
                <Ionicons   name="ios-chevron-back-outline" style={{fontSize:30,lineHeight:40,marginRight:10}} />
            </TouchableWithoutFeedback>
            <CachedImage uri={base_url+item.userInfo[0].icon} style={styles.picStyle} />
       
        <View style={{height:40,paddingLeft:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:14,fontWeight:'bold'}} >{item.userInfo[0].username}</Text>
            <Text style={{paddingLeft:3,fontSize:12}} >{calculateDate(item.postDate)}</Text>
        </View>
        <Feather name="more-horizontal" style={{paddingLeft:screenSize.width/2+15,fontSize:30,lineHeight:40,color:"black"}} />
        
        
        
    </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    headerTitle:{
        /* left:70, */
        color:"#3672CF",
        fontSize:18,
        fontWeight:'bold',
    },
    picStyle:{
        width:40,
        height:40,
        borderRadius:22.5,

    }
})