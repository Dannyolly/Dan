import React,{memo} from 'react'
import { StyleSheet, Text, View,TouchableWithoutFeedback,Image,Animated,Keyboard } from 'react-native'
import { base_url } from '../../api/config';
import { calculateDate } from '../../util/function';
import { screenSize } from '../../util/screenSize';




const Item =  ( {item , offset } ) =>{
    ///console.log('render')

    const { commentInfo,commetDate,icon,likeCount,postCommentId,postId,userId,username } = item


    //console.log(item);
    const calculateLength=()=>{
        if(9*commentInfo>screenSize.width){
            return screenSize.width
        } else{
            
            if(9*commentInfo.length> 14*username.length){
                return 9*commentInfo.length
            }else{
                return 14*username.length
            }
        }
    }

    /* CacheManager.clearCache() */

    const preview={uri:base_url+item.icon}
    
    const uri = base_url+item.icon

    


    return(

        <View style={{paddingLeft:45,marginBottom:15}}>
            
            <Image  source={{uri:uri}}  style={styles.icon} />
            
            <View style={{width:calculateLength(),backgroundColor:"#F4F4F4",borderRadius:10,padding:10,/* paddingTop:5,paddingBottom:5, */marginBottom:5}}>
                <Text style={{fontWeight:'600',marginRight:10,marginBottom:3,paddingLeft:1,textAlign:'left'}}>{username}</Text>
                <Text style={{textAlign:'left'}}>
                    {commentInfo}
                </Text>
            </View>
            <View style={{flexDirection:'row',paddingLeft:9}}>
                    <Text style={{color:"#989C9E",marginRight:10,fontSize:12}}>{calculateDate(commetDate)}</Text>
                    <Text style={{color:"#989C9E",marginRight:10,fontSize:12}}>{likeCount}個讚好</Text>
                    <Text style={{color:"#989C9E",marginRight:10,fontSize:12}}>讚好</Text>
            </View>
        </View>

    )
}



const isReRender=(pre ,next )=>{
    return pre.item === next.item
}

export default memo(Item,isReRender)

const styles = StyleSheet.create({
    icon:{
        width:40,
        height:40,
        borderRadius:20,
        position:'absolute',
        left:0
    },
})
