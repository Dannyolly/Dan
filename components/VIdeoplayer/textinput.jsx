import React, { Component, useRef , useEffect } from 'react';
import { TextInput ,StyleSheet} from 'react-native';

const MyTextInput = ({ style , onFocus ,onBlur, autoFocus ,isCall }) => {
  
  
  const [value, onChangeText] = React.useState();

  const ref = useRef()

  useEffect(() => {
    
    if(isCall){
      ref.current.focus()
    }

  }, [isCall])

  return (
    <TextInput
      ref={input => ref.current= input}
      
      autoFocus={autoFocus}
      placeholder="寫點甚麼"
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
      onChangeText={text => onChangeText(text)}
      value={value}
      returnKeyType='send'
    />
  );
}

export default MyTextInput;


const styles = StyleSheet.create({

})

