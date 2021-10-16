import React from 'react'
import { View, Text } from 'react-native'
import CachedImage from 'expo-cached-image'


export default function index({ uri ,style ,id}) {
    return (
        <CachedImage
            source={{ 
                uri:uri,
            }}
            cacheKey={`${id}-thumb`}
            /* resizeMode="contain" */
            style={style} 
        />
    )
}
