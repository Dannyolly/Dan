import React, { Component } from 'react';
import { TextInput ,StyleSheet} from 'react-native';

const MyTextInput = ({ style , onFocus ,onBlur}) => {
  const [value, onChangeText] = React.useState();

  return (
    <TextInput
      placeholder="寫點甚麼"
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}

export default MyTextInput;


const styles = StyleSheet.create({

})

