import React from 'react'
import { View, Text } from 'react-native'
import {imageStore,observer} from '../../mobx/lock'
import {screenSize } from '../../util/screenSize'
import MaskView from '../../components/MaskView'
interface AutoSizeMaskViewProps {


    /**
     * @description 索引
     */
    index? :number
}

const AutoSizeMaskView = ({ index }: AutoSizeMaskViewProps) => {

    if(imageStore.isStart!==true){
        return null
    }

    //console.log('re-render MaskView',imageStore.scale)

    if(imageStore.index === index){
        return (
            <MaskView  
            style={{
                zIndex:1,
                height:2005,
                display:imageStore.isStart===true?'flex':'none',
                width:imageStore.maskViewHeight,
                position:'absolute',
                top:-750,
                backgroundColor:"#0E0E0E" ,
                opacity:imageStore.scale-0.1
            }} 
            opacity={0.3} 
            />
        )
    }else if(imageStore.index-1 === index || imageStore.index+1 === index) {
        return (
            <MaskView  
        style={{
            zIndex:0,
            height:705,
            display:imageStore.isStart===true?'flex':'none',
            width:imageStore.maskViewHeight,
            position:'absolute',
            top:-50,
            backgroundColor:"#0E0E0E" ,
            opacity:0
        }} 
        opacity={0.3} 
        />
        )
    }

    return (
        <>
        </>
        
    )
}

export default observer(AutoSizeMaskView)
