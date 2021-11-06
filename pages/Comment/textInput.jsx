import React from 'react'
import { StyleSheet, Text, View ,TextInput, Keyboard} from 'react-native'

const MyTextInput = ({ style , onSubmitEditing }) => {

    const [value, onChangeText] = React.useState();

    return (
        <TextInput 
            keyboardType={'twitter'}
            returnKeyType='send'
            onBlur={()=>Keyboard.dismiss()}
            onSubmitEditing={()=>{
                onSubmitEditing(value)
                onChangeText(()=>'')
            }}
            placeholder={"新增回應......"} 
            style={styles.input} 
            onChangeText={text => onChangeText(text)} value={value} 
        />
    )
}

export default MyTextInput

const styles = StyleSheet.create({})
