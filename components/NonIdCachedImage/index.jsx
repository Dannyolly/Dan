import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {Image,CacheManager} from "react-native-expo-image-cache";


const index = ({ previewUri  , uri , style  } ) => {
    return (
        <Image  
        /* tint={'dark'} */
        {...{ uri:uri}} 
        style={[style,{zIndex:100}]}   
        />
    )
}

export default index

const styles = StyleSheet.create({})
