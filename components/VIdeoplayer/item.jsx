
import React,{useRef,useState,useCallback, useEffect} from 'react'
import { View, StyleSheet, Button, Modal ,TouchableWithoutFeedback,Text,
    KeyboardAvoidingView,
    Keyboard} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { screenSize } from '../../util/screenSize';
import PagerView from 'react-native-pager-view';
import Progress from './Progress';
import MyTextInput from './textinput';
import { FontAwesome } from '../../util/Icon';
/**
 * 
 * @param  index Number
 * @returns 
 */
export default function App({ index ,currentPage }) {


    const video = React.useRef(null);

    const [status, setStatus] = React.useState({});

    const ref = useRef()
    
    const [progress, setProgress] = useState(0)
    
    const [isPlay, setIsPlay] = useState(false)

    const isShowKeyboard = useRef(false)

    const [changeTextBoxStyle, setChangeTextBoxStyle] = useState(false)


    const play = async ()=>{
        video.current.playAsync()
    }

    const stop = async () =>{
        video.current.pauseAsync()
    }

    const setVideoPositionMillis =( millis ) =>{
        video.current.setPositionAsync(millis,{
            toleranceMillisBefore:25,
            toleranceMillisAfter:25
        })
    }

    useEffect(()=>{
        if(video.current!==undefined && video.current !==null){
            currentPage ===index?  video.current.playAsync() :video.current.pauseAsync()

        }
    },[currentPage])
    



    return (
            <View key={index.toString()}>
                <TouchableWithoutFeedback onPress={async ()=>{
                        
                        if(isShowKeyboard.current){
                            //console.log('close');
                            Keyboard.dismiss()
                        }else{
                           // console.log('play');
                            setIsPlay(!isPlay)
                        }
                        
                    }}>
                    <View>
                        {/* <View  style={[styles.video,{backgroundColor:"#FFFFFF"}]} ></View> */}
                        <Video
                            shouldPlay={isPlay}
                            progressUpdateIntervalMillis={1}
                            ref={video}
                            style={styles.video}
                            source={{
                            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                            }}
                            collapsable={true}
                            resizeMode='cover'
                            isLooping
                            
                            onPlaybackStatusUpdate={status => {
                                
                                setStatus(() => status)
                                
                                
                            }}
                        />
                        {/* playIcon */}
                        <View style={{position:'absolute',width:screenSize.width,height:screenSize.height,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:50,height:50,borderRadius:25}}>

                            </View>
                        </View>
                        <Progress  
                        setVideoPositionMillis={setVideoPositionMillis} 
                        play={play} 
                        stop={stop} 
                        progress={status.positionMillis/status.durationMillis}  
                        duration = {status.durationMillis}
                        />
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
                    </View>
                </TouchableWithoutFeedback>      
            </View>
    );
}



const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        height:screenSize.height
    },
    video:{
        width:screenSize.width,
        height:screenSize.height-100,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    }
    ,
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

