import React,{useState,useRef,useEffect} from 'react'
import { View, Text ,PanResponder,Animated,Image,StyleSheet} from 'react-native'

import { screenSize } from '../../util/screenSize';


import { PinchGestureHandler ,PinchGestureHandlerGestureEvent, State, TapGestureHandler } from 'react-native-gesture-handler'

import { Value } from 'react-native-reanimated'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import CashedImage from '../NonIdCachedImage'
import { userStore } from '../../mobx/store';



export default function index( { uri ,  style   , isSwipe , setOnScroll,isCache , doubleTapEvent} ) {


    const isPinch = useRef(false)

    const pan = useRef(new Animated.ValueXY()).current;


    


    const panResponder = useRef(
            PanResponder.create({
              onMoveShouldSetPanResponder: () => {
                //console.log(`pinch=${isPinch.current}`)
                return isPinch.current
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
    
    /* const gestureHandler = onGestureEvent({
      state,
      scale,
      focalX:focal.x,
      focalY:focal.y
    }) */
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

  


  
  
    return (
        <View style={{zIndex:999,width:screenSize.width,height:400,alignItems:'center',justifyContent:"center"}}>
            {/* <View style={{width:screenSize.width,height:screenSize.height,backgroundColor:"rgba(0,0,0,0.2)",position:'absolute',zIndex:1}}  />
             */}
            <View style={{flex:1,zIndex:2}}>
                <TapGestureHandler numberOfTaps={2} onActivated={()=>doubleTapEvent()}>
                  <Animated.View style={{width:screenSize.width,height:400}}    >
                    <PinchGestureHandler onGestureEvent={handlePinch} onBegan={
                      ()=>{
                        //console.log('began');
                        isPinch.current=!isPinch.current
                      }
                    } 
                    onEnded={()=>{
                        //console.log('ended');
                        isPinch.current=!isPinch.current
                    }}
                    
                    > 
                      
                      <Animated.View
                      
                      {...panResponder.panHandlers}  
                      style={[styles.zoomedImg,{transform:[
                          {scale:scale},
                          {translateX:pan.x},
                          {translateY:pan.y}
                        ]}
                        ]
                      } >
                          {/* <Image  
                        
                        source={{
                          uri:uri
                        }} 
                        style={style}                        
                        /> */}
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
                        

                      </Animated.View>

                    </PinchGestureHandler>
                  </Animated.View>
                </TapGestureHandler>
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
            </View>

        </View>
    )
    
}

const styles = StyleSheet.create({
  zoomedImg:{
    width:screenSize.width-40,
      height:400,
      borderRadius:10,
      //transform: [/* {scale} *//* { translateX: pan.x }, { translateY: pan.y }, */]

  }
})
