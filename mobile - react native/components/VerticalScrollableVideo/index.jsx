import React, { useRef ,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view';
import { screenSize } from '../../util/screenSize';
import { Pages } from 'react-native-pages';
import { FlatList } from 'react-native-gesture-handler';

const index = () => {
    const pagerViewRef = useRef(undefined)

    
    const viewRef = useRef([]).current

    const items = [1,2,3]
    

    const renderItem = ( { item ,index })=>{
        return(
            <View 
            ref={c=>viewRef.push(c)}
            key={`${index}`} 
            index={index}
            style={{justifyContent:"center",alignItems:"center",flex:1}} >
                <Text >{item}</Text>
            </View>
        )
    }

    return (
        <View style={styles.pagerView}>
            <PagerView style={styles.pagerView} 
        initialPage={0} 
        orientation={'vertical'} 
        
        ref={c=>pagerViewRef.current=c}
        //onPageSelected={e=>console.log('change1')}
        onPageScrollStateChanged={e=>console.log('change1')}
        >
            {
                items.map((item,index)=>{
                    return(
                        <View 
                        key={`${index}`} 
                        index={index}
                        style={{justifyContent:"center",alignItems:"center"}} >
                            <Text >{item}</Text>
                        </View>
                    )
                })
            }
        </PagerView>
        {/* <Pages style={styles.pagerView} 
        onScrollEnd={()=>console.log(viewRef)}
        horizontal={false} 
        indicatorOpacity={0} 
        indicatorColor={"rgba(0,0,0,0)"}>
            <FlatList
            data={items}
            renderItem={({item,index})=>renderItem({ item,index }) }
            />
        </Pages> */}

        </View>
    )
}

export default index

const styles = StyleSheet.create({
    pagerView:{
        width:screenSize.width,
        height:screenSize.height,
        backgroundColor:"#FFFFFF",
        
    }

})
