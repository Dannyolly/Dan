import React,{useRef} from 'react'
import { View, Text ,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import Swiper from 'react-native-swiper';
import { screenSize } from '../../util/screenSize';


import SwiperItem from './SwiperItem';
/**
 * @param Boolean           isJustify
 * @param callback          doubleTapEvent
 * @param Array             data 
 * @param Object            initLocation
 * @returns 
 */
export default function index({ data,navigation ,style ,isJustify,doubleTapEvent, index  }) {

    

    return (
        
        <View style={ style!==undefined?{...style}:styles.container}>
            <View style={style!==undefined?{...style}:styles.realContainer}>
                <Swiper
                key={data.length}
                paginationStyle={styles.pagination}
                >
                    {
                        data.map((item,i)=>{
                            return(
                                <SwiperItem

                                isJustify={isJustify}
                                style={style}
                                index={index}
                                data={item}
                                navigation={navigation}
                                key={i}
                                doubleTapEvent={doubleTapEvent}
                                />
                            )
                        })
                    }
                </Swiper>
            </View>
        </View>
    
    )
}

const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        height:120,
        paddingLeft:20,
        paddingRight:20,
        marginBottom:20
    },
    realContainer:{
        width:screenSize.width-40,
        height:120,
        borderRadius:15,
        overflow:'hidden'
    },
    pagination:{
        bottom:-25
    }
})