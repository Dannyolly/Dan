import React,{useState,useEffect, useRef} from 'react'
import { StyleSheet, Text, View ,Image, findNodeHandle, Modal, Animated, Pressable } from 'react-native'
import * as Progress from 'react-native-progress';
import { screenSize } from '../../util/screenSize';
import CacheImage from '../NonIdCachedImage'
import { messageStore ,observer } from '../../mobx/chat';

import { PanGestureHandler, TapGestureHandler, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaskView from '../MaskView'

import BottomSheep from '../BottomSheet/MessageImage'
import OriginImage from './OriginImage';
import {imageStore } from '../../mobx/lock'


/** @param {{imageUrl :String}} */
const index = ( { parentRef , mainRef , ChildrenComponent, BaseImage , imageUrl ,isMoving, progress} ) => {

    const ref = useRef()

    const [showModal, setShowModal] = useState(false)

    const xyOffset = useRef(new Animated.ValueXY(0,0)).current

    const scale = useRef(new Animated.Value(1)).current

    const initPosition = useRef({x:0,y:0})

    const opacity = useRef(new Animated.Value(0)).current

    const [isOpen, setIsOpen] = useState(false)

    const [image, setImage] = useState(undefined)

    const [savedImage, setSavedImage] = useState(false)

    const measureCurrentElement =( ref  )=>{
        let topOffset  = 0
        let leftOffset = 0
        ref.measureLayout( findNodeHandle(parentRef),(left, top, width, height) => {
            //console.log(left,top,width,height)
            leftOffset = left
            // 這里是不知道為甚麼自己的圖片和別人的offset 不一樣,所以調一調
            const ownOffset = imageUrl.substring(0,1)==='f'?35:0
            topOffset  = screenSize.height - (top-31.5+220-messageStore.currentOffset) - 105 + ownOffset 
            initPosition.current.x=leftOffset
            initPosition.current.y=topOffset
            Animated.timing(xyOffset,{
                toValue:{
                    x:leftOffset,
                    y:topOffset
                },
                duration:1,
                useNativeDriver:false
            }).start() 

            setShowModal(()=>true)
        })
    }

    const zoomImage = ()=>{
    
        if(!showModal && !messageStore.scrolling ){
            measureCurrentElement(ref.current)
            setTimeout(()=>{
                Animated.parallel([
                    Animated.timing(xyOffset,{
                        toValue:{
                            x:(screenSize.width-220)/2,
                            y:(896-220)/2,
                        },
                        duration:300,
                        useNativeDriver:false
                    }),
                    Animated.timing(opacity,{
                        toValue:1,
                        duration:300,
                        useNativeDriver:false
                    }),
                    Animated.timing(scale,{
                        toValue:(screenSize.width/220),
                        useNativeDriver:false,
                        duration:300,
                    })
                ]).start()
            },10)
        }

    }

    const collapseImage = () =>{
        if(showModal){ 
            Animated.parallel([
                    Animated.timing(scale,{
                    toValue:1,
                    useNativeDriver:false,
                    duration:300,
                }),
                Animated.timing(opacity,{
                    toValue:0,
                    duration:300,
                    useNativeDriver:false
                }),
                Animated.timing(xyOffset,{
                    toValue:{
                        x:initPosition.current.x,
                        y:initPosition.current.y,
                    },
                    useNativeDriver:false,
                    duration:300
                })
            ]).start()
            

            setTimeout(()=>{
                setShowModal(()=>false)
            },300)
        }
    }

    const tapPic =  (  ) =>{
        if(!showModal){
            zoomImage()
        }else{
            collapseImage()
            imageStore.setScale(0)
        }
    }

    const savedImageToMedia = ()=>{
        
        setSavedImage(()=>true)
        setTimeout(()=>{
            setSavedImage(()=>false)
        },1500)
        
    }

    return (

            <View style={{zIndex:0}}>   
                {
                    
                    <OriginImage  
                        ref={ref}
                        tapPic={tapPic}
                        ChildrenComponent={ChildrenComponent}
                    />
                }    

                    <Modal 
                    style={{width:screenSize.width,height:screenSize.height,
                    /* overflow:showModal?'visible':'hidden' */}}
                     visible={showModal} 
                    transparent={true} >
                            <MaskView  opacity={opacity}   />
                            {/* save reminder */}
                            {
                                savedImage!==false
                                &&
                                <View style={{overflow:'hidden',zIndex:1,justifyContent:"center",alignItems:'center',left:(screenSize.width-150)/2,padding:10,top:(screenSize.height-150)/2,position:'absolute',backgroundColor:"#F7F7F7",width:150,height:150,borderRadius:20}}>
                                    <Image  source={require('../../assets/finish.gif')} style={{width:150,height:150}} />
                                <Text style={{position:'absolute',bottom:20,fontSize:16,color:"#CDCDCD"}}>保存成功</Text>
                                </View>
                            }

                            <View style={{width:screenSize.width,height:screenSize.height}} onLongPress={()=>{
                                /* setImage(()=>imageUrl)
                                setIsOpen(()=>true) */
                            }} > 
                                <Animated.View   
                                /* onTouchStart */
                                
                                onTouchEnd={(event)=>{
                                    /* console.log('>>><<<',imageStore.isZooming); */
                                    if(imageStore.isZooming){
                                        
                                    }else{
                                        tapPic()
                                    }
                                }}
                                style={{width:220,height:220,borderRadius:0,position:'absolute',
                                transform:[

                                {translateX:xyOffset.x},
                                {translateY:xyOffset.y},
                                {scaleX:Animated.add(scale,imageStore.scale>0?imageStore.scale:0)},
                                {scaleY:Animated.add(scale,imageStore.scale>0?imageStore.scale:0)}

                                ]}}>
                                    <BaseImage/>
                                </Animated.View>
                            </View>
                        <BottomSheep 
                            isOpen={isOpen} 
                            setIsOpen={setIsOpen} 
                            savedImage={savedImageToMedia}  
                            imageUrl={imageUrl}  
                        />
                    </Modal>


                
            </View>
        
    )
}

export default observer(index)

const styles = StyleSheet.create({})
