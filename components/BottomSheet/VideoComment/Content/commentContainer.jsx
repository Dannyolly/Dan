import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MyTextInput from '../../../VIdeoplayer/textinput'
import { videoPlayerStore ,observer  } from '../../../../mobx/videoPlayer'

import { screenSize } from '../../../../util/screenSize'
const commentContainer = observer(() => {

    console.log(`change ${videoPlayerStore.isCall}`)

    return (
        <View  style={styles.container} >
            <MyTextInput 
            style={styles.textInput} 
            isCall={videoPlayerStore.isCall}
            /* onBlur={()=>videoPlayerStore.callTheKeyBoard} */
            />
        </View>
    )
})

export default commentContainer

const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        height:100,
        padding:10,
        backgroundColor:"#FFFFFF"
    },
    textInput:{
        width:300,
        height:40,
        borderRadius:20,
        backgroundColor:"#CDCDCD"
    }
})
