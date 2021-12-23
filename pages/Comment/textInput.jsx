import React from 'react'
import { Animated,StyleSheet, Text, View ,TextInput, Keyboard , StyleProp , ViewStyle, ReturnKeyTypeOptions, KeyboardTypeOptions} from 'react-native'

Animated.View
/**
 * 
 * @param {{
 *  style? : StyleProp<ViewStyle>,
 *  onSubmitEditing? : ()=>void,
 *  onBlur? : ()=>void,
 *  placeholder? : string,
 *  returnKeyType?  : ReturnKeyTypeOptions,
 *  keyboardType? : KeyboardTypeOptions,
 *  onTouchStart? : ()=>void
 * }}
 */
const MyTextInput = ({ style , onSubmitEditing , onBlur ,placeholder , returnKeyType , keyboardType , onTouchStart }) => {

    const [value, onChangeText] = React.useState();

    return (
        <TextInput 
            keyboardType={keyboardType || 'twitter'}
            returnKeyType={returnKeyType || 'send'}
            onBlur={()=>{
                if(onBlur!==undefined) {
                    onBlur()
                }
                Keyboard.dismiss()
            }}
            onSubmitEditing={()=>{
                onSubmitEditing(value)
                onChangeText(()=>'')
            }}
            placeholderTextColor={"#CDCDCD"}
            placeholder={placeholder || "新增回應......"} 
            style={styles.input} 
            onChangeText={text => onChangeText(text)} 
            value={value} 
            onTouchStart={onTouchStart?onTouchStart:undefined}
        />
    )
}

export default MyTextInput

const styles = StyleSheet.create({})
