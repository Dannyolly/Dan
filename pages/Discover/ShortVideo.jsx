import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ShortVideoItem from './ShortVideoItem'
import { useNavigation ,NavigationProp} from '@react-navigation/native'



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

    return (
        <ScrollView onScrollBeginDrag={onScrolling} onScrollEndDrag={onScrolling} horizontal style={{padding:10,height:120}} showsHorizontalScrollIndicator={false} >
            <View style={{height:100, flexDirection:'row'}} >
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

export default ShortVideo

const styles = StyleSheet.create({})
