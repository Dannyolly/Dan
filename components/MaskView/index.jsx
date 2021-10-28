import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { screenSize } from '../../util/screenSize'

const index = ( { opacity } ) => {



    return (
        <Animated.View 
        style={{
        width:screenSize.width,
        height:screenSize.height,
        opacity:opacity,
        position:'absolute',
        backgroundColor:"#0E0E0E"
        }}>
            
        </Animated.View>
    )
}

export default index

const styles = StyleSheet.create({})
