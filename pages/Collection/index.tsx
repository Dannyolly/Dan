import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, View ,DeviceEventEmitter } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { userStore } from '../../mobx/store'
import { MaterialIcons } from '../../util/Icon'
import { LocalCacheManager } from '../../util/LocalCacheManager'
import { screenSize } from '../../util/screenSize'
import { FormattedPost } from '../../util/type'
import MyTextInput from '../Comment/textInput'
import CollectionItem from './item'
import SelectionList from './selectionList'

import { LinearGradient } from 'expo-linear-gradient'
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

    const [currentSelection, setCurrentSelection] = useState(0)

    const lastY = useRef(0)


    const getCollection = async () => {


        let res = await LocalCacheManager.getPostCollectionByCurrentPage(userStore.userInfo.userInfo.id, currentPage.current)

        //console.log(res)
        postList.length === 0 ?
            setPostList([...res])
            :
            setPostList([...postList, ...res])
    }


    const collapseBottomTabBar = () =>{


    }

    const showBottomTabBar = () =>{

    }

    useEffect(() => {
        getCollection()

    }, [])

    return (
        <LinearGradient 
                        locations={[0.01,0.5,1]}
                        colors={['#FFFFFF','#F4F4F4']}
                        style={{width:screenSize.width,height:screenSize.height,alignItems:"center"}}
                        >

        <ScrollView 
        
        stickyHeaderIndices={[1]}
        style={{ width: screenSize.width, height: screenSize.height }}>
            
            <View style={{ backgroundColor: "transparent", marginBottom: 0 }}>
                
                <View style={{padding:10,height:60}}>
                    <MyTextInput
                        // @ts-ignore
                        style={styles}
                        placeholder={'輸入關鍵字...'}

                    />
                </View>
                
            </View>
            <SelectionList
                    setCurrentSelection={number => setCurrentSelection(() => number)}
                    currentSelection={currentSelection}
                />


            <FlatList
                onEndReached={()=>console.log('onReach')}
                showsVerticalScrollIndicator={false}
                style={{ padding: 5 }}
                data={postList}
                renderItem={({ item, index }) => (
                    <CollectionItem
                        item={item}
                        index={index}
                    />
                )}
                columnWrapperStyle={{
                    marginBottom: 10
                }}
                numColumns={2}




            />
           
        </ScrollView>
     </LinearGradient>
     )
}

export default Collection

const styles = StyleSheet.create({
    fontIconContainerStyle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: "#21CFFF",
        justifyContent: 'center',
        alignItems: "center",
        marginRight: 5
    },
    input: {
        width: screenSize.width - 20,
        flex:1,
        backgroundColor: "#F4F4F4",
        padding: 5,
        paddingLeft:20,
        borderRadius:20
    }
})
