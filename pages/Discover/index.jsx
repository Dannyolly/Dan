import React, { Component ,useRef,useEffect,useState} from 'react'
import { Text, View ,StyleSheet,DeviceEventEmitter,Image} from 'react-native'
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
import { base_url } from '../../api/config'
import SkeletonView from '../../components/SkeletonView'
import PostItemSkeletonView from '../../components/PostItemSkeletonView'
import ShortVideo from './ShortVideo'
import { useNavigation } from '@react-navigation/native'
/**
 * 
 * @param {Boolean} props.onlyFlatList 
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


    const getData=( isAdd )=>{
       // console.log(userStore.userInfo.userInfo.id);
        getAllUserPost(userStore.userInfo.userInfo.id,currentPage.current*pageSize,pageSize).then(async res=>{
         
            // 沒有更多了...
            if(res.data.length===0){
                setIsShowEndHandler(()=>true)
                return 
            }

            // 化成規格化data
            let temp = res.data
            for (const index in temp) {   
                let result = temp[index].postImage.charAt(",")
                if(result!==0){
                    temp[index].postImage = temp[index].postImage.split(',')
                    for (const i in temp[index].postImage) {
                        temp[index].postImage[i]= base_url+temp[index].postImage[i]
                    }
                }     

                
                temp[index].userInfo = (await searchUser(`id=${temp[index].userId}`)).data
                //console.log(temp[index])
            }

            if(isAdd===true){
                setData(()=>[...data,...temp])
            }else {
                setData(()=>temp)
            }

            dataRef.current=temp
        }).catch(err=>{
            console.log(err)
        })

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

    const onReach=()=>{
        setIsShowLoader(()=>true)
        currentPage.current+=1
        getData(true)
    }

    useEffect(() => {
        if(userStore.userInfo.userInfo!==undefined){
            getData(false)
        }
    }, [JSON.stringify(userStore)])
    

    useEffect(()=>{
        // 這個是用戶自己上傳的新post
        listener.current=DeviceEventEmitter.addListener('uploadPost',function ( obj ){
            if(uploading.current===false){               
                uploading.current =true
                let temp = [obj,...dataRef.current]
                //console.log('????again',[obj])
                setData(()=>[obj,...dataRef.current])
                setTimeout(()=>{
                    uploading.current = false
                },5000)

            }
        })
        return ()=>{
            
            listener.current.remove()
        }
    },[])


    const onZooming =(scale) =>{
        //console.log('move ', scale)
        if(zooming===false && isSetTimeout.current === false && scale !==1 ){
            //console.log('set')
            isSetTimeout.current = true
            onScrollRef.current.setNativeProps({
                scrollEnabled:!isSetTimeout.current
            }) 
            setTimeout(()=>{
                isSetTimeout.current = false
                onScrollRef.current.setNativeProps({
                    scrollEnabled:!isSetTimeout.current
                }) 
               // console.log('can move !')
            },100)
        }
    }

    return (  
        <View  style={{width:screenSize.width,height:screenSize.height-150,backgroundColor:"#FFFFFF",paddingBottom:0}}>
            
            {
                data!==undefined
                &&
                <FlatList
                onScrollBeginDrag={()=>isSetTimeout.current = true }
                onScrollEndDrag={()=>isSetTimeout.current = false }
                scrollEnabled={!zooming}
                ListHeaderComponent={()=><ShortVideo  navigation={navigation}  />}
                ListFooterComponent={()=><BottomHandler/>}
                onEndReached={onReach}
                onEndReachedThreshold={0}
                canCancelContentTouches={false}
                refreshControl={ Platform.OS==='android'? null:<DownScrollLoading   /> }
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
                ref={c=>onScrollRef.current=c} 
                showsVerticalScrollIndicator={false} 
                overScrollMode={'always'}
                
                />
            }

            {
                data===undefined
                &&
                <PostItemSkeletonView />
            }     
        </View>
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
