import React,{memo,useEffect,useRef,useState} from 'react'
import { StyleSheet, Text, View ,FlatList,Animated,Platform,Image} from 'react-native'

import { screenSize } from '../../util/screenSize'

import Item from './item'

import SkeletonView from '../../components/SkeletonView'
const MyFlatList = ({ data ,offset,collapseKeyBoard }) => {


    const [delay, setDelay] = useState(true)

    const firstTime =useRef(false)



    useEffect(() => {
        
        if(data!==undefined && firstTime.current===false){

            firstTime.current=true;

            setTimeout(()=>{
                setDelay(()=>false)
                //console.log('set delay')
            },100)
        }
    }, [data])

    return (
        <Animated.View style={{paddingBottom:70,paddingLeft:10,paddingRight:10}} onTouchEnd={()=>collapseKeyBoard()} /* style={{height:Platform.OS==='ios'?Animated.subtract(screenSize.height-100,offset):Animated.subtract(screenSize.height-120,offset)  }}*/>
            {
            <View>
                <View style={{display:data!==undefined && delay===false && firstTime.current===true ?'flex':'none'}}>
                    {
                        data!==undefined && data.length!==0?
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({item,index})=>
                                <Item 
                                    collapseKeyBoard={collapseKeyBoard} 
                                    offset={offset} 
                                    item={item}
                                />
                        }
                        keyExtractor={(item)=>
                            Date.parse(item.commetDate).toString()
                        }
                        /> 
                        :
                        <View style={{width:screenSize.width-20,height:200,justifyContent:'center',alignItems:'center'}}> 
                            <Image source={require('../../assets/home.png')} style={{width:100,height:100,borderRadius:50,marginBottom:10}} />
                            <Text style={{paddingLeft:10,fontWeight:'500'}}>暫時還沒有人留言</Text>
                        </View>
                    }
                    
                </View>
                <View style={{display:delay===true  ?'flex':'none'}}>
                    <View style={{flexDirection:'row',marginBottom:20}}>
                        <SkeletonView style={{width:40,height:40,borderRadius:20,marginRight:10}} />
                        <View >
                            <SkeletonView style={{width:100,height:15,borderRadius:20,marginBottom:5}} />
                            <SkeletonView style={{width:200,height:15,borderRadius:20,marginBottom:5}} />
                            <View style={{flexDirection:'row'}}>
                                <SkeletonView style={{width:60,height:15,borderRadius:20,marginRight:10}} />
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <SkeletonView style={{width:40,height:40,borderRadius:20,marginRight:10}} />
                        <View >
                            <SkeletonView style={{width:100,height:15,borderRadius:20,marginBottom:5}} />
                            <SkeletonView style={{width:200,height:15,borderRadius:20,marginBottom:5}} />
                            <View style={{flexDirection:'row'}}>
                                <SkeletonView style={{width:60,height:15,borderRadius:20,marginRight:10}} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            }
        </Animated.View>
    )
}

export default memo(MyFlatList)

const styles = StyleSheet.create({


})
