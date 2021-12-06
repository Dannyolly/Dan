import React,{useState,useCallback,useRef,useEffect,Component} from 'react'
import { Keyboard, StatusBar, StyleSheet, Text, TextInput, View ,Image, Animated,Modal} from 'react-native'
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { screenSize } from '../../util/screenSize'

import BottomSheet from '../../components/BottomSheet/Post'
import { MaterialIcons } from '../../util/Icon';
import { uploadPost } from '../../api/api';
import { userStore } from '../../mobx/store';

import Loading from '../../components/Loading'
import { DeviceEventEmitter } from 'react-native';
import { tapResponser ,messageResponser } from '../../util/haptic';
import { defaultShowMessage } from '../../util/function';
export default class index extends Component {
    
    state={
        text:'',
        isOpen:false,
        pic:[],
        isFinish:false,
        isUpload:false,
    }   

    addPic=(newPic)=>{
        this.setState({
            pic:[...this.state.pic,newPic]
        })
    }

    removeItem=(index)=>{
        let temp = [...this.state.pic]
         temp = temp.filter((item,i)=>{
            return i!==index
        })

        //console.log(temp)
        this.setState({
            pic:[...temp]
        })
    }

    publicPost=()=>{
        tapResponser()    
    
        messageResponser()

        this.setState({
            isUpload:true,   
        })

        
        uploadPost(this.state.pic,userStore.userInfo.userInfo.id,this.state.text).then(res=>{
            console.log(res.data)
            setTimeout(()=>{
                this.setState({
                    isFinish:true
                },()=>{
                    let obj={
                        id:res.data.postId,
                        introduction:this.state.text,
                        likeCount:0,
                        postDate:new Date(),
                        postImage:res.data.postImage.split(","),
                        userId:userStore.userInfo.userInfo.id
                    }
                    // 轉去 Discover page
                    console.log('obj~~~~',obj)
                    DeviceEventEmitter.emit("uploadPost",obj);

                    setTimeout(()=>{
                        
                        
                        this.props.navigation.navigate('discover')
                        defaultShowMessage(" 發布成功 !")

                    },1500)
                })
            },2000)
        })
        /* let obj={
            id:999,
            introduction:this.state.text,
            likeCount:0,
            postDate:new Date(),
            postImage:['/img/post/1633605112566.png'],
            userId:userStore.userInfo.userInfo.id
        } */
        // 轉去 Discover page
        /* DeviceEventEmitter.emit("uploadPost",obj);
        this.props.navigation.navigate('發現')  */
    }

    



    render() {
        return (
            <View>
                <View style={{width:screenSize.width,height:screenSize.height,paddingTop:30}}>
                    <View style={{marginBottom:30}}>
                        <Text style={{textAlign:'center',fontWeight:'600',fontSize:18,color:"#3672CF"}}>建立貼子</Text>
                        
                        <View style={{position:'absolute',right:20,top:10,justifyContent:'center',alignItems:'center',width:70,height:40,borderRadius:10,backgroundColor:"#21CFFF"}}>
                            <Text onTouchStart={this.publicPost} style={{color:"#FFFFFF"}}>發布</Text>
                        </View>
                    </View>

                    <TextInput
                        multiline={true}
                        style={ styles.input}
                        placeholder={"在想甚麼?..."}
                        
                        onChangeText={text => this.setState({text:text})}
                        value={this.state.text}
                    />
                    <View style={{flexDirection:"row",flexWrap:'wrap',paddingLeft:12}}>
                       
                        {
                            this.state.pic.length!==0
                            &&
                            this.state.pic.map((item,index)=>{
                                return(
                                    <View style={[styles.image,{position:'relative'}]} >
                                         <View onTouchStart={()=>{
                                             tapResponser()
                                             this.removeItem(index)
                                         }} style={{zIndex:1,position:'absolute',right:-8,top:-8,width:25,height:25,borderRadius:30,justifyContent:'center',alignItems:'center',backgroundColor:"#21CFFF"}} >
                                            <Text style={{ color:"#FFFFFF",fontSize:13}}>X</Text>
                                        </View>
                                        <Image 
                                        key={index}
                                        style={styles.image} 
                                        source={{
                                            uri:item
                                        }} 
                                        />
                                    </View>
                                )
                            })
                        }
                        

                        <TouchableWithoutFeedback onPress={()=>{
                            tapResponser()
                            this.setState({
                                isOpen:!this.state.isOpen
                            })
                        }}>
                            <View  style={{justifyContent:'center',alignItems:"center",backgroundColor:"#CDCDCD",width:screenSize.width/3-15,height:120,borderRadius:10,marginRight:10}}>
                                   
                                <Text style={{color:"#FFFFFF",fontSize:100}}>+</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* BOTTOM SHEET */}
                    <BottomSheet 
                    isOpen={this.state.isOpen}  
                    setIsOpen={()=>{
                        this.setState({
                            isOpen:!this.state.isOpen
                        })
                    }} 
                    addPic={this.addPic}
                    
                    />

                    {  
                        this.state.isUpload===true
                        &&
                        <Loading text={"上傳中"} isFinish={this.state.isFinish} />
                    }


                </View>
                
            </View>
        )
    }
}



const styles = StyleSheet.create({
    image:{
        width:screenSize.width/3-15,
        height:120,
        borderRadius:10,
        marginRight:10,
        marginBottom:10
    },
    input:{
        padding:0 ,
        fontSize:16,
        paddingLeft:15,
        paddingRight:20,
        marginBottom:20
    }
})
