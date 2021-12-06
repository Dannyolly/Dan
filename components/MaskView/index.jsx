import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { screenSize } from '../../util/screenSize'

const index = ( {visible, opacity , color ,zIndex} ) => {



    return (
        <Animated.View 
        style={{
        overflow:visible?'visible':'hidden',
        zIndex:zIndex?zIndex:0,
        width:screenSize.width,
        height:screenSize.height,
        opacity:opacity,
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:color!==undefined?color:"#0E0E0E"
        }}>
            
        </Animated.View>
    )
}

export default index

const styles = StyleSheet.create({})
