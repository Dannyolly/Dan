import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React,{useState,useEffect,useCallback, useRef} from 'react'
import { StyleSheet, Text, View,Image, Button ,TextInput, Animated, Keyboard} from 'react-native'
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenSize } from '../../util/screenSize'
import MyTextInput from '../../components/MyTextInput'
import Progress from '../../components/Progress'

import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '../../util/Icon'
import SkeletonView from '../../components/SkeletonView'
import { userStore ,observer} from '../../mobx/store'
const step1 = observer(() => {

    const navigation = useNavigation()

    const [username, onChangeUsername] = useState("")

    const [age, onChangeAge] = useState("")

    const [password, onChangePassword] = useState("")

    const [introduction, onChangeIntroduction] = useState("")

    useFocusEffect(
        useCallback(
            () => {
                setTimeout(()=>{
                    //console.log('set')
                    userStore.setRegisterProgress(0.33)
                },50)
            },[],
        )
    )


    const next=()=>{
        userStore.setSubmitInfo('username',username)
        userStore.setSubmitInfo('password',password)
        userStore.setSubmitInfo('introduction',introduction)
        navigation.navigate("step2")
    }
    

    return (
        <View style={{backgroundColor:"#FFFFFF",paddingTop:0,width:screenSize.width,height:screenSize.height,paddingBottom:60}}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} style={{padding:20,width:screenSize.width,height:screenSize.height}}>
                <View style={{justifyContent:"center",alignItems:'center',paddingTop:20,flexDirection:'row'}}>
                    <Image  source={require('../../assets/home.png')} style={{width:100,height:100,marginRight:10}} />
                    <Text style={{fontWeight:'bold',fontSize:40,color:"#3672CF"}}>DanDan</Text>
                </View>
                <View style={{flexDirection:"row",marginBottom:30,paddingLeft:10}}>
                    <Progress progress={userStore.registerProgress} color={'#28C1FD'}  size={50}  />
                    <Text style={{lineHeight:50,paddingLeft:20,fontSize:18,fontWeight:"500"}} >個人信息</Text>
                    
                </View>
                <View style={{marginBottom:20}}>
                    <MyTextInput   onChangeText={onChangeUsername} text={username} title={"姓名/帳號名"} />
                </View>
                <View style={{marginBottom:20}}>
                    <MyTextInput   onChangeText={onChangePassword} text={password} title={"密碼"} />
                </View>
                <View style={{marginBottom:20}}>
                    <MyTextInput   onChangeText={onChangeIntroduction} text={introduction} title={"簡介( 可選填 )"} />
                </View>

                <View   style={{width:screenSize.width,position:'absolute',bottom:200,justifyContent:'center',alignItems:'center'}}>
                    <TouchableHighlight activeOpacity={0.7} underlayColor={'#FFFFFF'} onPress={()=>next()}>
                        <LinearGradient 
                            locations={[0.1,0.5,1]}
                            colors={['#4399FE','#28C1FD','#21CFFF']}
                            style={{width:70,height:70,borderRadius:35,justifyContent:'center',alignItems:'center'}}
                            
                            >
                                <MaterialIcons  name="navigate-next" style={{color:"#FFFFFF",fontWeight:'bold',fontSize:30}} />
                        </LinearGradient>
                    </TouchableHighlight>
                    {/* <SkeletonView style={{width:70,height:70,borderRadius:35,justifyContent:'center',alignItems:'center'}} backgroundColor={"#4399FE"} duration={2000} colors={['#28C1FD','#21CFFF','#21CFFF','#28C1FD']}  /> */}
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
})

export default step1

const styles = StyleSheet.create({
    
})
