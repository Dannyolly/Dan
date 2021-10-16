import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CachedImage from '../NonIdCachedImage'
const index = ({icon ,style ,image }) => {


    return (
        <View>
            <CachedImage  uri={image} style={{width:30,height:30,borderRadius:30,marginRight:5,position:'absolute',left:-10,top:-5}} />
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
