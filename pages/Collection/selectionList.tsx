import { useNavigation } from '@react-navigation/native'
import React, { useState ,useEffect ,useRef } from 'react'
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { userStore } from '../../mobx/store'
import { MaterialIcons } from '../../util/Icon'
import { LocalCacheManager } from '../../util/LocalCacheManager'
import { screenSize } from '../../util/screenSize'
import { FormattedPost } from '../../util/type'
import CollectionItem from './item'

interface selectionListProps {
    
    setCurrentSelection : (index:number)=>void,

    currentSelection : number ,


}

const selectionList = ({ setCurrentSelection  ,currentSelection  }: selectionListProps):React.ReactElement => {

    const selectionList = ['貼子','聊天記錄','圖片']

    const leftOffset = useRef(new Animated.Value(0)).current

    const click = (index:number) =>{

        Animated.spring(leftOffset,{
            toValue:index * (screenSize.width-20)/3,
            useNativeDriver:false,
            
        }).start()
        setCurrentSelection(index)

    }

    return (
        <View style={{backgroundColor:"#FFFFFF",width:screenSize.width,height:50,marginBottom:10,paddingLeft:10,paddingRight:10,paddingBottom:10}} >
                <ScrollView scrollEnabled={false}  horizontal={true} contentContainerStyle={{borderRadius:20,padding:0,marginBottom:0}} >
                    {
                        selectionList.map((item,index)=>{
                            return(
                                
                                currentSelection===index?
                                <View onTouchStart={()=>click(index)} style={{width:(screenSize.width-20)/3,height:40,padding:0,justifyContent:'center',alignItems:'center',zIndex:1}} >
                                    <Text style={{color:"#FFFFFF",fontWeight:'bold'}} >{item}</Text>
                                </View>
                                :
                                <View onTouchStart={()=>click(index)}  style={{width:(screenSize.width-20)/3,height:40,padding:0,justifyContent:'center',alignItems:'center',zIndex:1}} >
                                    <Text style={{color:"#CDCDCD"}} >{item}</Text>
                                </View>
                            )
                        })
                    }
                    {
                        <Animated.View  style={{width:(screenSize.width-20)/3,height:40,backgroundColor:"#21CFFF",borderRadius:20,position:'absolute',left:leftOffset,zIndex:0}} />
                    }
                </ScrollView>
        </View>
    )
}

export default selectionList

const styles = StyleSheet.create({
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