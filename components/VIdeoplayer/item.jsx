
import React,{useRef,useState,useCallback, useEffect, createRef} from 'react'
import { View, StyleSheet, Button, Modal ,TouchableWithoutFeedback,Text,
    KeyboardAvoidingView,
    Keyboard,
    Image,
    Alert
} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { screenSize } from '../../util/screenSize';
import PagerView from 'react-native-pager-view';
import Progress from './Progress';
import MyTextInput from './textinput';
import { AntDesign, Entypo, FontAwesome } from '../../util/Icon';
import CachedImage from '../NonIdCachedImage'
import Animated from 'react-native-reanimated';

import VideoComment from '../BottomSheet/VideoComment'
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { videoPlayerStore , observer } from '../../mobx/videoPlayer';

import LikeAnimated from '../LikeAnimated'

import DoubleTap from 'react-native-double-tap'

import { tapResponser } from '../../util/haptic'
import Pause from './pause';
import { useNavigation } from '@react-navigation/native';

/**
 * @param    {Object}  props
 * @param    {number} props.index
 * @param    {number} props.currentPage
 */
export default  item = observer(({currentPage , index })=>{

    
    const navigation =  useNavigation()

    const video = React.useRef(null);

    const [status, setStatus] = React.useState({});

    const ref = useRef()
    
    const [progress, setProgress] = useState(0)
    
    const [isPlay, setIsPlay] = useState(true)

    const isShowKeyboard = useRef(false)

    const [changeTextBoxStyle, setChangeTextBoxStyle] = useState(false)

    const [openComment, setOpenComment] = useState(false)

    const [isShowLike, setIsShowLike] = useState(false)

    const doubleTap = useRef()

    const play = async ()=>{
        video.current.playAsync()
    }

    const stop = async () =>{
        video.current.pauseAsync()
    }

    /** @param {number} millis */
    const setVideoPositionMillis =( millis ) =>{
        video.current.setPositionAsync(millis,{
            toleranceMillisBefore:25,
            toleranceMillisAfter:25
        })
    }

    const setCommentState = () =>{
        console.log(openComment)
        setOpenComment(()=>!openComment)
    }

    const onTap  = () =>{
        console.log('tap')
        if(isShowKeyboard.current){
            Keyboard.dismiss()
        }else{
            setIsPlay(!isPlay)
        }
    }
    
    
    const onDoubleTap = () =>{
        tapResponser()
        setIsShowLike(()=>!isShowLike)
    }


    useEffect(()=>{
        if(video.current!==undefined && video.current !==null){
            currentPage ===index?  video.current.playAsync() :video.current.pauseAsync()

        }
    },[currentPage])
    

    navigation.canGoBack()

    return (
            <View style={{width:screenSize.width,height:screenSize.height}} key={index.toString()}>
                
                    <View>
                            <Animated.View style={{transform:[{translateY:0}]}} >
                                <View onTouchEnd={()=>{
                                    console.log(navigation.canGoBack())
                                    navigation.navigate('discover')
                                }} style={{position:'absolute',left:10,top:10,width:100,height:70,paddingTop:30,zIndex:1,flexDirection:'row'}}>
                                    <Entypo  name="chevron-small-left" style={{color:"#FFFFFF",fontSize:30,lineHeight:35}}  />
                                    <Image  source={require('../../assets/icon.png')} style={{width:35,height:35,borderRadius:20,paddingLeft:10}} />
                                    <Text style={{fontSize:16,color:"#FFFFFF",lineHeight:35,paddingLeft:10}} >danny</Text>
                                </View>
                                <View  style={{position:'absolute',right:30,top:10,width:100,height:70,paddingTop:30,zIndex:1,flexDirection:'row'}}>
                                    <AntDesign  name="hearto" style={{color:"#FFFFFF",fontSize:20,lineHeight:35}}  />
                                    <Text style={{fontSize:14,color:"#FFFFFF",lineHeight:35,paddingLeft:3}} >142</Text>
                                    <View style={{flexDirection:'row',height:60}} onTouchStart={setCommentState} >
                                        <FontAwesome name="comment-o" style={{color:"#FFFFFF",fontSize:20,lineHeight:30,paddingLeft:10}} />
                                        <Text style={{fontSize:14,color:"#FFFFFF",lineHeight:35,paddingLeft:3}}>1420</Text>
                                    </View>
                                </View>
                                <DoubleTap  
                                    singleTap={onTap}
                                    doubleTap={onDoubleTap}
                                    delay={200} 
                                >            
                                    <View style={styles.videoContainer} >
                                        <Video
                                            
                                            shouldPlay={isPlay}
                                            /* progressUpdateIntervalMillis={1} */
                                            ref={video}
                                            style={styles.video}
                                            source={{
                                            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                                            }}
                                            /* collapsable={true} */
                                            resizeMode='cover'
                                            isLooping
                                            
                                            onPlaybackStatusUpdate={status => {
                                                
                                                setStatus(() => status)
                                                    
                                            }}
                                        />
                                    </View>
                                </DoubleTap>
                                {/* playIcon */}
                                
                                <Progress  
                                setVideoPositionMillis={setVideoPositionMillis} 
                                play={play} 
                                stop={stop} 
                                progress={status.positionMillis/status.durationMillis}  
                                duration = {status.durationMillis}
                                />
                            </Animated.View>


                            <KeyboardAvoidingView 
                            keyboardVerticalOffset={50}
                            behavior={Platform.OS == "ios" ? 'position' : "height"} 
                            style={{
                                width:screenSize.width,
                                height:20,
                                paddingTop:20,
                                borderTopLeftRadius:20,
                                borderTopRightRadius:20,
                                paddingLeft:10,
                                paddingRight:10
                                }}>
                                <TouchableWithoutFeedback >
                                    <View style={{width:screenSize.width-60,flexDirection:'row',height:40,borderRadius:40,backgroundColor:"#484848"}}>
                                        <MyTextInput  
                                        onFocus={()=>{
                                            isShowKeyboard.current=true
                                            setChangeTextBoxStyle(()=>true)
                                        }}
                                        onBlur={()=>{
                                            isShowKeyboard.current=false
                                            setChangeTextBoxStyle(()=>false)
                                        }}
                                        style={changeTextBoxStyle?styles.input2:styles.input} 
                                        />
                                        {
                                            changeTextBoxStyle?
                                            <FontAwesome  name="send-o" style={{fontSize:20,paddingLeft:10,color:"#CDCDCD",lineHeight:40,zIndex:9,position:'absolute',right:-30}} />
                                            :
                                            <FontAwesome  name="send-o" style={{fontSize:20,paddingLeft:10,color:"#CDCDCD",lineHeight:40}} />
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>

                        {/* CommentSheet */}
                        {
                            
                            
                            <VideoComment  
                            isOpen={openComment}
                            setIsOpen={setCommentState}
                            
                            />
                        }
                        {
                            !isPlay
                            &&
                            <Pause/>
                        }
                        {
                            isShowLike
                            &&
                            <View style={{position:'absolute',width:screenSize.width,zIndex:999,height:screenSize.height,backgroundColor:"transparent",justifyContent:'center',alignItems:'center'}} >
                                <LikeAnimated  />
                            </View>
                        }

                        </View>
            </View>
    );
})



const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        height:screenSize.height
    },
    video:{
        width:screenSize.width,
        height:screenSize.height-100,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        position:'absolute'
    },
    videoContainer:{
        width:screenSize.width,
        height:screenSize.height-100,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
    buttons:{
        width:50,
        height:50
    },
    input:{
        width:screenSize.width-60,
        height:40,
        borderRadius:40,
        backgroundColor:"#484848",
        padding:5,
        paddingLeft:20,
        zIndex:0,
        //color:"#F4F4F4"
    },
    input2:{
        width:screenSize.width-20,
        height:40,
        borderRadius:40,
        backgroundColor:"#FFFFFF",
        padding:5,
        paddingLeft:20,
        zIndex:0,
        //color:"#CDCDCD"
    }
})

