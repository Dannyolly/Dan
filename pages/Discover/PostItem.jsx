import React,{useRef,useState,useEffect,useLayoutEffect,Component} from 'react'
import { StyleSheet, Text, View ,Image,Animated, Vibration} from 'react-native'
import { screenSize } from '../../util/screenSize'

import CachedImage from '../../components/NonIdCachedImage'
import { AntDesign, Feather , FontAwesome} from '../../util/Icon'
import ZoomableImage from '../../components/ZoomableImage'
import { base_url } from '../../api/config'
import { userStore } from '../../mobx/store'
import PropTypes from 'prop-types';
import MySwiper from '../../components/MySwiper'
import { getAllCommentCount, searchUser } from '../../api/api'
import { calculateDate, defaultShowMessage, getUserMainInfo } from '../../util/function'
import {TapGestureHandler  } from 'react-native-gesture-handler'
import { addLike,cancelLike,likeCheck } from '../../api/api'
import SkeletonView from '../../components/SkeletonView'
import LikeAnimated from '../../components/LikeAnimated'
import { showMessage } from 'react-native-flash-message'
import { tapResponser ,messageResponser, selectionResponser} from '../../util/haptic'

import PostItemSkeletonView from '../../components/PostItemSkeletonView'

function PostItem({ item ,index , navigation,handleToggle ,isShadow, currentTopOffset }) {


    

    const [realItem, setItem] = useState(undefined)

    const correctFirstTime =useRef(false)


    const [showLike, setShowLike] = useState(false)


    const [liked, setLiked] = useState(false)
    
    const [commentCount, setCommentCount] = useState(false)

    const viewRef = useRef();

    // 測量圖片相對位置
    const initPosition = useRef({width:0,height:0,pageX:0,pageY:0})


    const [initLocation, setInitLocation] = useState(undefined)
    /**
     * @description 雙擊事件...
     */
    const doubleTapEvent = async ()=>{

        /* Vibration.vibrate([0,5],false); */
        tapResponser()
        /* selectionResponser() */
        /* messageResponser() */

        if(liked===false){
            setShowLike(()=>true)
            setLiked(()=>true)
            setTimeout(()=>{
                setShowLike(()=>false)
            },1000)
            realItem.likeCount+=1
            addLike(item.id,item.userId,realItem.likeCount).then(res=>{
            })
        }else{
            setLiked(()=>false)
            realItem.likeCount-=1
            cancelLike(item.id,item.userId,realItem.likeCount).then(res=>{
                defaultShowMessage("已取消")
            })
        }
    }


    /**
     * @description 修正一下屬性...
     */
    const correctItem=async ()=>{

        
        if(item.postImage[0].indexOf(0)==='h'){
            
            //console.log(item)
        }else{
            for (const index in item.postImage) {
            
            
                item.postImage[index]=base_url+item.postImage[index]
            }
            
            item.userInfo =  (await searchUser(`id=${item.userId}`)).data
            //console.log('111',item)
            //console.log('item',item)
            correctFirstTime.current=true
            //console.log(item)
            setTimeout(()=>{
                setItem(()=>item)
            },2000)
        }
        
        
    }


    /**
     * @description 檢查是否已點過讚...
     */
    const checkLike= async ()=>{
        
        const user = await getUserMainInfo()

        likeCheck(item.id,user.userInfo.id ).then(res=>{
            if(res.data!==undefined && res.data!==null && res.data!== '' && res.data.id!==0){       
                setLiked(()=>true)
            }
        })
        
        
    }

    const getData=()=>{
        getAllCommentCount(item.id).then(res=>{
            /* showMessage({
                message:JSON.stringify(res.data)
            }) */

            setCommentCount(()=>res.data)
        })
    }

    /**
     * @description 同步...
     */

    useEffect(() => {
        if(item!==undefined && correctFirstTime.current===false){
            /* correctItem() */
            setTimeout(()=>{
                setItem(()=>item)
            },2000)
        }
    }, [item])



  

    useEffect(() => {
        getData()
        checkLike()
        
    }, [])


    return (
        
            <View style={[styles.itemContainer,isShadow===true?styles.shadowStyle:{}]}>
                {
                realItem!==undefined
                &&
                <View style={[styles.itemContent,isShadow===true?{padding:10,borderRadius:20}:{}]}>
                    <View style={{flexDirection:'row',paddingLeft:10,marginBottom:5}}>
                       
                        <CachedImage style={styles.iconStyle}  uri={base_url+realItem.userInfo[0].icon} />
                        
                        {
                            
                            <Text style={{paddingLeft:10,lineHeight:40,fontWeight:'bold'}}>{realItem.userInfo[0].username}</Text>
                        }
                        <Feather name="more-horizontal" style={{position:'absolute',right:isShadow===true?0:-10,fontSize:24,lineHeight:40/* ,color:"#CDCDCD" */}} />
                    </View>                 
                        <View ref={c=>viewRef.current=c}  >
                            <MySwiper index={index} currentTopOffset={currentTopOffset}  isJustify={isShadow}  data={realItem.postImage} style={isShadow===true?styles.shadowStylePostImage:styles.postImage} doubleTapEvent={doubleTapEvent} />
                        </View>
                        
                        {/* LIke VIew */}
                        {
                        showLike===true
                        &&
                        <View style={{position:'absolute',width:screenSize.width,top:70,zIndex:999,height:400,backgroundColor:"transparent",justifyContent:'center',alignItems:'center'}} >
                            <LikeAnimated  />
                        </View>
                        }

                    <View style={{flexDirection:'row',paddingTop:15,paddingLeft:15,alignItems:"center"}}>
                        <AntDesign  name={liked?'heart':'hearto'} style={{fontSize:23,marginRight:20,color:liked?"#FF1C45":"black",fontWeight:'500'}} />
                        <FontAwesome name="comment-o" style={{fontSize:23,marginRight:20,fontWeight:'500'}} />
                        <Feather name="send" style={{fontSize:22,fontWeight:'500',paddingTop:3}} />
                        <Feather name="bookmark" style={{fontSize:23,fontWeight:'500',position:'absolute',right:-5,bottom:0}} />
                    </View>
                    <Text style={{padding:15,paddingTop:12,paddingBottom:0,zIndex:0,fontWeight:'600'}}>
                        {realItem.likeCount} 讚好
                    </Text>
                    <Text style={{padding:15,paddingTop:5,paddingBottom:0,zIndex:0,fontWeight:'600'}}>
                        {realItem.userInfo[0].username}: {realItem.introduction}
                    </Text>
                    <Text onPress={()=>navigation.navigate('comment',{
                        userId:userStore.userInfo.userInfo.id,
                        postId:realItem.id,
                        item:realItem
                    })} selectionColor="#FFFFFF" style={{padding:15,paddingTop:5,paddingBottom:5,color:"#CDCDCD",zIndex:0,fontWeight:'500'}}>
                        查看{commentCount}則留言
                    </Text>
                    <Text style={{paddingLeft:15,color:"#CDCDCD",fontSize:13,zIndex:0}}>
                        {calculateDate(realItem.postDate)}
                    </Text>
                </View>
                }

                
                {
                    realItem===undefined
                    &&
                    <PostItemSkeletonView/>
                }
                
                   
            
            
            </View>

    )
}


PostItem.prototype ={
    item : PropTypes.object.isRequired,
    index : PropTypes.number
}

export default PostItem

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
