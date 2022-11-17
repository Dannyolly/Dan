import React from 'react'
import { Animated, StyleSheet, Text, View , StyleProp, ViewStyle} from 'react-native'
import { screenSize } from '../../util/screenSize'
/**
 * 
 * @param {{
 *      style? :StyleProp<ViewStyle> ,
 *      visible? : boolean,
 *      opacity? : number ,
 *      color? : string ,
 *      zIndex? : number , 
 *      height? : number
 * 
 * }} 
 * @returns 
 */
const index = ( {style , visible, opacity , color ,zIndex , height} ) => {



    return (
        <Animated.View 
        style={style?style:{
            overflow:visible?'visible':'hidden',
            zIndex:zIndex?zIndex:0,
            width:screenSize.width,
            height:height? height: screenSize.height,
            opacity:opacity,
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            backgroundColor:color!==undefined?color:"#0E0E0E"
        }}
        >
            
        </Animated.View>
    )
}

export default index

const styles = StyleSheet.create({
    

})
