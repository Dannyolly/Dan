import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { AntDesign } from '../../util/Icon'
export class Font extends Component {


    render() {
        return (
            <AntDesign name="heart" style={{fontSize:100,color:"#FF1C45",
            /* shadowColor:"rgba(0,0,0,0.3)",
            shadowOpacity:0.8,
            shadowRadius:20,
            shadowOffset:{
                width:5,
                height:5
            } */
        
        
        }} />
        )
    }
}

export default Font
