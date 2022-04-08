import React from 'react'
import { StyleSheet, Text, View ,Image, Keyboard} from 'react-native'
import { screenSize } from '../../../../util/screenSize'
import { videoPlayerStore } from '../../../../mobx/videoPlayer'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
const Item = ({ item ,index }) => {
    

    const comment = () =>{
        videoPlayerStore.callTheKeyBoard()
    }


    return (    
            <TouchableWithoutFeedback onPress={comment} style={{width:screenSize.width,height:90}} >
                <View style={{paddingLeft:60,marginBottom:15}}>
                        
                        <Image  
                            style={styles.imageStyle} 
                            source={require('../../../../assets/icon.png')} 
                        />
                                
                        <View style={{width:80,backgroundColor:"#F4F4F4",borderRadius:10,padding:10,/* paddingTop:5,paddingBottom:5, */marginBottom:5}}>
                            <Text style={{fontWeight:'600',marginRight:10,marginBottom:3,paddingLeft:1,textAlign:'left'}}>danny</Text>
                            <Text style={{textAlign:'left'}}>
                                abc
                            </Text>
                        </View>
                        <View style={{flexDirection:'row',paddingLeft:9}}>
                                <Text style={{color:"#989C9E",marginRight:10,fontSize:12}}>11月11日</Text>
                                <Text style={{color:"#989C9E",marginRight:10,fontSize:12}}>123個讚好</Text>
                                <Text style={{color:"#989C9E",marginRight:10,fontSize:12}}>讚好</Text>
                        </View>
        
                    </View>
            </TouchableWithoutFeedback>
    )
}

export default Item

const styles = StyleSheet.create({
    imageStyle:{
        width:40,
        height:40,
        borderRadius:20,
        position:'absolute',
        left:10,
        top:5
    }
})
