import React, { Component ,useRef,useEffect,useState, MutableRefObject} from 'react'
import { Text, View ,StyleSheet,DeviceEventEmitter,Image, Animated , NativeSyntheticEvent,NativeScrollEvent} from 'react-native'
import WebSocket from '../../webSocket'

import JustifyContentImage from '../../components/JustifyContentImage'
import { screenSize } from '../../util/screenSize'
import VerticalScrollableVideo from '../../components/VerticalScrollableVideo'
import PostItem from './PostItem'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { getAllUserPost, searchUser } from '../../api/api'
import { userStore,observer } from '../../mobx/store'
import { uploadAsync } from 'expo-file-system'
import { showMessage } from 'react-native-flash-message'
import DownScrollLoading from '../../components/DownScrollLoading'
import Loading from '../../components/Loading'
import { Platform } from 'react-native'
import { base_url, post } from '../../api/config'
import SkeletonView from '../../components/SkeletonView'
import DiscoverSkeletonView from '../../components/DiscoverSkeletonView'
import ShortVideo from './ShortVideo'
import { useNavigation } from '@react-navigation/native'
import { imageStore } from '../../components/JustifyCenterImage/lock'
import DiscoverHeader from '../../components/Header/Discover'
import MaskView from '../../components/MaskView'
import { LocalCacheManager } from '../../util/LocalCacheManager'
import { getUserMainInfo } from '../../util/function'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * 此為處理後的 POST
 * @typedef Post
 * @property {number} id
 * @property {string} introduction
 * @property {number} likeCount
 * @property {Date} postDate
 * @property {Array<String>} postImage
 * @property {number} userId
 * @property {Array<UserInfo} userInfo
 */



