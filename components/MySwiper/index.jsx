import { useNavigation ,NavigationProp} from '@react-navigation/native';
import React,{useRef} from 'react'
import { View, Text ,StyleSheet,TouchableWithoutFeedback ,ViewProps} from 'react-native'
import Swiper from 'react-native-swiper';
import { screenSize } from '../../util/screenSize';


import { imageStore ,observer } from '../JustifyCenterImage/lock';
import SwiperItem from './SwiperItem';
/**
 * 
 * @param {{
 *      data : Object , 
 *      navigation : any ,
 *      style : import('react-native').StyleProp<import('react-native').ViewStyle>
 * 
 * 
 * }}
 */
function index({ data,navigation ,style ,isJustify,doubleTapEvent, index , zooming , onZooming  }) {

    
    const ref = useRef()

    return (
        
        <View style={ style!==undefined?{...style,transform:[{scale:index===imageStore.index?imageStore.scale+1:1}]}:styles.container}>
            <View style={style!==undefined?{...style}:styles.realContainer}>
                <Swiper
                key={data.length}
                paginationStyle={styles.pagination}
                /* onMoveShouldSetResponderCapture={e=>true} */
                /* scrollEnabled={false} */
                ref={c=>ref.current = c}
                /* onResponderTerminationRequest={e=>true} */
                
                >
                    {
                        data.map((item,i)=>{
                            return(
                                <SwiperItem
                                    zooming={zooming}
                                    onZooming={onZooming}
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

export default observer(index)


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