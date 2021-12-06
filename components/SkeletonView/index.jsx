import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View ,Animated, Easing, StyleProp , ViewStyle} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { screenSize } from '../../util/screenSize'

const AnimatedComponent = Animated.createAnimatedComponent(LinearGradient)

/**
 * 
 * @param {{
 *  style : StyleProp<ViewStyle>
 *  
 * }}
 */
const index = ({ style , duration,colors ,backgroundColor }) => {

    const animatedValue =useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        Animated.loop(
            Animated.timing(animatedValue,{
                toValue:1,
                duration: duration ||1500,
                easing:Easing.linear.inOut,
                useNativeDriver:true,
            })
        ).start()
    })


    const translateX = animatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[-screenSize.width,screenSize.width]

    })

    return (
        <View style={[styles.container,style,{backgroundColor:backgroundColor?backgroundColor:"#CDCDCD"}]}>
            <AnimatedComponent
            colors={ colors ||["#CDCDCD","#a0a0a0","#a0a0a0","#CDCDCD"]}
            start={{x:0,y:0}}
            end={{x:1,y:0}}
            style={{...StyleSheet.absoluteFill,transform:[{translateX:translateX}]}}

            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container:{
        
        justifyContent:'center',
        alignItems:'center',
        opacity:0.7,
        overflow:'hidden',
    }
})
