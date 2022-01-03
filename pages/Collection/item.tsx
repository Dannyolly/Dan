import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FormattedPost } from '../../util/type'

import CachedImage from '../../components/NonIdCachedImage'
import { base_url } from '../../api/config'
import { screenSize } from '../../util/screenSize'
import { calculateDate } from '../../util/function'

interface collectionItemProps {
    item : FormattedPost , 
    index : number 
}

const collectionItem = ({  item , index  }: collectionItemProps):React.ReactElement => {

    //console.log(base_url + item.userInfo[0].backgroundImage)

    return (
        <View style={{width:screenSize.width/2-10 , height:260,marginRight:10,borderRadius:10}}>
            <CachedImage
                uri={item.postImage[0]}
                style={{width:screenSize.width/2-10 , height:200,borderTopLeftRadius:10, borderTopRightRadius:10 }}
            />
            <View style={{padding:10,width:screenSize.width/2-10,height:60, flexDirection:'row',borderBottomLeftRadius:10 , borderBottomRightRadius:10, backgroundColor:"#FFFFFF" }} >
                <CachedImage
                    uri={base_url + item.userInfo[0].icon}
                    style={{width:20,height:20,borderRadius:10,marginRight:10,position:"absolute",bottom:5,left:5}}
                />
                <Text  numberOfLines={2} style={{fontSize:10,paddingTop:5,position:'absolute',left:28,bottom:10}} >
                { item.userInfo[0].username}
                </Text>
                <Text  numberOfLines={1} style={{fontSize:13,width:screenSize.width/2-10,fontWeight:'500'}} >
                { item.introduction}
                </Text>
                <Text style={{fontSize:10,position:'absolute',right:5,bottom:10,color:"#CDCDCD"}} >
                    {calculateDate(item.postDate)}
                </Text>
            </View>
        </View>
    )
}

export default collectionItem

const styles = StyleSheet.create({})
