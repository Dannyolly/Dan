import React ,{useState,useEffect, useRef }from 'react'
import { View, 
    Text ,
    StyleSheet,
    Image, 
    Modal, 
    Keyboard,
    Animated,
    ScrollView,
    TextInput, 
    TouchableHighlight, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    DeviceEventEmitter
} from 'react-native'


import { AntDesign,Entypo,Ionicons,Feather, MaterialIcons } from '../../util/Icon'
import { screenSize } from '../../util/screenSize'

import { base_url } from '../../api/config'

import {
    addRequest, searchUser,
    
}from '../../api/api'

import AsyncStorage from '@react-native-async-storage/async-storage'

import CachedImage from '../../components/CachedImage'
import Zoomable from '../../components/ZoomableImage'
import NonIdCacheImage from '../../components/NonIdCachedImage'
import Discover from '../Discover'
import { getAllUserPost ,getAllUserOwnPost } from '../../api/api'
import PostItem from '../Discover/PostItem'
import PostItemMiniStyle from '../../components/PostItemMiniStyle'
import { showMessage } from 'react-native-flash-message'
import PostItemSkeletonView from '../../components/PostItemSkeletonView'
import DeltaHeader from '../../components/Header/Discover'

import {observer, userStore } from '../../mobx/store'

import BottomSheet from '../../components/BottomSheet/BackgroundImage'

