import React,{useRef,useState,useCallback, useMemo,memo, useEffect} from 'react'
import { StyleSheet, Text, View ,Image, Platform, Animated, Keyboard, Easing} from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { screenSize } from '../../util/screenSize'


import CachedImage from '../../components/CachedImage'
import { userStore } from '../../mobx/store'
import { base_url } from '../../api/config'
import item from '../../components/FriendList/item'
import MyFlatlist from './MyFlatlist'
import { addComment, getAllComment } from '../../api/api'

import { showMessage,hideMessage } from 'react-native-flash-message'
import { calculateDate, defaultShowMessage } from '../../util/function'

import { Feather ,AntDesign,FontAwesome} from '../../util/Icon'

import CommentHeader from '../../components/Header/Comment'

import { PanGestureHandler } from 'react-native-gesture-handler'
import MySwiper from '../../components/MySwiper'
import NonIdCachedImage from '../../components/NonIdCachedImage'
const index = ( {route , navigation, delayLoading,collapse } ) => {


    const { userId ,postId, item  } = route.params
 
    const [value, onChangeText] = React.useState();

    const [data, setData] = useState(undefined)

    const offset =  useRef(new Animated.Value(0)).current

    const scrollRef =useRef(undefined)

    const commentContainerOffset= useRef(new Animated.Value(0)).current

    const touchX  =useRef(new Animated.Value(0)).current

    const touchY  =useRef(new Animated.Value(0)).current

    const currentTranslationX = useRef(0)

    const moving = useRef(false)

    const clickedKeyBoard= ()=>{
       // console.log('up')
        Animated.timing(offset,{
            toValue:340,
            duration:340,
            easing:Easing.ease,
            useNativeDriver:false
        }).start()

    }

    const collapseKeyBoard=()=>{
       // console.log('down')
        Animated.spring(offset,{
            toValue:0,
            speed:4.8,
            bounciness:1,
            useNativeDriver:false
        }).start()

        Keyboard.dismiss()
    }

    const getComment =()=>{
        getAllComment(postId,0,10).then(res=>{
           // console.log(res.data)
            setData(()=>res.data)
        })
    }

    const submitMessage = () =>{
        
        collapseKeyBoard()
        setTimeout(()=>{
            let obj = {
                commentInfo:value,
                commetDate:new Date(),
                icon:userStore.userInfo.userInfo.icon,
                likeCount:0,
                postCommentId:null,
                postId:postId,
                userId:userId,
                username:userStore.userInfo.userInfo.username
            }
    
            setData(()=>[obj,...data])
            
            onChangeText(()=>'')
    
            addComment(userId,postId,value).then(res=>{
                /* showMessage({
                    description:JSON.stringify(res.data),
                    message:'JSON',
                    type:"info"
                })   */    
            })
        },500)
    }



    useEffect(() => {
        //getComment()
        if(delayLoading){
            setTimeout(()=>{
                getComment()
            },1000)
        }
    }, [])

    
    

    const onPanGestureEvent = Animated.event([
        { 
            nativeEvent: { translationX: touchX ,translationY: touchY}
        }], 
        {
            useNativeDriver: true,
             listener: e=>{
                //console.log(e.nativeEvent.translationX,touchX) 
                currentTranslationX.current=e.nativeEvent.translationX
             }
        }
    );
    

    const onPanFinished = () =>{
        console.log('touchX',currentTranslationX)
        if(currentTranslationX.current>170){
            Animated.spring(touchX,{
                toValue:0,
                bounciness:4,
                useNativeDriver:true
            }).start()
    
            Animated.spring(touchY,{
                toValue:0,
                bounciness:4,
                useNativeDriver:true
            }).start()
            setTimeout(()=>{
                collapse()
            },200)
            
        }else{
            Animated.spring(touchX,{
                toValue:0,
                bounciness:4,
                useNativeDriver:true
            }).start()
    
            Animated.spring(touchY,{
                toValue:0,
                bounciness:4,
                useNativeDriver:true
            }).start()
        }
        
    }


    return (

        <PanGestureHandler 
        onGestureEvent={onPanGestureEvent} 
        onEnded={()=>onPanFinished()}>
            <Animated.View  style={[styles.container,{transform:[{translateX:touchX},{translateY:touchY}]}/* ,{borderRadius:40,overflow:'hidden'} */]} >
                    <Animated.ScrollView  scrollEventThrottle={16} onScroll={
                            Animated.event(
                                [
                                {
                                    nativeEvent: {contentOffset: {y: commentContainerOffset}},
                                },
                                ],
                                {useNativeDriver: false},
                            )}  
                            style={{flex:1}} 
                            showsVerticalScrollIndicator={false} 
                            >
                            
                            
                            <TouchableWithoutFeedback onPress={collapseKeyBoard} >
                                <View style={{paddingLeft:10,paddingRight:10}}>
                                    <CommentHeader  collapse={collapse} item={item} />
                                </View>
                                {
                                <View style={styles.itemContent}>
                                                
                                        <MySwiper /* isJustify={true} */ data={item.postImage} style={styles.postImage} />
                                    
                                    <View style={{paddingLeft:5,paddingRight:5}} >
                                        <View style={{flexDirection:'row',paddingTop:5,paddingLeft:10}}>
                                            <AntDesign  name="like2" style={{fontSize:20,marginRight:20}} />
                                            <FontAwesome name="comment-o" style={{fontSize:20}} />
                                            
                                        </View>
                                        <Text style={{padding:10,paddingTop:12,paddingBottom:0,zIndex:0,fontWeight:'600'}}>
                                            {item.likeCount} 讚好
                                        </Text>
                                        <Text style={{padding:10,paddingTop:5,paddingBottom:0,zIndex:0,fontWeight:'600'}}>
                                            {item.userInfo[0].username}: {item.introduction}
                                        </Text>
                                        
                                        <Text style={{paddingTop:10,paddingLeft:10,color:"#CDCDCD",fontSize:12,zIndex:0}}>
                                            {calculateDate(item.postDate)}
                                        </Text>
                                    </View>
                                </View>
                                }
                                <View style={{width:screenSize.width,paddingLeft:10,paddingRight:20,height:1,marginBottom:20}}>
                                    <View style={{width:screenSize.width-40,height:1,backgroundColor:"#F4F4F4",}}/>
                                </View>
                            </TouchableWithoutFeedback>
                            <Animated.View 
                                    style={{
                                    width:screenSize.width,
                                    height:80,
                                    paddingTop:0,
                                    paddingBottom:10,
                                    
                                    justifyContent:'center',paddingLeft:70,
                                    backgroundColor:"#FFFFFF",
                                    position:'absolute',
                                    top:Animated.add(Animated.add((screenSize.height-80),commentContainerOffset),Animated.multiply(offset,-1)) ,
                                    zIndex:1
                                    }}>
                                
                                        {/* <Image 
                                        source={require('../../assets/icon.png')} 
                                        style={styles.userIcon}   /> */}
                                        <NonIdCachedImage
                                        uri={base_url+item.userInfo[0].icon}
                                        style={styles.userIcon}   />
                                        

                                        <TextInput 
                                        keyboardType={'twitter'}
                                        returnKeyType='send'
                                        onBlur={()=>collapseKeyBoard()}
                                        onTouchStart={()=>clickedKeyBoard()}
                                        onSubmitEditing={()=>submitMessage()}
                                        /* onKeyPress={()=>clickedKeyBoard()} */
                                        placeholder={"新增回應......"} 
                                        style={styles.input} 
                                        onChangeText={text => onChangeText(text)} value={value} 
                                        />
                                    
                                    
                            </Animated.View>
                            {
                                /* data!==undefined
                                && */
                                <MyFlatlist 
                                data={data} 
                                offset={offset}
                                collapseKeyBoard={collapseKeyBoard} 
                                />
                                
                            }

                            
                    </Animated.ScrollView>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default index

const styles = StyleSheet.create({
    itemContainer:{
        width:screenSize.width,
        flex:1,
        marginBottom:10
    },
    itemContent:{
        width:screenSize.width,
        borderRadius:20,
        flex:1,
        paddingTop:5,
        marginBottom:10
        
    },
    iconStyle:{
        width:40,
        height:40,
        borderRadius:30,
        zIndex:0
    },
    postImage:{
        width:screenSize.width,
        height:500,
        zIndex:4
    },
    container:{
        /* width:screenSize.width, */
        flex:1,
        backgroundColor:"#FFFFFF",
        padding:10,
        paddingTop:0,
        paddingLeft:0,
        paddingRight:0
    },
    icon:{
        width:35,
        height:35,
        borderRadius:20,
        position:'absolute',
        left:0
    },
    userIcon:{
        width:50,
        height:50,
        borderRadius:30,
        position:'absolute',
        left:10,
        bottom:20
    },
    input:{
        width:screenSize.width*0.73,
        padding:5,
        paddingLeft:10,
        height:40,
        borderRadius:10,
        backgroundColor:"#F4F4F4"
    }
})
