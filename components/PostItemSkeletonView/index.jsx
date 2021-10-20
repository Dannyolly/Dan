import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SkeletonView from '../SkeletonView'

import { screenSize } from '../../util/screenSize'

const index = () => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <View style={{flexDirection:'row',paddingLeft:10,marginBottom:10}}>
                    <SkeletonView style={styles.iconStyle}  />
                    <View style={{paddingLeft:10,height:40,alignItems:'center',justifyContent:'center'}}>
                        <SkeletonView style={styles.textStyle}  />
                    </View>
                
                </View>

                <SkeletonView style={[styles.postImage,{marginBottom:10}]} />  
                <View style={{paddingLeft:20}}>
                    <SkeletonView style={{width:100,height:20,marginBottom:5,borderRadius:20,marginTop:5}} /> 
                </View> 
                <View style={{paddingLeft:20}}>
                    <SkeletonView style={{width:250,height:20,marginBottom:5,borderRadius:20,marginTop:5}} /> 
                </View> 
                <View style={{paddingLeft:20}}>
                    <SkeletonView style={{width:150,height:20,marginBottom:5,borderRadius:20,marginTop:5}} /> 
                </View> 
                
            </View> 
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    shadowStyle:{
        /* shadowColor:"#FFFFFF",
        shadowOpacity:1,
        shadowOffset:{
            width:0,
            height:5
        },
        shadowRadius:0, */
        borderRadius:10,
        backgroundColor:"#FFFFFF",
        marginBottom:20
    },
    itemContainer:{
        width:screenSize.width-20,
        flex:1,
        marginBottom:5,
    },
    itemContent:{
        width:screenSize.width-20,
        borderRadius:20,
        flex:1,
        paddingTop:20,
        
    },
    iconStyle:{
        width:35,
        height:35,
        borderRadius:30,
        zIndex:0
    },
    postImage:{
        width:screenSize.width,
        height:500,
        zIndex:4
    },
    shadowStylePostImage:{
        width:screenSize.width-40,
        borderRadius:10,
        height:350,
        zIndex:4
    },

    // skeleton UI

    textStyle:{
        width:150,
        height:20,
        borderRadius:20
    }
})
