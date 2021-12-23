import React,{useState, useEffect , useRef} from 'react'
import { Modal, StyleSheet, Text, View ,Image } from 'react-native'
import { screenSize } from '../../util/screenSize'

const index = () => {

  const [isClose, setIsClose] = useState(false)

  useEffect(() => {
    
    setTimeout(()=>{
      setIsClose(()=>true)

      // loading something 
    },2000)

  }, [])


  return (
    <>
      {
        isClose?
        <></>
        :
        <Modal    style={{backgroundColor:"#28C1FD",width:screenSize.width,height:screenSize.height,
            justifyContent:'center',alignItems:'center'}} >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                  
                  <View style={{position:'absolute',flexDirection:'row',padding:20,bottom:30,justifyContent:'center',alignItems:'center'}} >
                      <Image style={{width:60,height:60,marginRight:5}} source={require('../../assets/home.png')}  />
                      <Text style={{fontSize:42,fontWeight:'600',color:'#3672CF'}} >DanDan</Text>
                  </View>
                </View>

    </Modal>
      }
    
    
    </>
  )
}

export default index

const styles = StyleSheet.create({})
