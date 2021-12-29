import { useNavigation } from '@react-navigation/native'
import React, { useState ,useEffect ,useRef } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { userStore } from '../../mobx/store'
import { LocalCacheManager } from '../../util/LocalCacheManager'
import { screenSize } from '../../util/screenSize'
import { FormattedPost } from '../../util/type'
import CollectionItem from './item'


interface CollectionProps {
    /* navigation:any ,
    route:{
        params:{
            postId :number 
        }
    } */
}

const Collection = (props: CollectionProps) => {
    
    
    const [postList, setPostList] = useState<Array<FormattedPost>>([])

    const currentPage = useRef(0)

    const getCollection = async ( ) =>{
        
        
        let res = await LocalCacheManager.getPostCollectionByCurrentPage(userStore.userInfo.userInfo.id , currentPage.current )

        console.log(res)
        postList.length === 0?
            setPostList([...res])
            :
            setPostList([ ...postList , ...res ])
    }


    useEffect(() => {
        getCollection()

    }, [])

    return (
        <View style={{width:screenSize.width , height:screenSize.height,padding:5}}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={postList}
            renderItem={({item,index})=>(
                <CollectionItem 
                    item={item}
                    index={index}
                />
            )}
            columnWrapperStyle={{
                marginBottom:5
            }}
            numColumns={2}
        
        
        
        
        />
        </View>
    )
}

export default Collection

const styles = StyleSheet.create({})
