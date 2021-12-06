import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PostItemSkeletonView from '../PostItemSkeletonView'
import SkeletonView from '../SkeletonView'

const index = () => {
    return (
        <View style={{paddingTop:50}}>
            <View style={{flexDirection:'row',paddingLeft:10}}>
                <SkeletonView style={{width:70,height:100,borderRadius:20,marginRight:10}} />
                <SkeletonView style={{width:70,height:100,borderRadius:20,marginRight:10}} />
                <SkeletonView style={{width:70,height:100,borderRadius:20,marginRight:10}} />
                <SkeletonView style={{width:70,height:100,borderRadius:20,marginRight:10}} />
                <SkeletonView style={{width:70,height:100,borderRadius:20,marginRight:10}} />
            </View>
            <PostItemSkeletonView  paddingTop={0}  />
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
