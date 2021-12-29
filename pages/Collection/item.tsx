import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FormattedPost } from '../../util/type'

import CachedImage from '../../components/NonIdCachedImage'
import { base_url } from '../../api/config'
import { screenSize } from '../../util/screenSize'

interface collectionItemProps {
    item : FormattedPost , 
    index : number 
}

const collectionItem = ({  item , index  }: collectionItemProps):React.ReactElement => {
    return (
        <View style={{width:screenSize.width/2-10 , height:200,marginRight:10,borderRadius:5 }}>
            <CachedImage
                uri={item.postImage[0]}
                style={{width:screenSize.width/2-10 , height:200,borderRadius:5 }}
            />
        </View>
    )
}

export default collectionItem

const styles = StyleSheet.create({})
