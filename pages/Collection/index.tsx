import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { userStore } from '../../mobx/store'
import { MaterialIcons } from '../../util/Icon'
import { LocalCacheManager } from '../../util/LocalCacheManager'
import { screenSize } from '../../util/screenSize'
import { FormattedPost } from '../../util/type'
import MyTextInput from '../Comment/textInput'
import CollectionItem from './item'
import SelectionList from './selectionList'


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

    const getCollection = async () => {


        let res = await LocalCacheManager.getPostCollectionByCurrentPage(userStore.userInfo.userInfo.id, currentPage.current)

        //console.log(res)
        postList.length === 0 ?
            setPostList([...res])
            :
            setPostList([...postList, ...res])
    }


    useEffect(() => {
        getCollection()

    }, [])

    return (
        <ScrollView style={{ width: screenSize.width, height: screenSize.height }}>
            <View style={{ backgroundColor: "#FFFFFF", marginBottom: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10, backgroundColor: '#FFFFFF', paddingTop: 20 }} >
                    {/* <View style={[styles.fontIconContainerStyle,{position:'absolute',left:20,top:10}]}>
                        <MaterialIcons name={'collections'}
                            style={{ fontSize: 17, lineHeight: 30, color: "#ffffff" }} />
                    </View> */}
                    <Text style={{ color: "#21CFFF", fontWeight: 'bold', fontSize: 16 }} >收藏</Text>

                </View>
                <View style={{padding:10}}>
                    <MyTextInput
                        // @ts-ignore
                        style={styles}
                        placeholder={'輸入關鍵字...'}

                    />
                </View>
                <SelectionList
                    setCurrentSelection={number => setCurrentSelection(() => number)}
                    currentSelection={currentSelection}
                />
            </View>



            <FlatList
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
        height: 40,
        backgroundColor: "#F4F4F4",
        padding: 5,
        paddingLeft:20,
        borderRadius:20
    }
})
