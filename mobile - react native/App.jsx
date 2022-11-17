
    
import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect, useRef}from 'react';
import { StyleSheet, Text, View ,DeviceEventEmitter} from 'react-native';
import FlashMessage from "react-native-flash-message";
import MainContent from './MainContent'
import Login from './pages/Login';
import { screenSize } from './util/screenSize';
import { observer } from './mobx/store'
import MessageIcon from './components/MessageIcon'
import SplashView from './pages/SplashView'
import MaskView from './components/MaskView'
export default observer(()=>{


  const [login, setLogin] = useState(false)

  
  const loginRef = useRef()

  const reLoginRef = useRef(false)




  /* useEffect(() => {
    
    loginRef.current = DeviceEventEmitter.addListener("loginIn",()=>{
      setLogin(()=>true)
    })
    reLoginRef.current =DeviceEventEmitter.addListener("reLoginIn",()=>{
      setLogin(()=>false)
    })
    return ()=>{
      loginRef.current.remove()
      reLoginRef.current.remove()
    }
  }, []) */

  return (
    <View style={styles.container}>
        
        
 
        {
          /* login
          && */
          <MainContent/>
        }
        
        <FlashMessage 
        position="top" 
        statusBarHeight={0}
        style={{
          backgroundColor:"#8C8E8F",
          /* justifyContent:"center",
          alignItems:'center', */
          /* position:'absolute', */
          height:75,
          width:screenSize.width-20,
          borderRadius:10,
          paddingLeft:20,
          left:10,
          top:40,
        }} 
        
        titleStyle={{fontSize:13,position:'absolute',left:30,top:-10,lineHeight:44}}
        textStyle={{padding:0,marginTop:5,fontSize:14,position:"absolute",left:0,top:25}}
        icon={'info'}
        
        animationDuration={200}
        /> 
    </View>
  );
})



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFFFFF"
  },
});
