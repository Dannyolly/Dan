import React from 'react'
import { StyleSheet, Text, View , StyleProp, ViewStyle } from 'react-native'

import {Image,CacheManager} from "react-native-expo-image-cache";

/** @param {{ previewUri?: string , uri : string , style : StyleProp<ViewStyle>  }} */
const index = ({ previewUri  , uri , style  } ) => {
    return (
        <Image  
        /* tint={'dark'} */
        {...{ uri:uri}} 
        style={[style.flex!==undefined?{flex:1}:style,{zIndex:100}]}   
        />
    )
}

export default index

const styles = StyleSheet.create({})
