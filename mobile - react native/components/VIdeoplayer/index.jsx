
import React,{useRef,useState,useCallback} from 'react'
import { View, StyleSheet, Button, Modal ,TouchableWithoutFeedback,Text} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { screenSize } from '../../util/screenSize';
import PagerView from 'react-native-pager-view';
import Item from './item';

export default function App(props) {

  /** @type {String} */
  const params = props.route.params.videoUrl

  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});

  const [currentPage, setCurrentPage] = useState()

  const currentPageRef  = useRef(0)

  const ref = useRef()

  const a =  ['1' , '2']



  return (
    
        <View style={styles.container}>
            <PagerView 
            ref={c=>ref.current=c}
            initialPage={0}
            style={{flex:1,padding:10}} 
            onPageSelected ={e=>{
                currentPageRef.current =  e.nativeEvent.position
                //setCurrentPage(()=>e.nativeEvent.position)
                setCurrentPage(e.nativeEvent.position)
                //console.log(currentPageRef.current);
            }}
            orientation='vertical' 
            >
                {
                    a.map((item,index)=>{
                        return(
                            <Item  currentPage={currentPage} index={index} />
                        )
                    })
                }
                
            </PagerView>
        </View>
    
  );
}



const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        height:screenSize.height,
        backgroundColor:"black"
    },
    video:{
        width:screenSize.width,
        height:screenSize.height
    }
    ,
    buttons:{
        width:50,
        height:50
    }
})