import { messageResponser, selectionResponser, tapResponser } from '../../util/haptic'
import { defaultShowMessage } from '../../util/function'
export default observer(({ route, navigation })=>{

    const [requestMessage, setRequestMessage] = useState(undefined)

    const [isShowMessageBOx, setIsShowMessageBOx] = useState(false)

    const [ value, onChangeText] = useState();

    const { item ,isFriend , self } =  route.params

    const [send ,setIsSend] = useState(false)

    // scrollRef
    const onScrollRef = useRef()

    // 這個是scroll變量
    const scrollRef = useRef(true)

    //這個是用來控制當移動時,限制scrollRef變化
    const setting = useRef(false)

    // FlatList dependant
    const currentPage = useRef(0)

    const pageSize = 6

    const [data, setData] = useState(undefined)

    const zoomOffset = useRef(new Animated.Value(0)).current;

    const [currentTopOffset, setCurrentTopOffset] = useState(0)

    // 限制刷新
    const [settingTime, setSettingTime] = useState(false) 

    // 底下Loader
    const [isShowLoader, setIsShowLoader] = useState(false)

    const [isShowEndHandler, setIsShowEndHandler] = useState(false)

    const currentMaxHeight = useRef(new Animated.Value(0)).current

    const loading = useRef(false)

    // false 為左  true 為右
    const [showStyle, setShowStyle] = useState(false)
    
    const swipeOffset = useRef(new Animated.Value(0)).current

    const [isChangeBackgroundImage, setIsChangeBackgroundImage] = useState(false)

    const [backgroundImage, setBackgroundImage] = useState()

   /*  const handleToggle = ()=>{
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
    } */

    const addFdRequest = async ()=>{
        let jsonRes = await AsyncStorage.getItem('userInfo')
        let res =JSON.parse(jsonRes)
        addRequest(res.userInfo.id,item.id,value)  
        defaultShowMessage({
            message:'已提交好友請求'
        })

    }

    const getData=( isAdd )=>{
        
        getAllUserOwnPost(item.id,currentPage.current*pageSize,pageSize).then(async res=>{
         
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

                    
                }
                for (const i in temp[index].postImage){
                    temp[index].postImage[i] = base_url + temp[index].postImage[i]
                }
                temp[index].userInfo = (await searchUser(`id=${temp[index].userId}`)).data
                    
                //console.log('?',temp[index])
            }


            if(isAdd===true){
                setData(()=>[...data,...temp])

                // 重新放行
                loading.current=false
            }else {
                setData(()=>temp)
            }

            dataRef.current=temp     
        }).catch(err=>{
            console.log(err)
        })


        

    }


    const findOutBackgroundImage= async ()=>{
       let res =await AsyncStorage.getItem('backgroundImage')
       console.log('res',res)
       if(self){
           setBackgroundImage(()=>res)
       }else{
          let {data} = await searchUser(`id=${item.id}`)

          //console.log(data[0])
          if(data[0].backgroundImage==null){
              
          }else{
              setBackgroundImage(()=>base_url+data[0].backgroundImage)
          }
       }
    }


    const onScroll=(event)=>{
         //console.log(zoomOffset.__getValue())
        /* console.log('bottom',Animated.subtract(currentMaxHeight,screenSize.height+20))  */
        
       // console.log(currentMaxHeight.__getValue()-(screenSize.height-40),zoomOffset,loading.current,currentPage.current)

        if(currentMaxHeight.__getValue()-(screenSize.height-60)<zoomOffset.__getValue() && loading.current===false ){
            console.log('bottom');
            loading.current=true
            /* showMessage({
                message:'bottom',
                description:(currentPage.current+1).toString()
            }) */
            setIsShowLoader(()=>true)
            currentPage.current+=1
            getData(true)
            
        }

        if(settingTime!==true){
            /* setSettingTime(()=>true) */
            /* setCurrentTopOffset(()=>zoomOffset) */
            userStore.setCurrentTopOffset(zoomOffset)
            //console.log(zoomOffset)
            /* setTimeout(()=>{
                setSettingTime(()=>false)
            },100) */
        }
            
        
    }

    const changeShowStyle=()=>{
        selectionResponser()
        /* messageResponser() */
        setShowStyle(()=>!showStyle)
        if(showStyle===false){
            Animated.spring(swipeOffset,{
                toValue:(screenSize.width-20)/2,
                useNativeDriver:false
            }).start()
        }else{
            Animated.spring(swipeOffset,{
                toValue:0,
                useNativeDriver:false
            }).start()
        }

    }

    const changeBackgroundImage = ()=>{
        
        setIsChangeBackgroundImage(()=>!isChangeBackgroundImage)
    }


    useEffect(() => {
        
        getData()
        findOutBackgroundImage()
        DeviceEventEmitter.addListener('calculateRelativeLocation',()=>{
            setCurrentTopOffset(()=>zoomOffset)
        })


        
    }, [])


    return (
        <View  style={styles.container}>

            <Animated.ScrollView 
            style={{flex:1}}
            ref={c=>onScrollRef.current=c}
            overScrollMode={'always'}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: {
                    contentOffset: {
                       y: zoomOffset,
                    },
                    contentSize:{
                       height:currentMaxHeight
                    }
                     
                   }
                 }],
                 {useNativeDriver:false,listener:event=>onScroll(event)}
                 
              )}
            showsVerticalScrollIndicator={false} 
            style={{width:screenSize.width,height:screenSize.height}}
            >
                <BottomSheet  isOpen={isChangeBackgroundImage} setIsOpen={changeBackgroundImage} setBackgroundImage={image=>setBackgroundImage(image)}  />

                <TouchableWithoutFeedback onPress={()=>{
                    tapResponser()
                    changeBackgroundImage()}}
                    >
                    <Animated.View
                    
                    style={{    
                                
                                width:screenSize.width,marginBottom:20,
                                height:screenSize.height*0.38,alignItems:'center',
                                transform:[{
                                    translateY:Animated.divide(Animated.add(zoomOffset,-20),1)
                                }]
                            }}>
                            <Animated.Image source={{
                                uri:backgroundImage
                            }} 
                            style={{width:screenSize.width,
                                height:Animated.add(Animated.multiply(zoomOffset,-1.2),screenSize.height*0.36)
                            }} 
                            
                            />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback  style={{padding:20,top:screenSize.height*0.27,height:300,backgroundColor:"#FFFFFF",position:'absolute',width:screenSize.width,borderRadius:20}} >
                    <Animated.View style={{padding:20,paddingBottom:0,top:Animated.add(screenSize.height*0.27,0),height:280,backgroundColor:"#F4F4F4",position:'absolute',width:screenSize.width,borderRadius:20}}>

                        <View style={{width:screenSize.width,alignItems:"center",position:'absolute',top:-60}}> 
                            {/* <CachedImage
                                uri={base_url+item.icon}
                                id={item.id || item.senderId}
                                style={{width:120,height:120,borderRadius:60,marginRight:10}}
                            /> */}
                            <NonIdCacheImage 
                            
                                uri={self?base_url+userStore.userInfo.userInfo.icon:base_url+item.icon}
                                style={{width:120,height:120,borderRadius:60,marginRight:10}}
                            />
                            <Text style={{fontSize:20,fontWeight:'500',color:'#28C1FD'}}>{item.username}</Text>
                            <Text style={{color:"#CDCDCD"}}>簡介:{item.introduction}</Text>
                            
                        </View>  
                        
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View style={{flexDirection:'row',position:'absolute',top:270,right:20}}>
                    {
                        isFriend===false
                        &&
                        <View onTouchStart={()=>{
                            addFdRequest()
                        }} style={{backgroundColor:'#21CFFF',width:50,height:50,borderRadius:25,justifyContent:"center",alignItems:"center",marginRight:10}}>
                            <AntDesign name="adduser" size={24} style={{color:"#FFFFFF"}} />
                        </View>
                    }
                    {
                        self===false?
                        
                        <View onTouchStart={()=>navigation.navigate('Message',{
                            item:item
                        })}  style={{backgroundColor:'#21CFFF',width:50,height:50,borderRadius:25,justifyContent:"center",alignItems:"center"}}>
                            <AntDesign name="message1" size={24} style={{color:"#FFFFFF"}} />
                        </View>
                        :
                        <TouchableWithoutFeedback  style={{backgroundColor:'#21CFFF',width:50,height:50,borderRadius:25,justifyContent:"center",alignItems:"center",marginRight:10}}
                            onPress={()=>{
                                console.log('hello?');
                                navigation.navigate('individual')
                            }}>
                            <View style={{backgroundColor:'#21CFFF',width:50,height:50,borderRadius:25,justifyContent:"center",alignItems:"center"}} >
                            
                                <AntDesign name="setting" size={24} style={{color:"#FFFFFF"}} />
                            </View>
                        </TouchableWithoutFeedback  >
                    }
                </Animated.View>
                
                {/* 改變展示形狀... */}
                <View style={{paddingLeft:10,paddingRight:10}}>
                    <View style={{width:screenSize.width-20,height:50,borderRadius:40,backgroundColor:"#FFFFFF",flexDirection:'row'}} >
                        <Animated.View 
                        
                        style={{
                            position:'absolute',
                            left:swipeOffset,
                            backgroundColor:"#21CFFF",
                            borderRadius:40,
                            width:(screenSize.width-20)/2,
                            height:50
                        }}  
                        />
                        <View onTouchEnd={()=>changeShowStyle()} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <MaterialIcons name="article" style={{fontSize:24,color:showStyle===false?"#FFFFFF":'#CDCDCD'}}  />
                        </View>

                        <View onTouchEnd={()=>changeShowStyle()} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Entypo name="grid" style={{fontSize:24,color:showStyle===true?"#FFFFFF":'#CDCDCD'}}  />
                        </View>
                        
                    </View>
                </View>
                
                {/* ... */}
                
                <View style={{padding:10,display:showStyle===false?'flex':'none' }}>
                    {
                        data!==undefined
                        &&
                        <FlatList
                        key={"1"}
                        data={data}
                        renderItem={
                            ({item,index})=>
                            <PostItem  
                                currentTopOffset={currentTopOffset} 
                                index={index} 
                                item={item} 
                                isShadow={true} 
                                navigation={navigation}
                            />}
                        showsVerticalScrollIndicator={false} 
                        overScrollMode={'always'}
                        keyExtractor={(item,index)=>item.id.toString()}
                        
                        />
                    }
                    {
                        data===undefined
                        &&
                        <PostItemSkeletonView  deltaSize={true} />
                    }
                </View>
                <View style={{display:showStyle===false?'none':'flex',paddingTop:10,padding:0,paddingRight:0,flexDirection:'row',flexWrap:'wrap'}}>
                    {
                        data!==undefined
                        &&
                        <FlatList
                        key={"2"}
                        data={data}
                        numColumns={3}
                        renderItem={
                            ({item,index})=>
                            <PostItemMiniStyle 
                                index={index} 
                                item={item} 
                                navigation={navigation}
                            />}
                        showsVerticalScrollIndicator={false} 
                        overScrollMode={'always'}
                        keyExtractor={(item,index)=>item.id.toString()}
                        
                        />
                    }
                </View>
                
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
                        <View style={{width:screenSize.width-20,height:100,justifyContent:'center',alignItems:'center'}}>
                            
                            {/* <Image source={require('../../assets/home.png')} style={{width:100,height:100,borderRadius:50}} />
                            <Text style={{fontWeight:'500'}}>沒有更多信息了~</Text> */}
                        </View>
                        
                    }
                </View>

                
            </Animated.ScrollView >   
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        backgroundColor:'#F4F4F4',
        height:screenSize.height,
    },
    otherSetting:{
        height:50,
        paddingLeft:15,
        paddingTop:10
    },
    friend:{
        height:100
    }
})
