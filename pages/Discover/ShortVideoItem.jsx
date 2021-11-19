import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { screenSize } from '../../util/screenSize'

import { } from 'react-navigation'

/** @param {{navigateToVideoPage: ()=>void , item : Object , index: number , isScroll :boolean }}  */
const ShortVideoItem = ( { navigateToVideoPage ,item ,index , isScroll} ) => {

    
    

    return (
        <View onTouchEnd={()=>isScroll?'':navigateToVideoPage()} style={{marginRight:10}} >
            <Image  source={require('../../assets/icon.png')} 
            style={{width:70,height:100,borderRadius:20}} 
            />
        </View>
    )
}

export default ShortVideoItem

const styles = StyleSheet.create({})
