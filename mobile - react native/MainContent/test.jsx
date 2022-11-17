import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ZoomImage from '../components/ZoomableImage'
import { screenSize } from '../util/screenSize'

const test = () => {
    return (
        <View style={{width:screenSize.width,height:screenSize.height,justifyContent:'center',alignItems:'center'}}>
            <ZoomImage 
            style={styles.image} 
            uri={'http://dandan.ihk.vipnps.vip//img/icon/1633840910592.png'} 
            isCache={true}
            />
        </View>
    )
}

export default test

const styles = StyleSheet.create({
    image:{
        width:screenSize.width,
        height:400
        
    }
})
