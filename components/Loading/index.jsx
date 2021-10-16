import React from 'react'
import { View, Text ,Image} from 'react-native'
import { screenSize } from '../../util/screenSize'

export default function index({ topOffset , text ,isFinish }) {
    
    
    console.log(text)
    return (
        <View style={{
            position:'absolute',
            width:150,
            height:150,
            borderRadius:20,
            backgroundColor:"#F7F7F7",
            justifyContent:'center',
            alignItems:'center',
            top:screenSize.height/2-25-75,
            left:screenSize.width/2-75,
            shadowColor:"#CDCDCD",
            shadowRadius:20,
            shadowOpacity:0.6,
            shadowOffset:{
                width:10,
                height:10
            }
        }} 
            
            >
            {   
                isFinish===false
                &&
                <View>
                    <Image 
                    source={require('../../assets/giphy.gif')}
                    style={{width:100,height:60}}
                    />
                    <Text style={{fontWeight:'700',fontSize:14,color:"black",textAlign:'center',color:"#CDCDCD"}}>
                        Loading...
                    </Text>
                </View>
            }
            {
                isFinish===true
                &&
                <View style={{justifyContent:'center'}}>
                    <Image 
                    source={require('../../assets/finish.gif')}
                    style={{width:150,height:150,borderRadius:20}}
                    />
                    <Text style={{width:150,position:'absolute',bottom:20,fontWeight:'700',fontSize:14,color:"black",textAlign:'center',color:"#CDCDCD"}}>
                        發布成功!
                    </Text>
                </View>    
            }
        </View>
    )
}
