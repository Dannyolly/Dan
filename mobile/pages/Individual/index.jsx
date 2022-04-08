import React, { Component } from 'react'
import { DeviceEventEmitter,Text, View ,StyleSheet,ScrollView,TouchableOpacity,TouchableHighlight, Modal, TextInput, Animated} from 'react-native'
import { screenSize } from '../../util/screenSize'
import Header from './Header'
import { LinearGradient } from 'expo-linear-gradient';
import {
    AntDesign, FontAwesome5,Feather,FontAwesome,MaterialIcons
} from '../../util/Icon'

import BottomSheet from '../../components/BottomSheet/LogOutBottomSheet'

import Loading from '../../components/Loading'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { userStore } from '../../mobx/store';
import { defaultShowMessage, getUserMainInfo, objTOParams, setUserMainInfo } from '../../util/function';
import FlashMessage from "react-native-flash-message";
import { searchUser, updateUserInfo } from '../../api/api';

export default class index extends Component {

    settings=['名字','性別','DAN號','我的二維碼','黑白模式','簡介','隱私','收藏','登出']


    keys = ['username','cid','introduction']

    state={
        isLogOut:false,
        isLoading:false,
        value:"",
        setting:false,
        scale:new Animated.Value(0.8),
        opacity:new Animated.Value(0),
        userInfo:undefined,
        currentKey:'username'
    }

    

    logOut = ()=>{
        
        this.setState({
            isLogOut:true
        })
        
    } 


    


    openSetting=()=>{
        //console.log('.....',this.state.opacity.__getValue())
        this.setState({setting:true},()=>{
            Animated.timing(this.state.opacity,{
                toValue:0.4,
                duration:200,
                /* useNativeDriver:true */
            }).start()
            
            Animated.spring(this.state.scale,{
                toValue:1,
                speed:8,
                /* useNativeDriver:true */
            }).start()
        })
    }

    closeSetting=()=>{
        
        Animated.spring(this.state.scale,{
            toValue:0.8,
            speed:8,
            useNativeDriver:false
        }).start()

        Animated.timing(this.state.opacity,{
            toValue:0,
            duration:100,
            useNativeDriver:false
        }).start()


        setTimeout(()=>{
            this.setState({setting:false})
        },100)
        
    }


    settingInfo = async () =>{
        let obj = {...this.state.userInfo}.userInfo
        obj[this.state.currentKey] = this.state.value
        let str = objTOParams(obj)

        await updateUserInfo(str)

        await setUserMainInfo(JSON.stringify({userInfo:obj}))
        
        userStore.setUserInfo({userInfo:obj})

        this.getData()
        
    }

    getData= async ()=>{
        let userInfo = await getUserMainInfo()
        this.setState({userInfo})
    }

    componentDidMount(){
        this.getData()
        DeviceEventEmitter.addListener('loadingIcon',()=>{
            this.setState({
                isLoading:true
            },()=>{
                setTimeout(()=>{
                    this.setState({isLoading:false})
                },3000)
            })
        })

        
    }


