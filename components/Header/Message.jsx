
import React from 'react'
import { View, Text } from 'react-native'

import { screenSize } from '../../util/screenSize'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign ,SimpleLineIcons} from '../../util/Icon';

import { userStore,observer } from '../../mobx/store';

export default function Message({item,navigation}) {
    return(
        <View style={{width:screenSize.width,height:89,position:'absolute',top:0,/* backgroundColor:"#F0F2FC", */zIndex:1/* ,opacity:0.95 */}}>    
            <LinearGradient 
                locations={[0.1,0.5,1]}
                colors={['#4399FE','#28C1FD','#21CFFF']}
                style={{flex:1,zIndex:0}}
                >   
                    <AntDesign onPress={()=>navigation.goBack()} name="left" size={24} style={{color:"#FFFFFF",position:"absolute",top:55,left:20}} />
                    
                     
                    <View style={{width:screenSize.width,alignItems:"center"}}>
                        <Text style={{color:"#FFFFFF",position:"absolute",top:55,fontSize:18}}>{item.username || item.name}</Text>
                    </View>

                    <AntDesign
                        onPress={()=>navigation.navigate('addUser')}
                        name='ellipsis1'
                        size={28}
                        style={{position:"absolute",right:20,zIndex:1,top:50,color:"#FFFFFF"}}
                    />
                   
            </LinearGradient>
            
        </View>
    )
}


