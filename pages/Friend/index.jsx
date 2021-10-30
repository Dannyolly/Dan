import React, { Component, useEffect,useCallback, useRef, useState ,memo} from 'react'
import { Text, View ,StyleSheet, Animated, Modal,TextInput ,} from 'react-native'
import { screenSize } from '../../util/screenSize'
import { AntDesign ,SimpleLineIcons} from '../../util/Icon'
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FriendList from '../../components/FriendList'

import { userStore,observer } from '../../mobx/store'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { DeviceEventEmitter } from 'react-native'
import { messageResponser, selectionResponser } from '../../util/haptic'
import FriendHeader from '../../components/Header/FriendHeader'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import { Keyboard } from 'react-native'
export default observer(()=>{

    const navigation = useNavigation()

    const textBoxTopOffset = useRef(new Animated.Value(0)).current

    const headerTopOffset = useRef(new Animated.Value(0)).current


    const [onTop, setOnTop] = useState(false)

    const opacity = useRef(new Animated.Value(0)).current

    const [clicked, setClicked] = useState(false)

    const width = useRef(new Animated.Value(screenSize.width*0.9)).current

    


    const [focus, setFocus] = useState(false)

    const showSearchBar =  () =>{
        if(clicked){
            
            Animated.timing(opacity,{
                toValue:1,
                duration:375,
                useNativeDriver:false
            }).start()
    
            Animated.timing(textBoxTopOffset,{
                toValue:-100,
                duration:300,
                useNativeDriver:false
            }).start()

            Animated.timing(headerTopOffset,{
                delay:75,
                toValue:-100,
                duration:500,
                useNativeDriver:false
            }).start()

            Animated.timing(width,{
                toValue:screenSize.width*0.8,
                duration:375,
                useNativeDriver:false
            }).start()
            setOnTop(()=>true)
            
        }
    }

    const collapseSearchBar = ()=>{
        Keyboard.dismiss()
        Animated.timing(opacity,{
            toValue:0,
            duration:375,
            useNativeDriver:false
        }).start()

        Animated.timing(textBoxTopOffset,{
            toValue:0,
            duration:375,
            delay:75,
            useNativeDriver:false
        }).start()
        
        Animated.timing(headerTopOffset,{
            toValue:0,
            duration:375,
            useNativeDriver:false
        }).start()

        Animated.timing(width,{
            toValue:screenSize.width*0.9,
            duration:375,
            useNativeDriver:false
        }).start()

        
        setTimeout(()=>{
            setClicked(()=>false)
        },400)
    }

    const MyTextInput = () =>{

        const [value, onChangeText] = React.useState('');

        return(
            <TextInput
                autoFocus
                editable 
                style={{
                    marginRight:20,
                    paddingLeft:40,
                    alignItems:'center',
                    height:35,
                    width:screenSize.width,
                    borderRadius:50,
                    backgroundColor:"#F4F4F4",
                    marginBottom:10}} 
                onChangeText={onChangeText} 
                value={value} 
                />
        )
    }

    

    useEffect(() => {
        if(clicked ){
            showSearchBar()
            
        }
    }, [clicked])

    useFocusEffect(
        useCallback(() => {
            // 刷新好友是否上線
        selectionResponser()
        DeviceEventEmitter.emit('checkOutOnlineState')
          
          
        }, [])
    )
    

    return (
        
        <View style={styles.container}>
            <Modal transparent={true} visible={clicked}  >
                <TouchableWithoutFeedback style={{width:screenSize.width,height:screenSize.height}} onPress={()=>Keyboard.dismiss()}>
                    <Animated.View style={{backgroundColor:"#FFFFFF",/* opacity:opacity, */width:screenSize.width,height:screenSize.height,position:'absolute',top:0,left:0}}  />
                    <Animated.View style={{transform:[{translateY:headerTopOffset}]}} >
                        <FriendHeader navigation={navigation} />
                    </Animated.View>

                    <Animated.View style={[styles.onlineContainer,{transform:[{translateY:Animated.divide(textBoxTopOffset,2)}]}]}>
                            <Animated.View style={{height:35,width:width,overflow:'hidden',borderRadius:80,marginRight:10}}>
                                <MyTextInput />
                            </Animated.View>
                            
                            <AntDesign  name="search1" size={18} style={{color:"#CDCDCD",position:'absolute',left:40,top:25}} />
                            {/* <Text style={{color:"#CDCDCD"}}>Search By name or nickName</Text> */}
                        <TouchableWithoutFeedback onPress={()=>collapseSearchBar()}>
                            <Text style={{fontSize:16,color:"#3672CF",paddingBottom:15}} >取消</Text>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>


            <ScrollView  /* stickyHeaderIndices={[0]} */ >   
                <Animated.View style={{opacity:clicked?0:1}} >
                    <FriendHeader navigation={navigation} />
                </Animated.View>
                <View style={styles.onlineContainer} onTouchStart={()=>setClicked(()=>true)}>
                    <View style={{paddingLeft:20,alignItems:'center',flexDirection:'row',width:screenSize.width*0.9,height:35,borderRadius:50,backgroundColor:"#F4F4F4",marginBottom:10}}>
                        <AntDesign  name="search1" size={18} style={{color:"#CDCDCD"}} />
                        <Text style={{color:"#CDCDCD"}}>Search By name or nickName</Text>
                    </View>
                </View>

                <FriendList />

            </ScrollView>
        </View>
        
    )
})

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFFFFF",
        height:screenSize.height,
    },
    search:{
        width:screenSize.width-20,
        height:30,
        borderRadius:20,
        backgroundColor:"#F7F5F8",
        flexDirection:'row',
        justifyContent:'center'
    },
    onlineContainer:{
        paddingTop:30,
        marginBottom:20,
        width:screenSize.width,
        height:40,
        alignItems:"center",
        flexDirection:'row',
        paddingLeft:20
    },
    
})