import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {Image,CacheManager} from "react-native-expo-image-cache";


const index = ({ previewUri  , uri , style  } ) => {
    return (
        <Image  
        tint={'dark'} 
        transitionDuration={300} 
        {...{ uri:uri}} 
        {...(previewUri!==undefined?previewUri:{})}
        style={style}   
        />
    )
}

export default index

const styles = StyleSheet.create({})
