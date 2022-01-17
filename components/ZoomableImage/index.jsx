   
import React,{useState,useRef,useEffect} from 'react'
import { View, Text ,PanResponder,Animated,Image,StyleSheet, Dimensions
  ,StyleProp,
  ViewStyle
  , ScrollView,
  MutableRefObject,
  DeviceEventEmitter,
  
} from 'react-native'

import { screenSize } from '../../util/screenSize';


import { PinchGestureHandler ,PinchGestureHandlerGestureEvent, State, TapGestureHandler } from 'react-native-gesture-handler'

import { Value } from 'react-native-reanimated'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import CashedImage from '../NonIdCachedImage'
import { userStore } from '../../mobx/store';

import ImageZoom,{IOnMove} from 'react-native-image-pan-zoom'

import { imageStore ,observer  } from '../../mobx/lock';
import { Easing } from 'react-native';

/**
 * 
 * @param {{
 *  uri : string,
 *  style : StyleProp<ViewStyle>
 *  isSwipe : boolean,
 *  setOnScroll : ()=>void ,
 *  isCache : boolean , 
 *  doubleTapEvent : ()=>void
 *  onZooming : (scale :number , index:number )=>void 
 *  index : number , 
 *  autoReset? : boolean  ,
 *  closeTabBarWhenZooming? :boolean,
 *  usingOnDiscover? :boolean
 * }}
 */
 function index( { 

                            uri,  
                            style, 
                            isSwipe, 
                            setOnScroll,
                            isCache,
                            doubleTapEvent,
                            zooming,
                            onZooming,
                            index,
                            autoReset,
                            closeTabBarWhenZooming,
                            usingOnDiscover,
                                  } ) {


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
  
   
    const zoomScale = useRef(new Animated.Value(0)).current

    const isRelease = useRef(false)

    /** @type {React.LegacyRef<ScrollView>}*/
    const ref = useRef()
    

    const controlScrolling =  ( e ) =>{
       ref.current.setNativeProps({
         scrollEnabled:true
       })
    }

    return (
      <TapGestureHandler onActivated={doubleTapEvent}  numberOfTaps={2} >
        <Animated.View style={{flex:1}} >
        <Animated.View style={[/* StyleSheet.absoluteFill, */ style.width===undefined?{flex:1}:{width:style.width, height:style.height}, 
            ]}>
            <ScrollView 
              contentContainerStyle={{
                flex:1
              }}
              ref={r=>ref.current = r}
              pinchGestureEnabled={true} 
              maximumZoomScale={3}
              minimumZoomScale={1} 
              centerContent={true} 
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              /* disableScrollViewPanResponder={true} */
              /* onTouchStart={e=>{
                console.log(e.nativeEvent.touches)
              }} */
              scrollEnabled={!autoReset}
              onScroll={e=>{
                const a = e.nativeEvent.contentSize
                let scale  =a.width / style.width-1
                if(scale>=0){
                  imageStore.setScale(a.width / style.width-1)
                  if(onZooming!==undefined){
                      onZooming(scale , index )
                  }
                  
                }
                 
               }}

              onResponderGrant={
                e=>{
                  
                  //imageStore.setIsStart(true)
                  //console.log('start!',imageStore.isStart)
                  //console.log('start')
                  imageStore.setIndex(index)
                  usingOnDiscover===true?imageStore.setIsStart(true):undefined
                  closeTabBarWhenZooming===true?DeviceEventEmitter.emit('setOpacity',0):undefined
                }
              }

               onResponderEnd={e=>{
                 /**
                  * 這里是給discover 用的
                  */
                  //console.log('close')
                  usingOnDiscover===true?imageStore.setIsStart(false):undefined
                  if(autoReset){
  
                      ref.current.setNativeProps({
                          scrollEnabled:false
                      }) 
                      ref.current.getScrollResponder().scrollResponderZoomTo({
                        width:style.width,
                        height:style.height,
                
                      })
                      setTimeout(()=>{
                          imageStore.setScale(0)
                      },2000 )
                  }
                  closeTabBarWhenZooming===true?DeviceEventEmitter.emit('setOpacity',1):undefined
         
               }}
              scrollEventThrottle={1}
             >
                
                   {
                      isCache!==undefined?
                      <CashedImage 
                        
                      uri={uri} 
                      style={style }  
                      />
                      :
                      <Image
                      source={{
                        uri:uri
                      }}
                      style={style}
                    />
                   }

            </ScrollView>
                      
            
            
            {/* <ImageZoom 

            cropWidth={style.width} 
            cropHeight={style.height} 
            imageWidth={style.width} 
            imageHeight={style.height} 
            enableDoubleClickZoom={false}
            useNativeDriver
            onDoubleClick={doubleTapEvent}
            
            
            onMove={(e)=>{
              if((e.scale-1)===imageStore.scale){

              }else{
                imageStore.setScale((e.scale-1))
              }
              

              return onZooming!==undefined?onZooming(e.scale,index):undefined
            }}
            responderRelease={()=>{
         
              console.log('release',imageStore.isZooming)
            }}
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
              </ImageZoom>    */}
            
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
    </TapGestureHandler>
    )
    
}
export default observer(index)


const styles = StyleSheet.create({
  zoomedImg:{
    
      borderRadius:10,
      //transform: [/* {scale} *//* { translateX: pan.x }, { translateY: pan.y }, */]

  }
})
