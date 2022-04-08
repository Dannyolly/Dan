import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View,Image, Button } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { screenSize } from '../../util/screenSize'

const index = () => {

    const navigation = useNavigation()

    return (
        <View style={{backgroundColor:"#FFFFFF",width:screenSize.width,height:screenSize.height,justifyContent:'center',alignItems:'center',paddingBottom:60}}>
            <Image  source={require('../../assets/home.png')} style={{width:100,height:100,borderRadius:10}} />
            <Text style={{color:"#3672CF",fontWeight:"500",fontSize:16,marginBottom:10}}>加入DanDan</Text>
            <Text style={{fontWeight:"500",marginBottom:10 }}>現通過多步注冊你的帳號</Text>
            <TouchableHighlight activeOpacity={0.7}  underlayColor="#FFFFFF" onPress={()=>navigation.navigate("step1")} style={{borderRadius:20}} >
                <View style={{width:300,height:50,backgroundColor:'#28C1FD',borderRadius:20,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:16,color:"#FFFFFF"}}>立刻加入</Text>
                </View>
            </TouchableHighlight>
            
        </View>
    )
}

export default index

const styles = StyleSheet.create({

})
