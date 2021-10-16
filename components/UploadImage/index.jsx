import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import * as Progress from 'react-native-progress';
import { screenSize } from '../../util/screenSize';
import CacheImage from '../NonIdCachedImage'

const index = (props ) => {

    const {image ,progress,isFinish}=props
    const [uploaded, setIsUploaded] = useState(false)




    useEffect(() => {
        if(progress===100 && uploaded===false){
            setIsUploaded(()=>true)
        }
    }, [progress])

    useEffect(()=>{
        if(isFinish==true){
            setIsUploaded(()=>true)
        }
    },[])
    
    //console.log(image)
    console.log('progress',progress)
    return (
        <View style={{position:'relative',width:220,height:220,backgroundColor:"#EBEDF5"}} >
            <View style={{position:'absolute',top:0,width:260,height:240,backgroundColor:"#EBEDF5",right:0}} />
            <View style={{padding:10}}>
                {
                    image.substring(0,1)!=='h'?
                    <Image source={{uri:image}} style={[{width:220,height:220,borderRadius:10,position:'absolute',right:0,top:10}]}  />
                    :
                    <CacheImage  uri={image} style={[{width:220,height:220,borderRadius:10,position:'absolute',right:0,top:10}]}  />
                }
                {
                    (uploaded===false  )
                    &&
                    <View style={[{position:'absolute',backgroundColor:"rgba(0,0,0,0.2)",justifyContent:'center',alignItems:'center',width:220,height:220,borderRadius:10,right:0,top:10}]}>
                        <Progress.Circle  color={"#CDCDCD"} progress={progress} size={100}  showsText={true} />
                    </View>
                }
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({

})
