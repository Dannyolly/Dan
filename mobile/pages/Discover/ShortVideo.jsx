import React,{useState,memo} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ShortVideoItem from './ShortVideoItem'
import { useNavigation ,NavigationProp} from '@react-navigation/native'

import {} from 'ahooks'

const ShortVideo = ( {item ,index} ) => {




    const [isScroll, setIsScroll] = useState(false) 

    const navigation  =  useNavigation()

    const navigateToVideoPage = ()  =>{
        navigation.navigate('videoPlayer',{
            videoUrl:''
        })
    }

    const onScrolling = () =>{
        //isScroll?console.log('stop'):console.log('scrolling');
        setIsScroll(()=>!isScroll)
    }

    console.log('refresh- 1')

    return (
        <ScrollView onScrollBeginDrag={onScrolling} onScrollEndDrag={onScrolling} horizontal style={{zIndex:0,padding:10,height:120}} showsHorizontalScrollIndicator={false} >
            <View style={{height:100, flexDirection:'row',zIndex:0}} >
                <ShortVideoItem navigateToVideoPage={navigateToVideoPage} isScroll={isScroll} />
                <ShortVideoItem navigateToVideoPage={navigateToVideoPage} isScroll={isScroll} />
                <ShortVideoItem navigateToVideoPage={navigateToVideoPage} isScroll={isScroll} />
                <ShortVideoItem navigateToVideoPage={navigateToVideoPage} isScroll={isScroll} />
                <ShortVideoItem navigateToVideoPage={navigateToVideoPage} isScroll={isScroll} />
                <ShortVideoItem navigateToVideoPage={navigateToVideoPage} isScroll={isScroll} />
                <ShortVideoItem navigateToVideoPage={navigateToVideoPage} isScroll={isScroll} />
            </View>
        </ScrollView>

    )
}

export default memo(ShortVideo,()=>false)

const styles = StyleSheet.create({})
