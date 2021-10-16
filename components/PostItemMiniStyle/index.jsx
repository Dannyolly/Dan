import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { base_url } from '../../api/config'
import { screenSize } from '../../util/screenSize'

import CachedImage from '../NonIdCachedImage'
const index = ({  item , index, navigation  }) => {
    
    //console.log('mini',item)
    return (
        <TouchableHighlight activeOpacity={0.7} underlayColor={"#FFFFFF"} onPress={()=>navigation.navigate('comment',{
            item:item,
            userId:item.userId,
            postId:item.id
        })} >
            <View   style={styles.container}>
                <CachedImage style={styles.image} uri={item.postImage[0]} />
            </View>
        </TouchableHighlight>
    )
}

export default index

const styles = StyleSheet.create({
    container:{
        width:(screenSize.width)/3,
        marginRight:2,
        marginBottom:2
    },
    image:{
        width:(screenSize.width)/3,
        height:(screenSize.width)/3
    }
})
