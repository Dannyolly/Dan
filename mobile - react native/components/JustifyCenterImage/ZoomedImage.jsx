import React,{useState, useRef, useEffect ,MutableRefObject} from 'react'
import { StyleSheet, Text, View } from 'react-native'
/**
 * 
 * @param {{ 
 *  imageUrl :string,
 *  BaseImage :JSX.Element,
 *  zoomImage :()=>void, 
 *  collapseImage: ()=> void,
 *  parentRef: MutableRefObject<Object>,
 *  mainRef : MutableRefObject<Object>,
 * }}
 */
const ZoomedImage = ( {  imageUrl , BaseImage , zoomImage , collapseImage ,parentRef , mainRef } ) => {
    
    const ref = useRef()

    const [showModal, setShowModal] = useState(false)

    const xyOffset = useRef(new Animated.ValueXY(0,0)).current

    const scale = useRef(new Animated.Value(1)).current

    const initPosition = useRef({x:0,y:0})

    const opacity = useRef(new Animated.Value(0)).current

    const [isOpen, setIsOpen] = useState(false)

    const [image, setImage] = useState(undefined)

    const [savedImage, setSavedImage] = useState(false)

    

    

   

    const savedImageToMedia = ()=>{
        
        setSavedImage(()=>true)
        setTimeout(()=>{
            setSavedImage(()=>false)
        },1500)
    }



    return (
        <Modal 
                style={{width:screenSize.width,height:screenSize.height}} 
                visible={showModal}  
                transparent={true} >
                        <MaskView  opacity={opacity}   />
                        {/* save reminder */}
                        {
                            savedImage!==false
                            &&
                            <View style={{overflow:'hidden',zIndex:1,justifyContent:"center",alignItems:'center',left:(screenSize.width-150)/2,padding:10,top:(screenSize.height-150)/2,position:'absolute',backgroundColor:"#F7F7F7",width:150,height:150,borderRadius:20}}>
                            <Image  source={require('../../assets/finish.gif')} style={{width:150,height:150}} />
                            <Text style={{position:'absolute',bottom:20,fontSize:16,color:"#CDCDCD"}}>保存成功</Text>
                            </View>
                        }

                        <Pressable onLongPress={()=>{
                            setImage(()=>imageUrl)
                            console.log(imageUrl);
                            setIsOpen(()=>true)
                        }} > 
                            <Animated.View   
                            
                            onTouchEnd={()=>tapPic()}
                            style={{width:220,height:220,borderRadius:0,
                            transform:[

                            {translateX:xyOffset.x},
                            {translateY:xyOffset.y},
                            {scaleX:scale},
                            {scaleY:scale}

                            ]}}>
                                <BaseImage/>
                            </Animated.View>
                        </Pressable>
                    <BottomSheep 
                        isOpen={isOpen} 
                        setIsOpen={setIsOpen} 
                        savedImage={savedImageToMedia}  
                        imageUrl={imageUrl}  
                    />
                </Modal>
    )
}

export default ZoomedImage

const styles = StyleSheet.create({})
