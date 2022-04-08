import React,{useState,useEffect, useRef, memo} from 'react'
import { StyleSheet, Text, View ,Image, findNodeHandle, Modal, Animated } from 'react-native'
import * as Progress from 'react-native-progress';
import { screenSize } from '../../util/screenSize';
import CacheImage from '../NonIdCachedImage'
import { messageStore ,observer } from '../../mobx/chat';

import { TapGestureHandler } from 'react-native-gesture-handler';
import MaskView from '../MaskView'
import { userStore } from '../../mobx/store';
import JustifyCenterImage from '../JustifyCenterImage'
import { imageStore } from '../../mobx/lock';

const index = (props ) => {

    const {image ,progress , isFinish, parentRef , containerSize, RenderImage, UUID } = props

    const [uploaded, setIsUploaded] = useState(true)

    const ref = useRef()


    useEffect(() => {
        if(progress===1 ){
            //console.log('finish')
            setIsUploaded(()=>true)
        }else if(uploaded===true && progress!==0) {
            setIsUploaded(()=>false)
            //console.log('uploading')
        }
    }, [progress])

    useEffect(()=>{
        if(isFinish==true){
            setIsUploaded(()=>true)
        }
    },[])
    
    //console.log('uploadImage',progress)

    return (
        <View ref={c=>ref.current=c} style={{position:'relative',width:220,height:220,backgroundColor:"#EBEDF5"}} >
            <View style={{position:'absolute',top:0,width:220,height:240,backgroundColor:"#EBEDF5",right:0,}} />
            <View style={{paddingTop:10}} >
                {
                    <RenderImage />
                }
                {
                    (uploaded===false  )
                    &&
                    <View style={[{position:'absolute',backgroundColor:"rgba(0,0,0,0.2)",justifyContent:'center',alignItems:'center',width:220,height:220,borderRadius:10,right:0,top:10}]}>
                        <Progress.Pie color={"#F0F2FC"} progress={progress} size={100}  showsText={true} />
                    </View>
                }
            </View>
        </View>
    )
}

export default memo(index,(pre,next)=>{

    //console.log(pre.progress,next.progress)
    return  true
})

const styles = StyleSheet.create({

})
