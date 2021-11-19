import React,{useRef} from 'react'
import { View, Text ,Image,StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import { screenSize } from '../../util/screenSize'
/* 
import AniImage from '../AniImage' */
import { useNavigation } from '@react-navigation/native';
import ZoomableImage from '../ZoomableImage'
import JustifyContentImage from '../JustifyContentImage'
export default function SwiperItem({data,index,style, isJustify,doubleTapEvent,initLocation,currentTopOffset ,zooming , onZooming }) {

    
    const navigation = useNavigation()


    return (
        <View> 
                
                {
                    isJustify===true?
                    <JustifyContentImage currentTopOffset={currentTopOffset} index={index} uri={data} style={style} doubleTapEvent={doubleTapEvent} />
                    :
                    <ZoomableImage zooming={zooming} onZooming={onZooming} uri={data} doubleTapEvent={doubleTapEvent} style={style} isCache={true} />
                }

                
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:120,
        zIndex:10,
    },
    ImageSize:{
        width:screenSize.width-40,
        height:120,
        
    }
})
