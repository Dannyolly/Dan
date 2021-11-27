import React, { useRef , MutableRefObject, memo} from 'react'
import { StyleSheet, Text, View ,Image, Pressable } from 'react-native'
import UploadImage from '../UploadImage'
import JustifyCenterImage from '../JustifyCenterImage'
import CacheImage from '../NonIdCachedImage'
import { base_url } from '../../api/config'
import ZoomableImage from '../ZoomableImage'
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
    

    const RenderImage = memo(( {borderRadius} )=>{
        // console.log('re-render')
        return (
            image.substring(0,1)!=='h'?
           
            <ZoomableImage 
                 
                uri={image} 
                style={{
                    width:220,height:220,borderRadius:
                    borderRadius,position:'absolute',right:0,top:10
                }}  
            />
            :
            <ZoomableImage 
                isCache={true}   
                uri={image} 
                style={{
                    width:220,height:220,borderRadius:
                    borderRadius,position:'absolute',right:0,top:10
                }}    
            />
            )
    },(pre,next)=>{
        return true
    })

    

    return (
        <Pressable >
            <JustifyCenterImage 
                parentRef={parentRef} 
                ChildrenComponent={
                    ()=>
                        <UploadImage {...props}
                            RenderImage={()=><RenderImage borderRadius={10}/>}  
                        />
                }  
                BaseImage ={({ ref })=><RenderImage ref={ref}  borderRadius={0} /> }
                imageUrl = {image}
            />
        </Pressable>
    )
}

export default index

const styles = StyleSheet.create({

  
})
