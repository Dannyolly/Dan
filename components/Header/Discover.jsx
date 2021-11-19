import React from 'react'
import { View, Text ,StyleSheet, StatusBar, StatusBarIOS, SafeAreaView,Image} from 'react-native'

import { screenSize } from '../../util/screenSize'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign ,FontAwesome,FontAwesome5,Ionicons} from '../../util/Icon';
import { userStore,observer } from '../../mobx/store';

import CachedImage from '../CachedImage'
import { base_url } from '../../api/config';
import PostItem from '../../pages/Discover/PostItem';

export default observer(({ navigation })=>{


    return(
        <SafeAreaView style={{flex:1}}>
        <View style={{width:screenSize.width,height:95,position:'absolute',top:-50,zIndex:0}}>    
            <StatusBar   />
            
            {/* <View onTouchEnd={()=>navigation.navigate('userInfo')} style={{position:'absolute',bottom:10,left:20}}>
                {
                    userStore.userInfo!==undefined
                    &&
                    <CachedImage  
                    uri={base_url+userStore.userInfo.userInfo.avatar}
                    style={styles.picStyle}
                    />
                }
            </View> */}
            <View style={{width:screenSize.width,justifyContent:"center"}}>
              
                <Text style={[styles.headerTitle,{paddingLeft:10}]}>DanDan</Text>
            </View>
            <View  onTouchStart={()=>navigation.navigate('qrcode')} style={{paddingLeft:1,backgroundColor:"#21CFFF",borderRadius:25,width:35,height:35,justifyContent:"center",alignItems:'center',position:'absolute',right:10,bottom:8}}>
                <Ionicons   name="scan" style={{fontSize:20,color:"#FFFFFF"}} />
            </View>
           
            <View  style={{paddingLeft:1,backgroundColor:"#21CFFF",borderRadius:25,width:35,height:35,justifyContent:"center",alignItems:'center',position:'absolute',right:55,bottom:8}}>
                <FontAwesome5  name="plus" style={{fontSize:18,color:"#FFFFFF",fontWeight:'100'}} />
            </View>

        </View>
        </SafeAreaView>
    )
})

const styles = StyleSheet.create({
    headerTitle:{
        position:'absolute',
        top:50,
        /* left:70, */
        color:"#3672CF",
        fontSize:30,
        fontWeight:'bold'
    },
  
    picStyle:{
        width:40,
        height:40,
        borderRadius:22.5
    }
})