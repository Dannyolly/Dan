import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View,Image ,Animated,ScrollView, Modal} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { AntDesign, Ionicons } from '../../util/Icon'

import { screenSize } from '../../util/screenSize'

import NonIdCachedImage from '../NonIdCachedImage'

import { userStore } from '../../mobx/store'

const index = ( {uri , style,index } ) => {

    const [isClick, setIsClick] = useState(false)


    const xyOffset= useRef(new Animated.ValueXY(0,0)).current

    const scale = useRef(new Animated.Value(1)).current



    const originRef = useRef()

    
    const [initPosition, setInitPosition] = useState({ width:0,height:0,pageX:0,pageY:0 })


    const firstTime = useRef(false)
    
    const isClose = useRef(true)

    // 下列兩個為參數...
    const firstItemOffset = 478

    const eachItemOffset = 583

    const opacity = useRef(new Animated.Value(0)).current

    /**
     * @description 求出相對位置--- 當前到中間
     */
    const calculateRelativePosition = (width , height , pageX, pageY)=>{

        const screenWidth  = screenSize.width;
        const screenHeight = screenSize.height;
        
        // 這里是圖片所在屏幕的位置... 
        const currentLeft = pageX
        const temp =userStore.currentTopOffset
        const currentTop = Animated.multiply(Animated.subtract(userStore.currentTopOffset,pageY),-1)

        setInitPosition({width,height,pageX:currentLeft,pageY:currentTop.__getValue()})
   
        Animated.timing(xyOffset,{
            toValue:{
                x:currentLeft,
                y:currentTop.__getValue()
            },
            duration:1,
            useNativeDriver:false
        }).start() 

        //console.log(`currentTop=${currentTop.__getValue()}`)

        const relativeLeft = currentLeft
        const relativeTop  = (screenHeight-height*(screenWidth/width))/2

        return {
            currentLeft,
            currentTop:currentTop.__getValue(),
            x:relativeLeft,
            y:relativeTop
        }
    }   

    

    const moveContent=()=>{
            const { width,height } = style

            const pageX = 20

            const pageY = firstItemOffset+eachItemOffset*index

            //console.log(width,height,pageX,pageY,userStore.currentTopOffset)
            //xyOffset.setOffset({x:pageX,y:pageY})
            const {currentLeft,currentTop ,x, y } = calculateRelativePosition(width,height,pageX,pageY)

            
            

            setTimeout(()=>{
                
                Animated.timing(opacity,{
                    toValue:0.9,
                    duration:200,
                    useNativeDriver:false
                }).start()


                Animated.spring(xyOffset,{
                    toValue:{x,y},
                    useNativeDriver:false,
                    
                }).start()
    
    
                Animated.spring(scale,{
                    toValue:(screenSize.width)/width,
                    useNativeDriver:false
                }).start()
            },50)
            
            
        
    }

    const changeImageState=( close )=>{
        // 即此刻要關...
        if(isClick===false || close==true ){
            //關前做一個動晝
            if(isClose.current===false){
                Animated.spring(scale,{
                    toValue:1,
                    useNativeDriver:false
                }).start()

                Animated.timing(opacity,{
                    toValue:0,
                    duration:200,
                    useNativeDriver:false
                    }).start()

                Animated.spring(xyOffset,{
                    toValue:{
                        x:initPosition.pageX,
                        y:initPosition.pageY
                    },
                    useNativeDriver:false
                }).start()         
            }    
        }else{
            
            moveContent()
        }    

    }


    useEffect(()=>{
        if(firstTime.current===false){
            firstTime.current=true
        }else{
            changeImageState()
        }
    },[isClick])
    

    //console.log(index,uri)
    //console.log(index,initLocation)

    return (
        <View style={{position:'absolute',top:0,width:screenSize.width,height:screenSize.height}}>
            {
                <View>
                    <Modal visible={  isClick } transparent={true}   >
                        <View style={{position:'absolute'}}>
                            <Animated.View style={{position:'absolute',top:0,width:screenSize.width,height:screenSize.height,backgroundColor:'#0E0E0E',opacity:opacity}}  />
                            <Ionicons name="ios-arrow-back-circle-outline"  size={32} style={{top:60,left:20,color:"#FFFFFF"}} />
                        </View>
                        <TouchableWithoutFeedback 
                        style={{width:style.width,height:screenSize.height}} 
                         onPress={()=>{
                             //console.log('click');
                             changeImageState(true)
                             setTimeout(()=>{
                                setIsClick(()=>!isClick)
                                isClose.current=true
                             },250)
                             
                         }}>
                            <Animated.View 
                            
                            /* source={require('../../assets/icon.png')} */ 
                            style={[style,
                            {transform:[
                            {translateX:xyOffset.x },
                            {translateY:xyOffset.y },
                            {scaleX:scale},{scaleY:scale}
                        
                        
                        ]}]} 
                            >
                                <NonIdCachedImage
                                    
                                    uri={uri}
                                    style={style}
                                    />  
                            </Animated.View>  
                        </TouchableWithoutFeedback>    

                    </Modal>
                </View>
                
            }
            
            <TouchableWithoutFeedback  onPress={()=>{
                isClose.current=false
                setIsClick(()=>!isClick)
            }}>
                <NonIdCachedImage
                ref={c=>originRef.current=c} 
                uri={uri}
                style={style}
                 />  
            </TouchableWithoutFeedback>       
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    imageStyle:{
        
    }
})
