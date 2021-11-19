import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { screenSize } from '../../../../util/screenSize'
import Header from './Header'
import Item from './Item'
import CommentContainer from './commentContainer'
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
const item = () => {

    const info = ['1','2','2','2','2','2','2','2','2','2','2','2']

    return (
            <View style={{width:screenSize.width,height:440}} >
                <Animated.View style={{position:'absolute',top:440,zIndex:1}} >
                    <CommentContainer  />
                </Animated.View>

                <FlatList  
                ListHeaderComponent={<Header CommentCount={130} />}
                data={info}     
                renderItem={({item,index})=>
                    <Item 
                    key={index}  
                    item={item} 
                    index={index} 
                    />
                 }
                keyExtractor={(item,index)=>index}
                />
            </View>
        
    )
}

export default item

const styles = StyleSheet.create({

})
