import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'

import { screenSize } from '../../util/screenSize'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '../../util/Icon';
import { userStore,observer } from '../../mobx/store';

import CachedImage from '../NonIdCachedImage'
import { base_url } from '../../api/config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default observer(({ navigation })=>{

    //console.log(userStore.userInfo);
    return(
        <View style={{flex:1,zIndex:0,height:0}}>  
            <View style={{width:screenSize.width,position:'absolute',left:20,bottom:0}}>
                <Text style={[styles.headerTitle]}>Messages</Text>
            </View>
                
            <View onTouchEnd={()=>navigation.navigate('individual')} 
            style={{position:'absolute',right:20,bottom:3}}>
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
        color:"#3672CF",
        fontSize:35,
        fontWeight:'bold'
    },
    picStyle:{
        width:35,
        height:35,
        borderRadius:18.25
    }
})