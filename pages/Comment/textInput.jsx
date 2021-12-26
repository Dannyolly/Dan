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
 *  onTouchStart? : ()=>void , 
 *  onFocus? : () => void,
 *  autoFocus? : boolean ,
 *  onType? : ( text :string)=>void
 * }}
 */
const  MyTextInput = ({ onType,autoFocus,style , onSubmitEditing , onBlur ,placeholder , returnKeyType , keyboardType , onTouchStart , onFocus }) => {

    const [value, onChangeText] = React.useState();

    return (
        <TextInput 
            editable
            autoFocus={autoFocus?autoFocus:false}
            keyboardType={keyboardType || 'twitter'}
            returnKeyType={returnKeyType || 'send'}
            onFocus={()=>{
                if(onFocus!==undefined) {
                    onFocus()
                }
            }}
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
            style={style!==undefined?style.input:undefined} 
            onChangeText={text => {
                onType!==undefined?onType(text):undefined
                onChangeText(text)
            }} 
            value={value} 
            
            onTouchStart={onTouchStart?onTouchStart:undefined}
        />
    )
}

export default MyTextInput

const styles = StyleSheet.create({})
