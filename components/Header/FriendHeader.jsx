import React from 'react'
import { View, Text ,StyleSheet, Platform} from 'react-native'

import { screenSize } from '../../util/screenSize'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign ,SimpleLineIcons} from '../../util/Icon';

import { userStore,observer } from '../../mobx/store';

export default observer( ({ navigation })=>{


    /* return(
        <View style={{width:screenSize.width,height:95,position:'absolute',top:-50}}>    
            <View style={{width:screenSize.width,height:95,justifyContent:"center"}}>
                <Text style={{paddingLeft:30,fontSize:30,color:"#3672CF",fontWeight:"bold"}}>Your friends</Text>
            </View>
            <View style={{width:220,padding:20,position:'absolute',top:30,left:Platform.OS==='ios'?70:65}}>

            </View>
            <SimpleLineIcons
                onPress={()=>navigation.navigate('checkFriendRequest') }
                name="user-following"
                size={25}
                style={{position:"absolute",right:70,zIndex:1,top:50}}
                />
                {
                    userStore.friendRequestDidNotReadNumber!==0
                    &&
                    <View style={{justifyContent:"center",alignItems:'center',position:"absolute",right:60,zIndex:1,top:40,width:15,height:15,borderRadius:7.5,backgroundColor:"#3DA3FF"}}>
                    <Text style={{color:"#FFFFFF",fontSize:10}}>{userStore.friendRequestDidNotReadNumber}</Text>
                </View>
                }
                


            <AntDesign
                onPress={()=>navigation.navigate('addUser')}
                name='adduser'
                size={28}
                style={{position:"absolute",right:20,zIndex:1,top:50}}
            />
            
        </View>
    ) */
    return(
        <View style={{width:screenSize.width,height:95,position:'absolute',top:-50}}>    

            <View style={{width:screenSize.width,justifyContent:"center"}}>
                <Text style={[styles.headerTitle,{paddingLeft:30}]}>Friends</Text>
            </View>
            
            <View style={{position:'absolute',right:30,bottom:10,flexDirection:'row'}}>
                <View style={{width:35,height:35,borderRadius:20,backgroundColor:"#28C1FD",justifyContent:'center',alignItems:"center"}}>
                    <SimpleLineIcons
                        onPress={()=>navigation.navigate('checkFriendRequest') }
                        name="user-following"
                        size={20}
                        style={{color:"#FFFFFF"}}
                        />
                </View>
                    {
                        userStore.friendRequestDidNotReadNumber!==0
                        &&
                        <View style={{justifyContent:"center",alignItems:'center',position:"absolute",right:60,zIndex:1,top:40,width:15,height:15,borderRadius:7.5,backgroundColor:"#3DA3FF"}}>
                        <Text style={{color:"#FFFFFF",fontSize:10}}>{userStore.friendRequestDidNotReadNumber}</Text>
                    </View>
                    }
                    


                <View style={{marginLeft:15,width:35,height:35,borderRadius:20,backgroundColor:"#03A9F3",justifyContent:'center',alignItems:"center"}}>
                    <AntDesign
                        onPress={()=>navigation.navigate('addUser')}
                        name='adduser'
                        size={24}
                        style={{color:"#FFFFFF"}}
                    />
                </View>
            </View>
            
            
            
        </View>
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
        width:45,
        height:45,
        borderRadius:22.5
    }
})