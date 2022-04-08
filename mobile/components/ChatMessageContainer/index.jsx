import React,{useState,useEffect,useCallback,useRef, createRef,Component} from 'react'
import { View, Text, TextInput,Animated, Keyboard} from 'react-native'
import { Feather ,MaterialIcons,AntDesign,Entypo } from '../../util/Icon'
import { screenSize } from '../../util/screenSize'
import { userStore,observer } from '../../mobx/store'

/* export default (props)=>{

    let ref = createRef()

    userStore.setText(props.text)

 
    
    return (
        <View style={{height:105,paddingTop:10,paddingLeft:10,paddingBottom:5,flexDirection:"row",paddingRight:20,backgroundColor:"#F0F2FC"}}>
            <View style={{zIndex:1,position:'absolute',left:15,top:14,width:35,height:35,borderRadius:40,backgroundColor:'#21CFFF',justifyContent:"center",alignItems:"center"}}>
                <Entypo name="new-message"style={{zIndex:1,lineHeight:35,color:"#FFFFFF"}} size={18}  />
            </View>
            <TextInput
            returnKeyType="send"
            placeholder={'Type something'}
            onSubmitEditing={(prop)=>{
                Keyboard.dismiss()
                userStore.setText("")
                props.onSend(prop)
                ref.current.clear()
            }}
            ref={ref}
            onChangeText={props.onTextChanged}
            style={{width:screenSize.width-20,
                height:43,
                borderRadius:40,
                padding:5,paddingLeft:45,backgroundColor:"#FFFFFF"
                ,marginRight:20
            }}
            >
                
            </TextInput>
            
            {   
                props.text===''
                &&
                <Animated.View >
                    <MaterialIcons  onPress={()=>console.log('icon')} name={'tag-faces'} style={{position:'absolute',right:70,lineHeight:45}} size={28} />
                    <Feather  onPress={()=>props.setIsOpen()} name='image' style={{position:'absolute',right:30,lineHeight:45,fontWeight:'100'}} size={28}/>
                   
                </Animated.View>
            }
            {
                props.text!==''
                &&
                <Text  onPress={(prop)=>{
                    Keyboard.dismiss()
                    props.onSend(prop)
                    userStore.setText("")
                    ref.current.clear()
                }} style={{position:'absolute',right:25,zIndex:1,lineHeight:60,fontSize:18,color:"#21CFFF"}}>Send</Text>
            }
        </View>
    )
} */



export default class index extends Component {

    ref = undefined


    state={
        texting:false
    }

    


    render() {
        if(this.props.text==='' && this.state.texting===true){
            this.setState({
                texting:false
            })
        }else if(this.props.text!=='' && this.state.texting===false){
            this.setState({
                texting:true
            })
        }
        
        userStore.setText(this.props.text)
        return (
            <View style={{height:105,paddingTop:10,paddingLeft:10,paddingBottom:5,flexDirection:"row",paddingRight:20,backgroundColor:"#F0F2FC"}}>
                <View style={{zIndex:1,position:'absolute',left:15,top:14,width:35,height:35,borderRadius:40,backgroundColor:'#21CFFF',justifyContent:"center",alignItems:"center"}}>
                    <Entypo name="new-message"style={{zIndex:1,lineHeight:35,color:"#FFFFFF"}} size={18}  />
                </View>
                <TextInput
                /* returnKeyLabel={'send'} */
                returnKeyType="send"
                placeholder={'Type something'}
                onSubmitEditing={(prop)=>{
                    Keyboard.dismiss()
                    this.props.onSend(prop)
                    this.setState({
                        texting:false
                    })
                    this.ref.clear()
                }}
                ref={c=>this.ref=c}
                onChangeText={this.props.onTextChanged}
                style={{width:screenSize.width-20,
                    height:43,
                    borderRadius:40,
                    padding:5,paddingLeft:45,backgroundColor:"#FFFFFF"
                    ,marginRight:20
                }}
                /* value={userStore.text} */
                >
                    
                </TextInput>
                
                {   
                    this.state.texting===false
                    &&
                    <Animated.View >
                        <MaterialIcons  onPress={()=>console.log('icon')} name={'tag-faces'} style={{position:'absolute',right:70,lineHeight:45}} size={28} />
                        <Feather  onPress={()=>this.props.setIsOpen()} name='image' style={{position:'absolute',right:30,lineHeight:45,fontWeight:'100'}} size={28}/>
                       
                    </Animated.View>
                }
                {
                    this.state.texting!==false
                    &&
                    <Text  onPress={(prop)=>{
                        Keyboard.dismiss()
                        this.props.onSend(prop)
                        this.setState({
                            texting:false
                        })
                        //console.log(this.ref);
                        this.ref.clear()
                    }} style={{position:'absolute',right:25,zIndex:1,lineHeight:60,fontSize:18,color:"#21CFFF"}}>Send</Text>
                }
            </View>
        )
    }
}
