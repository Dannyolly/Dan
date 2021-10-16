import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'

import { screenSize } from '../../util/screenSize'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '../../util/Icon';
import { userStore,observer } from '../../mobx/store';

import CachedImage from '../NonIdCachedImage'
import { base_url } from '../../api/config';

export default observer(({ navigation })=>{

    //console.log(userStore.userInfo);
    return(
        <View style={{width:screenSize.width,height:95,position:'absolute',top:-50}}>    

            {/* <View onTouchEnd={()=>navigation.navigate('userInfo')} style={{position:'absolute',bottom:10,left:15}}>
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
                <Text style={[styles.headerTitle,{/* paddingLeft:20 */textAlign:'center'}]}>Messages</Text>
            </View>
                  
            <View onTouchEnd={()=>navigation.navigate('individual')} style={{position:'absolute',bottom:5,right:20}}>
                {
                    userStore.userInfo!==undefined
                    &&
                    <CachedImage  
                    uri={base_url+userStore.userInfo.userInfo.icon}
                    style={styles.picStyle}
                    />
                }
            </View>
            
            
        </View>
    )
})

const styles = StyleSheet.create({
    headerTitle:{
        left:20,
        position:'absolute',
        top:50,
        color:"#3672CF",
        fontSize:30,
        fontWeight:'bold'
    },
    picStyle:{
        width:36.5,
        height:36.5,
        borderRadius:18.25
    }
})