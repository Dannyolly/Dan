   
import React,{useState,useRef,useEffect} from 'react'
import { View, Text ,PanResponder,Animated,Image,StyleSheet, Dimensions} from 'react-native'

import { screenSize } from '../../util/screenSize';


import { PinchGestureHandler ,PinchGestureHandlerGestureEvent, State, TapGestureHandler } from 'react-native-gesture-handler'

import { Value } from 'react-native-reanimated'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import CashedImage from '../NonIdCachedImage'
import { userStore } from '../../mobx/store';

import ImageZoom from 'react-native-image-pan-zoom'

export default function index( { uri ,  style   , isSwipe , setOnScroll,isCache , doubleTapEvent , zooming , onZooming} ) {


   /*  const isPinch = useRef(false)

    const pan = useRef(new Animated.ValueXY()).current;


    


    const panResponder = useRef(
            PanResponder.create({
              onMoveShouldSetPanResponder: (e, ges) => {
                //console.log(`pinch=${isPinch.current}`)
                return ges.numberActiveTouches===1
              },
              onPanResponderGrant: () => {
                
                if(setOnScroll!==undefined) {
                  setOnScroll()
                }
                pan.setOffset({
                  x: pan.x._value,
                  y: pan.y._value,
                });
              },
              onPanResponderMove: Animated.event(
                [
                  null,
                  { dx: pan.x, dy: pan.y }
                ]
              ),
              onPanResponderRelease: () => {
                //console.log('release')
                if(setOnScroll!==undefined) {
                  setOnScroll()
                }
                Animated.spring(pan, { toValue: { x: 0, y: 0 } ,useNativeDriver:false}).start();
                Animated.spring(scale,
                  { 
                   toValue:1,
                   
                   useNativeDriver:false
                 })
               .start();
              }
            })
          ).current;


    const scale = useRef(new Animated.Value(1)).current
    const focal = useRef( new Animated.ValueXY(0,0)).current;

    const translateX = useRef(new Animated.Value(0)).current;
    
    const handlePinch= Animated.event([{ nativeEvent: { scale } }]);
    
    
    const handlePan = Animated.event([
      {
        nativeEvent :{ 
          translateX: translateX,
        },
    
      }  
    ],
    {
      
      listener:e=>console.log(e.nativeEvent),
      useNativeDriver:false
  
  })

  const zoom = useRef(0).current
 */
  
   
  
  
    return (
      <Animated.View style={{width:screenSize.width,height:screenSize.height}} >
        <Animated.View style={StyleSheet.absoluteFill}>
            <ImageZoom 
            cropWidth={style.width} 
            cropHeight={style.height} 
            imageWidth={style.width} 
            imageHeight={style.height} 
            useNativeDriver
            onDoubleClick={doubleTapEvent}
            onMove={(e)=>onZooming(e.scale)}
            responderRelease={()=>console.log('release')}
            >
                        {
                          isCache!==undefined?
                          <CashedImage  
                          uri={uri} 
                          style={style}  
                          />
                          :
                          <Image
                          source={{
                            uri:uri
                          }}

                          style={style}

                          />
                        }
              </ImageZoom>   

                      
              {/* <ReactNativeZoomableView
                  maxZoom={1.5}
                  minZoom={1}
                  zoomStep={0.5}
                  initialZoom={1}
                  bindToBorders={true}
                  captureEvent={true}
                  >
                    <Image   
                      source={require('../../assets/icon.png')} 
                      style={styles.zoomedImg}                        
                      />
                  </ReactNativeZoomableView> */}
         
        </Animated.View>
    </Animated.View>
    )
    
}

const styles = StyleSheet.create({
  zoomedImg:{
    
      borderRadius:10,
      //transform: [/* {scale} *//* { translateX: pan.x }, { translateY: pan.y }, */]

  }
})
