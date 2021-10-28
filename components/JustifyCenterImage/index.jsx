import React,{useState,useEffect, useRef} from 'react'
import { StyleSheet, Text, View ,Image, findNodeHandle, Modal, Animated, Pressable } from 'react-native'
import * as Progress from 'react-native-progress';
import { screenSize } from '../../util/screenSize';
import CacheImage from '../NonIdCachedImage'
import { messageStore ,observer } from '../../mobx/chat';

import { PanGestureHandler, TapGestureHandler, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaskView from '../MaskView'

import BottomSheep from '../BottomSheet/MessageImage'


const index = ( { parentRef , mainRef , ChildrenComponent, BaseImage , imageUrl } ) => {

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
            topOffset  = screenSize.height - (top-31.5+220-messageStore.currentOffset) - 105
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
                Animated.timing(xyOffset,{
                    toValue:{
                        x:(screenSize.width-220)/2,
                        y:(896-220)/2,
                    },
                    duration:300,
                    useNativeDriver:false
                }).start()

                Animated.timing(opacity,{
                    toValue:1,
                    duration:300,
                    useNativeDriver:false
                }).start()

                Animated.timing(scale,{
                    toValue:(screenSize.width/220),
                    useNativeDriver:false,
                    duration:300,
                }).start()
            },50)
        }

    }

    const collapseImage = () =>{
        if(showModal){       
            Animated.timing(scale,{
                toValue:1,
                useNativeDriver:false,
                duration:300,
            }).start()

            Animated.timing(opacity,{
                toValue:0,
                duration:300,
                useNativeDriver:false
            }).start()

            Animated.timing(xyOffset,{
                toValue:{
                    x:initPosition.current.x,
                    y:initPosition.current.y,
                },
                useNativeDriver:false,
                duration:300
            }).start()

            setTimeout(()=>{
                setShowModal(()=>false)
            },350)
        }
    }

    const tapPic =  (  ) =>{
        if(!showModal){
            zoomImage()
        }else{
            collapseImage()
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
                
                

                <View ref={c=>ref.current=c} onTouchEnd={tapPic}>
                    <ChildrenComponent/>
                </View>
                <Modal 
                style={{width:screenSize.width,height:screenSize.height}} 
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

                        <Pressable onLongPress={()=>{
                            setImage(()=>imageUrl)
                            console.log(imageUrl);
                            setIsOpen(()=>true)
                        }} > 
                            <Animated.View   
                            
                            onTouchEnd={()=>tapPic()}
                            style={{width:220,height:220,borderRadius:0,
                            transform:[

                            {translateX:xyOffset.x},
                            {translateY:xyOffset.y},
                            {scaleX:scale},
                            {scaleY:scale}

                            ]}}>
                                <BaseImage/>
                            </Animated.View>
                        </Pressable>
                    <BottomSheep isOpen={isOpen} setIsOpen={setIsOpen} savedImage={savedImageToMedia}  imageUrl={imageUrl}  />
                </Modal>

                
            </View>
        
    )
}

export default index

const styles = StyleSheet.create({})
