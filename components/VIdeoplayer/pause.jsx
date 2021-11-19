import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { screenSize } from '../../util/screenSize'
import { Feather ,AntDesign } from '../../util/Icon'

const pause = (  ) => {
    return (
        
        <AntDesign    name="playcircleo" style={{fontSize:40,color:"#FFFFFF",position:'absolute',top:(screenSize.height-100)/2,left:(screenSize.width-50)/2}} />
        
    )
}

export default pause

const styles = StyleSheet.create({

})
