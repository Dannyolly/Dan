import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MessageBox = (props) => {

    console.log(props)
    return (
        <View style={{padding:20}}>
            <Text>{props.text}</Text>
        </View>
    )
}

export default MessageBox

const styles = StyleSheet.create({})
