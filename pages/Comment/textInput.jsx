import React from 'react'
import { StyleSheet, Text, View ,TextInput, Keyboard , StyleProp , ViewStyle, ReturnKeyTypeOptions, KeyboardTypeOptions} from 'react-native'


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
                onBlur()
                Keyboard.dismiss()
            }}
            onSubmitEditing={()=>{
                onSubmitEditing(value)
                onChangeText(()=>'')
            }}
            placeholder={placeholder || "新增回應......"} 
            style={styles.input} 
            onChangeText={text => onChangeText(text)} value={value} 
            onTouchStart={onTouchStart}
        />
    )
}

export default MyTextInput

const styles = StyleSheet.create({})
