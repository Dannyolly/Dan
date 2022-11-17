import React from 'react'
import { View, Text } from 'react-native'
import CachedImage from 'expo-cached-image'

/**
 * @Dannyolly
 * @description this methods need a unique Id , so we suggest you to use NonIdCachedImage
 * @deprecated
 * @param {} param0 
 * @returns 
 */
export default function index({ uri ,style ,id}) {
    return (
        <View>
            {/* <CachedImage
                source={{ 
                    uri:uri,
                }}
                cacheKey={`${id}-thumb`}
                style={style} 
            /> */}
        </View>
    )
}