    render() {
        console.log(this.props)
        return (
            this.state.userInfo!==undefined
            &&
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} 
                style={{width:screenSize.width,height:screenSize.height}}>
                    <View style={{height:360,width:screenSize.width,position:'absolute',top:-180,paddingTop:180}}>
                        <LinearGradient 
                        locations={[0.1,0.5,1]}
                        colors={['#4399FE','#28C1FD','#21CFFF']}
                        style={{width:screenSize.width,zIndex:0,marginBottom:20,
                            borderBottomLeftRadius:10,borderBottomRightRadius:10}}
                        >
                            <Header />
                        </LinearGradient>
                    </View>
                    <View  style={{marginBottom:185}} />

                    <TouchableOpacity 
                    onPress={()=>{
                        this.openSetting()
                        
                        this.setState({currentKey:this.keys[0]})
                    }}
                    style={styles.settingContainer} 
                        activeOpacity={1}>
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <AntDesign
                                    name="user" 
                                    size={20}
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}} />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[0]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                
                                <Text style={{fontSize:15,lineHeight:58,marginRight:8}}>{userStore.userInfo.userInfo.username}</Text>
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>


                    
                    <TouchableOpacity onPress={()=>{
                        this.openSetting()
                    }}
                    style={styles.settingContainer} 
                        activeOpacity={0.7}>
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <FontAwesome5
                                    name="transgender" 
                                    size={20}
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}} />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[1]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                
                                <Text style={{fontSize:15,lineHeight:58,marginRight:8}}>男</Text>
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        this.openSetting()
                        this.setState({currentKey:this.keys[1]})
                    }}
                    style={styles.settingContainer} 
                        activeOpacity={0.7}>
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <AntDesign
                                    name="idcard" 
                                    size={20}
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}} />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[2]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                
                                <Text style={{fontSize:15,lineHeight:58,marginRight:8}}>{this.state.userInfo.userInfo.cid || ""}</Text>
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate('OwnQRcode')}
                    style={styles.settingContainer} 
                        activeOpacity={0.7}>
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <AntDesign
                                    name="qrcode" 
                                    size={20}
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}} />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[3]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    
                    style={styles.settingContainer} 
                        activeOpacity={0.7}>
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <Feather
                                    name="moon" 
                                    size={20}
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}} />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[4]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>{
                        this.openSetting()
                        this.setState({currentKey:this.keys[2]})
                    }}
                    style={styles.settingContainer} 
                        activeOpacity={0.7}>
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <AntDesign
                                    name="qrcode" 
                                    size={20}
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}} />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[5]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                <Text numberOfLines={1} style={{width:200,textAlign:'right',fontSize:15,lineHeight:58,marginRight:8}}>{this.state.userInfo.userInfo.introduction}</Text>
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    
                    style={styles.settingContainer} 
                        activeOpacity={0.7}>
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <MaterialIcons
                                    name="privacy-tip" 
                                    size={20}
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}} />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[6]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>{
                        this.props.navigation.push('collection')
                    }}
                    style={styles.settingContainer} 
                        activeOpacity={0.7}>
                        
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <MaterialIcons name={'collections'}  
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}}  />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[7]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={this.logOut}
                    style={styles.settingContainer} 
                        activeOpacity={0.7}>
                        
                        <View style={styles.settingRealContainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.fontIconContainerStyle}>
                                    <AntDesign name={'logout'}  
                                    style={{fontSize:17,lineHeight:30,color:"#ffffff"}}  />
                                </View>
                                <Text style={{lineHeight:60,fontSize:15}}>{this.settings[8]}</Text>
                            </View>
                            <View style={{position:'absolute',right: 15,flexDirection:'row'}}>
                                
                                <AntDesign
                                name={'right'}
                                size={15}
                                style={{fontSize:17,lineHeight:60,color:"#C4C4C4"}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    

                    {/* <TouchableOpacity onPress={this.logOut} activeOpacity={0.5} style={{height:200}} >
                        <View   style={[styles.settingContainer,{justifyContent:'center',alignItems:'center'}]}>
                            <View  style={[{width:150,height:60,backgroundColor:"#21CFFF",flexDirection:'row',borderRadius:40,justifyContent:'center',alignItems:'center'}]}>
                                
                                <Text  style={{lineHeight:60,fontSize:16,textAlign:'center',marginRight:10,color:"#FFFFFF",fontWeight:"500"}}>退出登錄</Text>
                                
                            </View>
                        </View>
                    </TouchableOpacity> */}
                    
                    
                    
                    
                    <TouchableWithoutFeedback onPress={()=>{
                        this.setState({isLogOut:false})
                        console.log('close')
                    } } >
                        <BottomSheet 
                        navigation={this.props.navigation}
                        isOpen={this.state.isLogOut} 
                        setIsOpen={()=>{
                            this.setState({
                                isLogOut:false
                            })
                            console.log('close');
                        }} 
                        />  
                    </TouchableWithoutFeedback>
                    {
                        this.state.isLoading===true
                        &&
                        <Loading isFinish={this.state.isLoading} />
                    }
                    {
                        this.state.setting===true
                        &&
                        <Modal  transparent >
                            <TouchableWithoutFeedback onPress={this.closeSetting}  style={{width:screenSize.width,height:screenSize.height,justifyContent:'center',alignItems:'center'}}>
                                <Animated.View   style={{position:'absolute',top:0,left:0,width:screenSize.width,height:screenSize.height,backgroundColor:"rgba(0,0,0,1)" ,opacity:this.state.opacity }} />
                                <Animated.View style={{transform:[{scale:this.state.scale}],width:screenSize.width,height:screenSize.height,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{justifyContent:'center',alignItems:'center',position:'absolute',width:300,height:200,backgroundColor:"#FFFFFF",borderRadius:20}}>
                                        <Text style={{fontWeight:"500",color:"#CDCDCD",marginBottom:10}}>請輸入修改的值</Text>
                                        <TextInput
                                            multiline
                                            onSubmitEditing={()=>{
                                                defaultShowMessage(" 設置完成 ! ")
                                                
                                                this.setState({setting:false})
                                                this.settingInfo()
                                            }}
                                            style={{ width:240,padding:10, borderRadius:20,backgroundColor:"#F4F4F4",/* padding:10, */paddingLeft:20 }}
                                            onChangeText={text => this.setState({value:text})}
                                            value={this.state.value}
                                            placeholder={"please input value what you want to update"}
                                            returnKeyType="done"
                                        />
                                    </View>
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    }

                <FlashMessage 
                        position="top" 
                        statusBarHeight={0}
                        style={{
                        backgroundColor:"#8C8E8F",
                        /* justifyContent:"center",
                        alignItems:'center', */
                        /* position:'absolute', */
                        height:75,
                        width:screenSize.width-20,
                        borderRadius:10,
                        paddingLeft:20,
                        left:10,
                        top:100,
                        }} 
                        
                        titleStyle={{fontSize:13,position:'absolute',left:30,top:-10,lineHeight:44}}
                        textStyle={{padding:0,marginTop:5,fontSize:14,position:"absolute",left:0,top:25}}
                        icon={'info'}
                        
                        animationDuration={200}
                        /> 
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        backgroundColor:'#fFfFfF',
        /* height:screenSize.height, */
    },
    settingContainer:{
        width:screenSize.width,
        /* justifyContent:"center",
        alignItems:'center', */
        height:60,
        marginBottom:5
    },
    settingRealContainer:{
        width:screenSize.width,
        justifyContent:"center",
        height:60,
        borderRadius:40,
        backgroundColor:"#FFFFFF",
        paddingLeft:20,
    },
    fontIconContainerStyle:{
        width:30,
        height:30,
        borderRadius:20,
        backgroundColor:"#21CFFF",
        justifyContent:'center',
        alignItems:"center",
        marginRight:5
    }
})