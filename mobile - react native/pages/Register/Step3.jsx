
import React,{useState,useEffect,useCallback, useRef} from 'react'
import { StyleSheet, Text, View,Image, Button ,TextInput, Animated, Keyboard} from 'react-native'
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenSize } from '../../util/screenSize'
import MyTextInput from '../../components/MyTextInput'
import Progress from '../../components/Progress'

import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, MaterialIcons } from '../../util/Icon'
import SkeletonView from '../../components/SkeletonView'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { userStore,observer } from '../../mobx/store'

import BottomSheet from '../../components/BottomSheet/Post'

const step1 = observer(() => {

    const navigation = useNavigation()

    const [username, onChangeUsername] = useState("")

    const [age, onChangeAge] = useState("")

    const [password, onChangePassword] = useState("")

    const [introduction, onChangeIntroduction] = useState("")

    const [isOpen, setIsOpen] = useState(false)

    

    useFocusEffect(
        useCallback(
            () => {
                setTimeout(()=>{
                   // console.log('set')
                    userStore.setRegisterProgress(1)
                },50)
            },[],
        )
    )
            
    const choosePic = (pic)=>{
        userStore.setSubmitInfo('icon',pic)
        console.log(userStore.submitInfo)
    }


    return (
        <View style={{backgroundColor:"#FFFFFF",paddingTop:0,width:screenSize.width,height:screenSize.height}}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} style={{padding:20,width:screenSize.width}}>
                <View style={{justifyContent:"center",alignItems:'center',paddingTop:20,flexDirection:'row'}}>
                    <Image  source={require('../../assets/home.png')} style={{width:100,height:100,marginRight:10}} />
                    <Text style={{fontWeight:'bold',fontSize:40,color:"#3672CF"}}>DanDan</Text>
                </View>
                <View style={{flexDirection:"row",paddingLeft:10}}>
                    <Progress progress={userStore.registerProgress} color={'#28C1FD'}  size={50}  />
                    <Text style={{lineHeight:50,paddingLeft:20,fontSize:18,fontWeight:"500"}} >頭像</Text>
                    <Text style={{lineHeight:50,paddingLeft:5,fontSize:14,color:"#CDCDCD"}}>( 可略過,但會默認用此圖片 )</Text>
                    
                </View>

                
                
            </TouchableWithoutFeedback>

            <View style={{padding:20}}>
                <View onTouchStart={()=>setIsOpen(()=>true)} style={{justifyContent:"center",alignItems:'center',width:screenSize.width-40,height:400,borderColor:"#CDCDCD" ,borderWidth:1,borderRadius:20,marginBottom:50}}>
                    {
                        userStore.submitInfo.icon===''?
                        <Image source={require('../../assets/home.png')} style={{width:screenSize.width-40,height:400,borderRadius:20,position:'absolute',top:0}}  />
                        :
                        <Image source={{uri:userStore.submitInfo.icon}} style={{width:screenSize.width-40,height:400,borderRadius:20,position:'absolute',top:0}}  />
                    }
                    {
                        userStore.submitInfo.icon===''
                        &&
                        <AntDesign name="plus" style={{fontSize:50,fontWeight:'bold',color:"#FFFFFF"}}  />
                    }
                    
                 </View>
            </View>
            
            <View style={{justifyContent:"center",alignItems:"center",width:screenSize.width}}>
                <View style={{backgroundColor:"#28C1FD",width:250,height:50,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                    <TouchableHighlight activeOpacity={0.7}  underlayColor="#FFFFFF" onPress={()=>navigation.navigate("last")} style={{borderRadius:20}} >
                        <View style={{width:300,height:50,backgroundColor:'#28C1FD',borderRadius:20,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:16,color:"#FFFFFF"}}>立即注冊 ! </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

            <BottomSheet isOpen={isOpen} setIsOpen={()=>setIsOpen(!isOpen)} addPic={(pic)=>choosePic(pic)}  />
        </View>
    )
})

export default step1

const styles = StyleSheet.create({
    
})
