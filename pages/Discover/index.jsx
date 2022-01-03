import React, { Component, useRef, useEffect, useState, MutableRefObject } from 'react'
import { Text, View, StyleSheet, DeviceEventEmitter, Image, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import WebSocket from '../../webSocket'

import JustifyContentImage from '../../components/JustifyContentImage'
import { screenSize } from '../../util/screenSize'
import VerticalScrollableVideo from '../../components/VerticalScrollableVideo'
import PostItem from './PostItem'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { getAllUserPost, searchUser } from '../../api/api'
import { userStore, observer } from '../../mobx/store'
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
import { imageStore } from '../../mobx/lock'
import DiscoverHeader from '../../components/Header/Discover'
import MaskView from '../../components/MaskView'
import { LocalCacheManager } from '../../util/LocalCacheManager'
import { defaultShowMessage, getUserMainInfo } from '../../util/function'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AutoZIndexView from './AutoZIndexView'
import AutoSizeMaskView from './AutoSizeMaskView'
import DiscoverBottomSheet from '../../components/BottomSheet/DiscoverBottomSheet'
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



export default observer(({ navigation, onlyFlatList }) => {



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

    // 有信息?
    const isNewMessage = useRef(false)

    // 新信息
    const newMessageCount = useRef(0)

    /** @type {MutableRefObject<Array<Post>>} */
    const newMessageTemp = useRef([])

    /**
     *  @description 這里是給上拉加載的..
     */
    const bottomLockRef = useRef(false)

    // 首次檢查
    const firstTimeChecking = useRef(false)

    // 是否檢查
    const isAllCheckOut = useRef(false)

    // 已經獲取信息狀態
    const isGotData = useRef(false)

    // 沒有任何信息狀態...
    const [nothing, setNothing] = useState(false)


    const [isOpen, setIsOpen] = useState(false)



    const handleToggle = () => {
        if (!setting.current) {
            //console.log(scrollRef.current)
            setting.current = true
            scrollRef.current = !scrollRef.current
            //console.log(scrollRef.current)
            onScrollRef.current.setNativeProps({
                scrollEnabled: scrollRef.current
            })
            setTimeout(() => {
                setting.current = false
            }, 300)
        }
    }


    const checkOutNewPost = async () => {

        if (firstTimeChecking.current) {
            return
        }

        firstTimeChecking.current = true


        /** @type {{userInfo :import('../../util/LocalCacheManager').UserInfo}}   */
        const data = await getUserMainInfo()

        let res = await LocalCacheManager.getAllPost(data.userInfo.id)
        let localCount = ((res !== undefined) && (res !== null)) ? res.length : 0
        let allMessage = (await getAllUserPost(data.userInfo.id, 0, 1000)).data
        let allMessageCount = allMessage.length

        isNewMessage.current = localCount !== allMessageCount
        newMessageCount.current = Math.abs(localCount - allMessageCount)

        // 假如甚麼信息也沒有...
        if (localCount === 0 && allMessageCount === 0) {
            setIsShowEndHandler(() => true)
            setNothing(()=>true) 
            
            return 
        }
        console.log(allMessageCount , localCount)

        if (isNewMessage.current) {
            newMessageTemp.current = allMessage
        }
        isAllCheckOut.current = true


    }

    /**
     * @description 處理信息....
     * @param { Array<Post> } res 
     * @returns 
     */
    const processData = async (res) => {

        // 沒有更多了...
        if (res.length === 0) {
            //setIsShowEndHandler(()=>true)
            return
        }

        // 化成規格化data
        /** @type {Array<Post>} */
        let temp = res

        for (const index in temp) {
            let result = temp[index].postImage.charAt(",")
            if (result !== 0) {
                temp[index].postImage = temp[index].postImage.split(',')
                for (const i in temp[index].postImage) {
                    temp[index].postImage[i] = base_url + temp[index].postImage[i]
                }
            }
            temp[index].userInfo = (await searchUser(`id=${temp[index].userId}`)).data
        }

        return temp
    }


    /**
     * @description 獲取數據
     * @return null
     */
    const getData = async () => {
        if (!isAllCheckOut.current || isNewMessage.current === undefined  ) {
            return
        }


        console.log('getData----newMessageCount' , newMessageCount.current )
        if (isNewMessage.current === true) {

            // 有新POST
            let res
            if (newMessageCount.current > 5) {
                // 如果大於5則分開加載...
                res = newMessageTemp.current.slice(currentPage.current * 5, (currentPage.current + 1) * 5)
                currentPage.current++
                newMessageCount.current -= 5
                
            }
            else if (newMessageCount.current > 0) {
                // <= 5 但還有剩餘信息...
                res = newMessageTemp.current.slice(currentPage.current * 5, (currentPage.current + 1) * 5)

                //console.log(res);
                currentPage.current = 0
                newMessageCount.current = 0
                isNewMessage.current = false
            }


            let processedData = await processData(res)
            let temp = dataRef.current !== undefined ? [...dataRef.current, ...processedData] : [...processedData]
            
            // cache
            cachePost(processedData)

            // 更新....
            setData(() => [...temp])
            dataRef.current = temp

        } else if (isNewMessage.current === false) {

            /* console.log('in???') */
            // 沒有新消息 , 則訪問以後保存的緩存...
            let id
            if(userStore.userInfo!==undefined){
                id = userStore.userInfo.userInfo.id
            }else{
                id = (await getUserMainInfo()).userInfo.id
            }
            let posts =
                await
                    LocalCacheManager.
                        getThePostFromLocalByCurrentPage(id ,currentPage.current)
            console.log('currentPost.length',posts.length)
            if (posts === null && isAllCheckOut.current === true || posts.length === 0 && isAllCheckOut.current) {
                // 沒有更多post了...
                // undefined 表示完了...
                /* console.log('end') */
                isNewMessage.current = undefined
                setIsShowEndHandler(() => true)
                return
            }

            let temp = dataRef.current !== undefined ? [...dataRef.current, ...posts] : [...posts]
            currentPage.current++
            //console.log(temp)
            setData(() => [...temp])
            dataRef.current = temp
        }
        /* console.log(dataRef.current) */

    }

    

    const onReach = async () => {
        setIsShowLoader(() => true)
        getData()
    }

    const cachePost = async (data) => {

        await LocalCacheManager.savePostToLocal(data, userStore.userInfo.userInfo.id)
    }




    const onZooming = (scale, index) => {
        if (isSetTimeout.current === false && scale !== 0) {
            imageStore.setIndex(index)
            isSetTimeout.current = true
            onScrollRef.current.setNativeProps({
                scrollEnabled: false
            })
            setTimeout(() => {
                isSetTimeout.current = false
                onScrollRef.current.setNativeProps({
                    scrollEnabled: true
                })
            }, 100)
        }
    }

    /** @param {NativeSyntheticEvent<NativeScrollEvent>} event */
    const onScroll = async ( event ) => {
        const { nativeEvent } =  event
        const { contentOffset, contentSize, layoutMeasurement } = nativeEvent
        //console.log(contentSize.height)
        imageStore.setMaskViewHeight(contentSize.height)
        

        if(Platform.OS === 'ios'){
            if (contentSize.height - screenSize.height - contentOffset.y <= 0 && !bottomLockRef.current) {
                // lock
                bottomLockRef.current = true
    
                // console.log('reach');
                await onReach()
                setTimeout(() => {
                    bottomLockRef.current = false
                }, 1000)
    
            }
        }else{
            if (contentSize.height - screenSize.height - contentOffset.y <= 70 && !bottomLockRef.current) {
                // lock
                bottomLockRef.current = true
    
                // console.log('reach');
                await onReach()
                setTimeout(() => {
                    bottomLockRef.current = false
                }, 1000)
    
            }
        }

    }


    useEffect(() => {
        if (userStore.userInfo.userInfo !== undefined && !isGotData.current) {
            // 檢查有沒有新的POSt . . .. 
            // console.log('hi hi',userStore.userInfo.userInfo);
            (async () => {
                
                
                isGotData.current = true
                await checkOutNewPost()
                if(!nothing){
                    console.log('getData')
                    //console.log(await AsyncStorage.getAllKeys())
                    //console.log(await AsyncStorage.removeItem(`3Post`))
                    await getData()
                }
                

            })()

          
        }
    }, [JSON.stringify(userStore)])


    useEffect(() => {


        

        // 這個是用戶自己上傳的新post
        listener.current = DeviceEventEmitter.addListener('uploadPost', async function (obj) {
            if (uploading.current === false) {
                uploading.current = true
                let temp = [obj, ...dataRef.current]
                obj.userInfo = (await searchUser(`id=${obj.userId}`)).data
                for (const i in obj.postImage) {
                    obj.postImage[i] = base_url + obj.postImage[i]
                }

                setData(() => [obj, ...dataRef.current])
                console.log(obj)
                await LocalCacheManager.savePostToLocal([obj],userStore.userInfo.userInfo.id)
                dataRef.current = temp
                setTimeout(() => {
                    uploading.current = false
                }, 0)

            }
        })
        return () => {
            console.log(' discover page has removed ')
            listener.current.remove()
        }
    }, [])


    const isOpenBottomSheet = () =>{
        setIsOpen(()=>!isOpen)
    }


     /** 
     * @returns {JSX.Element} 
     * @description 底下顯示結束還是加載 
     */
      const BottomHandler = () => {


        if( nothing ){
            return (
                <View>
                    <View style={{ width: screenSize.width - 20, height: screenSize.height-150, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={require('../../assets/home.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <Text style={{ fontWeight: '500' }}>沒有更多信息了~</Text>
                    </View>
                </View>
    
            )
        }

        return (
            <View>
                {
                    isShowLoader === true && isShowEndHandler === false
                    &&
                    <View style={{ width: screenSize.width, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/giphy.gif')} style={{ width: 100, height: 50 }} />
                    </View>
                }
                {
                    isShowEndHandler === true
                    &&
                    <View  style={{ width: screenSize.width - 20, height: 200,paddingBottom:100, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={require('../../assets/home.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <Text style={{ fontWeight: '500' }}>沒有更多信息了~</Text>
                    </View>

                }
            </View>

        )
    }


    

    return (
        <ScrollView

            
            ref={c => onScrollRef.current = c}

            onScrollEndDrag={(event) => {
                isSetTimeout.current = false
            }}
            onScrollBeginDrag={(event) => {
                isSetTimeout.current = true
                event.nativeEvent.contentOffset.y >= lastY.current ?
                    DeviceEventEmitter.emit('collapseBottomTabBar') :
                    DeviceEventEmitter.emit('showBottomTabBar')

                lastY.current = event.nativeEvent.contentOffset.y
            }}

            style={{
                width: screenSize.width, height: screenSize.height,
                backgroundColor: "#FFFFFF", paddingBottom: 200
            }}

            stickyHeaderHiddenOnScroll={true}
            onScroll={onScroll}
            overScrollMode={'always'}
            scrollEventThrottle={0}
            nestedScrollEnabled={true}
            refreshControl={Platform.OS === 'android' ? null : <DownScrollLoading />}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
        >

            <DiscoverHeader navigation={navigation} />

            <ShortVideo navigation={navigation} />

            <DiscoverBottomSheet 
                isOpen={isOpen} 
                setIsOpen={isOpenBottomSheet}  
            />
            
            {
                data !== undefined
                &&
                <FlatList
                    refreshControl={Platform.OS === 'android' ? null : <DownScrollLoading />}
                    ListHeaderComponent={() => <>
                        
                        

                    </>}
                    CellRendererComponent={AutoZIndexView}
                    
                    data={data}
                    renderItem={
                        ({ item, index }) =>
                            <PostItem
                                setOpenBottomSheet={isOpenBottomSheet}
                                onZooming={onZooming}
                                zooming={zooming}
                                index={index}
                                navigation={navigation}
                                item={item}
                            />
                    }
                    keyExtractor={(item) => item.id.toString()}
                    style={{ flex: 1 }}

                    showsVerticalScrollIndicator={false}
                    overScrollMode={'never'}

                />
            }
            <BottomHandler />
            {
                (data == undefined && !isShowEndHandler  )
                &&
                <DiscoverSkeletonView />
            }
        </ScrollView>
    )

})

const styles = StyleSheet.create({
    shadowStyle: {
        /* shadowColor:"#FFFFFF",
        shadowOpacity:1,
        shadowOffset:{
            width:0,
            height:5
        },
        shadowRadius:0, */
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        marginBottom: 20
    },
    itemContainer: {
        width: screenSize.width - 20,
        flex: 1,
        marginBottom: 5,
    },
    itemContent: {
        width: screenSize.width - 20,
        borderRadius: 20,
        flex: 1,
        paddingTop: 20,

    },
    iconStyle: {
        width: 35,
        height: 35,
        borderRadius: 30,
        zIndex: 0
    },
    postImage: {
        width: screenSize.width,
        height: 500,
        zIndex: 4
    },
    shadowStylePostImage: {
        width: screenSize.width - 40,
        borderRadius: 10,
        height: 350,
        zIndex: 4
    },

    // skeleton UI

    textStyle: {
        width: 150,
        height: 20,
        borderRadius: 20
    }
})
