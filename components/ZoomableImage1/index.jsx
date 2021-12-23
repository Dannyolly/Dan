import React from 'react'
import { Modal, StyleSheet, Text, View ,Image ,StyleProp,  ViewStyle  } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { screenSize } from '../../util/screenSize'
/**
 * @param {{
 *  url : string , 
 *  style : StyleProp<ViewStyle> , 
 *  
 * 
 * 
 * }}
 * @returns 
 */
const index = ({  url , style }) => {
    return (
        <Modal style={{width:screenSize.width,height:screenSize.height}}>
            <ScrollView 
            pinchGestureEnabled={true} 
            maximumZoomScale={3}
             minimumZoomScale={1} 
             centerContent={true} >
                <Image  source={{uri:url}} 
                style={{width:screenSize.width,height:400}} resize />

            </ScrollView>
        </Modal>
    )
}

export default index

const styles = StyleSheet.create({})
