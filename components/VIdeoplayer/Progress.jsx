import React, { useRef,useEffect } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import * as Progress from 'react-native-progress';
import { screenSize } from '../../util/screenSize';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesome } from '../../util/Icon';
const index = ({ progress ,stop , play , setVideoPositionMillis , duration }) => {
    /* console.log(Number(progress).toString(), Number(progress).toString()!=='NaN') */
    const currentProgressButtonOffset = useRef(new Animated.Value(0)).current

    const progressWidth = screenSize.width-20


    const calculateProgressCurrentXoffset = ()=>{
        if(Number.isNaN(progress)) return
        
        currentProgressButtonOffset.setValue(progress*progressWidth)
    }

    const handlePan = ( e )=>{
        //console.log(e.nativeEvent.x,progressWidth)
        setVideoPositionMillis(duration * e.nativeEvent.x/ progressWidth )
        
        currentProgressButtonOffset.setValue(e.nativeEvent.x) 
         
    }

    useEffect(() => {
        calculateProgressCurrentXoffset()
    }, [progress])
    
    return (
        <View style={{paddingLeft:10,paddingRight:10,position:'absolute',bottom:-10}}>
            {
                <PanGestureHandler 
                onEnded={()=>play()}
                onActivated={()=>{
                    //console.log('!!!');
                    stop()
                }} 
                onGestureEvent={handlePan} >
                    <View style={{height:30,paddingTop:20}}>
                        {
                            !Number.isNaN(progress) 
                            &&
                            <Progress.Bar 
                            width={screenSize.width-20}
                            height={1}
                            color={"#CDCDCD"} 
                            unfilledColor={"#484848"} 
                            /* borderColor={"transparent"}   */
                            borderWidth={0}
                            progress={progress} 
                            />
                        }
                        {/* <Animated.View style={[styles.progressButton,{transform:[{translateX:currentProgressButtonOffset}]}]} />
 */}
       
                    </View>
                </PanGestureHandler>
            }
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    progressButton:{
        width:15,
        height:15,
        borderRadius:15,
        backgroundColor:"#FFFFFF",
        position:'absolute',
        top:-3
    }
})
