import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View ,Animated } from 'react-native'
import { AntDesign } from '../../util/Icon'

import Font from './Font'

const index = ({ move }  ) => {
   
    

    const FontAnimated = Animated.createAnimatedComponent(Font);
    
    const scale = useRef(new Animated.Value(1)).current

    const opacity = useRef(new Animated.Value(0)).current

    const animate =()=>{

        console.log('action!!!')

        /* Animated.timing(opacity,{
            toValue:1,
            duration:300,
            useNativeDriver:true,
            
            
        }).start() */


        Animated.spring(scale,{
            toValue:1.25,
            speed:4,
            /* friction:15, */
            useNativeDriver:true,
            
            
        }).start()

        setTimeout(()=>{
            Animated.spring(scale,{
                toValue:1,
                /* friction:15, */
                speed:100,
                useNativeDriver:true,
                
                
            }).start()
        },200 )


        setTimeout(()=>{
            Animated.timing(scale,{
                toValue:0,
                duration:200,
                useNativeDriver:true,
                
                
            }).start()
        },500 )
        

    }
    
    
    animate()
    
   


    return (
        <Animated.View  style={{transform:[{scale:scale}]} }>
            <FontAnimated 
            
            
            />
        </Animated.View>
    )
}

export default index

const styles = StyleSheet.create({})
