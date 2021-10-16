import React from 'react'
import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'

const Loading = (props) => {
    //console.log(props)
    return (
        <View style={{padding:20}}>
            <ActivityIndicator />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})
