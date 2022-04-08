import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'

import MyTextInput from '../../../VIdeoplayer/textinput'
import { videoPlayerStore ,observer  } from '../../../../mobx/videoPlayer'

import { screenSize } from '../../../../util/screenSize'
const commentContainer = observer(() => {


    return (
        <View  style={styles.container} >
            <Image  
            source={require('../../../../assets/icon.png')} 
            style={{width:40,height:40,marginRight:10,borderRadius:20}} 
            />

            <MyTextInput 
            style={styles.textInput} 
            isCall={videoPlayerStore.isCall}
            onFocus={()=>videoPlayerStore.setIsCall(true)}
            onBlur={()=>videoPlayerStore.setIsCall(false)}
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
        padding:15,
        backgroundColor:"#FFFFFF",
        flexDirection:'row',
        shadowColor:"#CDCDCD",
        shadowRadius:2,
        shadowOpacity:0.7,
        shadowOffset:{
            width:0,
            height:0
        }
    },
    textInput:{
        width:330,
        height:40,
        borderRadius:20,
        paddingLeft:20,
        backgroundColor:"#F4F4F4"
    }
})
