import * as React from 'react';
import { View, StyleSheet, Button, Modal ,TouchableWithoutFeedback} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { screenSize } from '../../util/screenSize';

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <Modal>
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={()=>{
                    console.log('play');
                    return status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }} >
            <Video
                ref={video}
                style={styles.video}
                source={{
                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                onTouchStart={()=>{
                    console.log('play');
                    return status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
                }
                collapsable={true}
                /* useNativeControls */
                resizeMode='contain'
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </TouchableWithoutFeedback>
        
        </View>
    </Modal>
  );
}



const styles = StyleSheet.create({
    container:{
        width:screenSize.width,
        height:screenSize.height
    },
    video:{
        width:screenSize.width,
        height:screenSize.height-100
    }
    ,
    buttons:{
        width:50,
        height:50
    }
})