export default observer(({ navigation, onlyFlatList })=> {

    

    // scrollRef
    const onScrollRef = useRef()

    // 這個是scroll變量
    const scrollRef = useRef(true)

    //這個是用來控制當移動時,限制scrollRef變化
    const setting = useRef(false)

    const [data, setData] = useState(undefined)

    const dataRef = useRef([])

    const uploading = useRef(false)

    const listener = useRef()

    const currentPage = useRef(0)

    const pageSize = 4

    const [isShowLoader, setIsShowLoader] = useState(false)

    const [isShowEndHandler, setIsShowEndHandler] = useState(false)

    const [zooming, setZooming] = useState(false)

    const isSetTimeout = useRef(false)

    const lastY = useRef(0)

    
    const isNewMessage = useRef(false)

    const newMessageCount  = useRef(0)

    /** @type {MutableRefObject<Array<Post>>} */
    const newMessageTemp = useRef([])

    /**
     *  @description 這里是給上拉加載的..
     */
    const bottomLockRef = useRef(false)
    
    const firstTimeChecking = useRef(false)

    const  isAllCheckOut = useRef(false)

    const handleToggle = ()=>{
        if(!setting.current){
            //console.log(scrollRef.current)
            setting.current=true
            scrollRef.current =!scrollRef.current
            //console.log(scrollRef.current)
            onScrollRef.current.setNativeProps({
                scrollEnabled:scrollRef.current
            })   
            setTimeout(()=>{
                setting.current=false
            },300)
        }
    }


    const checkOutNewPost = async () =>{

        if(firstTimeChecking.current){
            return
        }

        firstTimeChecking.current = true
        

        /** @type {{userInfo :import('../../util/LocalCacheManager').UserInfo}}   */
        const data = await getUserMainInfo()
        
        
        let res = await LocalCacheManager.getAllPost(data.userInfo.id)    
        
        let localCount = res!==undefined? res.length : 0
        
        let allMessage = (await getAllUserPost(data.userInfo.id, 0 , 1000) ).data
        let allMessageCount = allMessage.length
        
        isNewMessage.current = localCount !== allMessageCount
        newMessageCount.current  = Math.abs( localCount - allMessageCount )
        
        if(isNewMessage.current){
            newMessageTemp.current = allMessage 
        } 
        isAllCheckOut.current = true
        

    }

    /** @param { Array<Post> } res */
    const processData = async ( res ) =>{

            // 沒有更多了...
            if(res.length===0){
                //setIsShowEndHandler(()=>true)
                return 
            }
            
            // 化成規格化data
            /** @type {Array<Post>} */
            let temp = res

            for (const index in temp) {   
                let result = temp[index].postImage.charAt(",")
                if(result!==0){
                    temp[index].postImage = temp[index].postImage.split(',')
                    for (const i in temp[index].postImage) {
                        temp[index].postImage[i]= base_url+temp[index].postImage[i]
                    }
                }     
                temp[index].userInfo = (await searchUser(`id=${temp[index].userId}`)).data
            }
            
            return temp 
    }


    const getData=async (  )=>{
        if(!isAllCheckOut.current){
            return
        }

        /** @type {{userInfo :import('../../util/LocalCacheManager').UserInfo}}   */
        const data = await getUserMainInfo()

        /* console.log('getData' , newMessageCount.current ,firstTimeChecking.current , isNewMessage.current ) */
        if(isNewMessage.current === true){

              // 有新POST
            let res
            if(newMessageCount.current > 5){
                // 如果大於5則分開加載...
                res = newMessageTemp.current.slice(currentPage.current* 5 , (currentPage.current+1) * 5  )
                currentPage.current ++ 
                newMessageCount.current -= 5
                await cachePost(res)
            }
            else if(newMessageCount.current >0){
                // <= 5 但還有剩餘信息...
                res = newMessageTemp.current.slice(currentPage.current* 5 , (currentPage.current+1) * 5  )
                
                //console.log(res);
                currentPage.current = 0 
                newMessageCount.current = 0
                isNewMessage.current = false
            }

            
            let processedData  = await processData(res)
            let temp  = dataRef.current !==undefined ? [...dataRef.current, ...processedData] : [...processedData] 
            // 更新....
            setData(()=>[...temp]) 
            dataRef.current=temp

        }else if(isNewMessage.current===false){

            /* console.log('in???') */
            // 沒有新消息 , 則訪問以後保存的緩存...
            let posts = 
            await 
            LocalCacheManager.
            getThePostFromLocalByCurrentPage(data.userInfo.id, currentPage.current )
            console.log(posts.length, isAllCheckOut.current )
            if(posts===null && isAllCheckOut.current===true || posts.length===0 && isAllCheckOut.current ){
                // 沒有更多post了...
                // undefined 表示完了...
                /* console.log('end') */
                isNewMessage.current = undefined 
                setIsShowEndHandler(()=>true)
                return
            }

            let temp  = dataRef.current !==undefined ? [...dataRef.current, ...posts] : [...posts] 
            currentPage.current++
            setData(()=>[...temp])
            dataRef.current = temp
        } 
       /* console.log(dataRef.current) */

    }

    const BottomHandler=()=>{

        return(
                <View>
                    {
                        isShowLoader===true&&isShowEndHandler===false
                        &&
                        <View style={{width:screenSize.width,height:50,justifyContent:'center',alignItems:'center'}}>
                            <Image  source={require('../../assets/giphy.gif')} style={{width:100,height:50}} />
                        </View>
                    }
                    {
                        isShowEndHandler===true
                        &&
                        <View style={{width:screenSize.width-20,height:200,justifyContent:'center',alignItems:'center'}}>
                            
                            <Image source={require('../../assets/home.png')} style={{width:100,height:100,borderRadius:50}} />
                            <Text style={{fontWeight:'500'}}>沒有更多信息了~</Text>
                        </View>
                        
                    }
                </View>
            
        )
    }

    const onReach=async ()=>{
        setIsShowLoader(()=>true)
        getData()
    }

    const cachePost = async (data) =>{

        await LocalCacheManager.savePostToLocal( data, userStore.userInfo.userInfo.id )
    }

    useEffect(()=>{

       
        
        // 這個是用戶自己上傳的新post
        listener.current=DeviceEventEmitter.addListener('uploadPost',async function ( obj ){
            if(uploading.current===false){               
                uploading.current =true
                let temp = [obj,...dataRef.current]
                obj.userInfo = (await searchUser(`id=${obj.userId}`)).data
                for (const i in obj.postImage) {
                    obj.postImage[i]= base_url+obj.postImage[i]
                }
                
                setData(()=>[obj,...dataRef.current])
                dataRef.current = temp
                setTimeout(()=>{
                    uploading.current = false
                },5000)

            }
        })
        return ()=>{
            
            listener.current.remove()
        }
    },[])



    useEffect(() => {
        if(userStore.userInfo.userInfo!==undefined){
            // 檢查有沒有新的POSt . . .. 
           // console.log('hi hi',userStore.userInfo.userInfo);
           (async () => {
                await checkOutNewPost()
                await getData()
            })()
            
            //cachePost() 
        }
    }, [JSON.stringify(userStore)])
    

    

    const onZooming =(scale , index) =>{
        /* console.log('move ', scale) */
        if(isSetTimeout.current === false && scale !==0 ){
           /*  console.log('set',index) */
            imageStore.setIndex(index)
            /* imageStore.setIsZooming(true) */
            isSetTimeout.current = true
            onScrollRef.current.setNativeProps({
                scrollEnabled:false
            }) 
            setTimeout(()=>{
                isSetTimeout.current = false
                /* imageStore.setIsZooming(false) */
                onScrollRef.current.setNativeProps({
                    scrollEnabled:true
                }) 
               // console.log('can move !')
            },100)
        }
    }

    /** @param {{ nativeEvent : NativeSyntheticEvent<NativeScrollEvent>}} */
    const onScroll = async ({ nativeEvent }) => {
        const { contentOffset , contentSize,layoutMeasurement} = nativeEvent
        

        //console.log(contentOffset.y , contentSize.height-screenSize.height )
        // reach the end of scrollView 
        if(contentSize.height-screenSize.height-contentOffset.y<=0 && !bottomLockRef.current ){
            // lock
            bottomLockRef.current = true

            // console.log('reach');
            await onReach()
            setTimeout(()=>{
                bottomLockRef.current = false
            },1000)

        }

    }

   /*  const onScrollBeginDrag = () =>{
        isSetTimeout.current = true 
        console.log('start to collapse')
        DeviceEventEmitter.emit('collapseBottomTabBar')
    } */

    return (  
        <ScrollView 
        
        refreshControl={ Platform.OS==='android'? null:<DownScrollLoading   /> }
        ref={c=>onScrollRef.current=c} 
        /* nestedScrollEnabled={false} */
        onScrollEndDrag={(event)=>{
            isSetTimeout.current = false
        }}
        onScrollBeginDrag={(event)=>{
            isSetTimeout.current = true
            event.nativeEvent.contentOffset.y >= lastY.current?
                    DeviceEventEmitter.emit('collapseBottomTabBar') :
                    DeviceEventEmitter.emit('showBottomTabBar')

            lastY.current = event.nativeEvent.contentOffset.y
        }}
        /* canCancelContentTouches={false} */
        style={{width:screenSize.width,height:screenSize.height,
        backgroundColor:"#FFFFFF",paddingBottom:0}}
        /* stickyHeaderIndices={[0]} */
        stickyHeaderHiddenOnScroll={true}
        onScroll={onScroll}
        
        scrollEventThrottle={0}
        >
        
        <DiscoverHeader  navigation={navigation} />
            
            
            
            {
                data!==undefined
                &&
                <FlatList
                /* stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll */
                
                /* invertStickyHeaders */
                /* scrollEnabled={!zooming} */
                
                ListHeaderComponent={()=><> 
                    
                    <ShortVideo  navigation={navigation}  />
                    {/* <MaskView  
                        visible={true} 
                        opacity={0.7} 
                        zIndex={10050}
                        color='black'
                        height={100000}
                    /> */}
                  </>}
                /* ListFooterComponent={()=><BottomHandler/>} */
                /* onEndReached={onReach}
                onEndReachedThreshold={0} */
                /* canCancelContentTouches={false} */
                /* nestedScrollEnabled={false} */
                data={data}
                renderItem={
                    ({ item,index })=>
                        <PostItem 
                            onZooming =  {onZooming}
                            zooming = {zooming}
                            index ={index}
                            uploading={uploading}
                            navigation={navigation} 
                            item={item}
                            handleToggle={handleToggle} 
                        />
                }
                keyExtractor={(item)=>item.id.toString()}
                style={{flex:1}} 
                
                showsVerticalScrollIndicator={false} 
                overScrollMode={'never'}
                
                />
            }
            <BottomHandler/>
            {
                data==undefined
                &&
                <DiscoverSkeletonView/>
            }     
        </ScrollView>
    )
    
})

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
