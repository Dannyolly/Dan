import React, { useRef , MutableRefObject, memo, useState} from 'react'
import { StyleSheet, Text, View ,Image, Pressable } from 'react-native'
import UploadImage from '../UploadImage'
import JustifyCenterImage from '../JustifyCenterImage'
import CacheImage from '../NonIdCachedImage'
import { base_url } from '../../api/config'
import ZoomableImage from '../ZoomableImage'

import { imageStore } from '../../mobx/lock'
/**
 * @typedef MyImageProps
 * @property {String} image
 * @property {MutableRefObject} parentRef 
 * @returns 
 */


/**
 * 
 * @param {MyImageProps} props 
 * @returns 
 */
const index = (props) => {

    
    const { image, parentRef } = props
    
    // console.log('re-render')
    const [isMoving, setIsMoving] = useState(false)
    
    const isMovingRef = useRef(false)

    const onZooming = () =>{
        if(!isMovingRef.current){
            isMovingRef.current = true
            // @link {'../JustifyCenterImage/lock'}
            imageStore.setIsZooming()
            /* console.log('setting',imageStore.isZooming) */
            setTimeout(()=>{
                isMovingRef.current = false
                imageStore.setIsZooming()
            },500)
        }
        
        /* console.log('zooming?',isMovingRef.current) */
    }

    const RenderImage = memo(( {borderRadius} )=>{
        

        return (
            image.substring(0,1)!=='h'?
           
            <ZoomableImage 
                 
                uri={image}
                onZooming={onZooming} 
                autoReset={false}
                style={{
                    width:220,height:220,borderRadius
                    /* position:'absolute',
                    left:20,top:-10, */
                    
                }}  
                closeTabBarWhenZooming={false}
                usingOnDiscover={false}
            />
            :
            <ZoomableImage 
                isCache={true}   
                uri={image}
                onZooming={onZooming}  
                style={{
                    width:220,height:220,borderRadius
                    
                }}   
                closeTabBarWhenZooming={false}
                usingOnDiscover={false}
                autoReset={false}
            />
            )
    },(pre,next)=>{
        return true
    })

    

    return (
        <View style={{borderRadius:20}} >
            <JustifyCenterImage 
                parentRef={parentRef} 
                isMoving={isMoving}
                ChildrenComponent={
                    ()=>
                        <UploadImage {...props}
                            RenderImage={()=><RenderImage borderRadius={10}/>}  
                        />
                }  
                BaseImage ={({ ref })=><RenderImage ref={ref}  borderRadius={0} /> }
                imageUrl = {image}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({

  
})
