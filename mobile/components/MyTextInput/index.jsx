import React,{useState,useEffect,useCallback, useRef} from 'react'
import { StyleSheet, Text, View,Image, Button ,TextInput, Animated, Keyboard} from 'react-native'
const index = ( {style,onChangeText ,text,title} ) => {

    const value = useRef(new Animated.Value(0)).current

    const color = "#28C1FD"

    const defaultColor= "#CDCDCD"

    const [isClick, setIsClick] = useState(false)

    const textAnimated=()=>{
        Animated.spring(value,{
            toValue:-20,
            speed:8,
            useNativeDriver:false
        }).start()
        setIsClick(()=>!isClick)
    }

    const textBlur = ()=>{
        if(text===""){
            Animated.spring(value,{
                toValue:0,
                speed:8,
                useNativeDriver:false
            }).start()
        }
        setIsClick(()=>!isClick)
    }

    return (
        <View style={{paddingLeft:10}}>
            <Animated.View style={{backgroundColor:"#FFFFFF",position:'absolute',top:Animated.add(12,value),left:Animated.add(40,value),zIndex:1}}>
                <Text style={{zIndex:1,color:isClick?color:defaultColor}}>{title}</Text>
            </Animated.View>
            <TextInput
                onFocus={()=>textAnimated() }
                onBlur={()=>textBlur()}
                style={[styles.textInput,{borderColor:isClick?color:defaultColor}]}
                onChangeText={text => onChangeText(text)}
                value={text}
                />
        </View>
    );
    
}

export default index

const styles = StyleSheet.create({
    textInput:{
        width:360,
        padding:15,
        borderRadius:10,
        
        borderWidth:1,
        borderColor:"#CDCDCD"
    }
})
