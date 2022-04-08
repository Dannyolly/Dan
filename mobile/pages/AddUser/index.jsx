import React, { useEffect ,useState} from 'react'
import { View, Text ,StyleSheet,TextInput,Keyboard} from 'react-native'
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '../../util/Icon'
import { screenSize } from '../../util/screenSize'
import { searchUser } from '../../api/api'
import {objTOParams} from '../../util/function'
import Loading from '../../components/Loading'
import Item from './item';
import { useNavigation } from '@react-navigation/native';

export default function index(  ) {
    const [value, onChangeText] = React.useState('');

    const [list, setList] = useState(undefined)

    const [loading,setLoading] = useState(false)

    const navigation = useNavigation()
    

    const searchFriend=()=>{
        let param  = objTOParams({
            username:value
        })
        setLoading(()=>true)
        searchUser(param).then(res=>{
            //console.log(res.data)
            setTimeout(()=>{
                setList(()=>res.data)
                setLoading(()=>false)
            },1000)
            
        })
    }

    useEffect(() => {

    }, [])

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
            <ScrollView style={{backgroundColor:"#FFFFFF",height:screenSize.height}}>
                <View style={{padding:20,paddingTop:60,width:screenSize.width,backgroundColor:"#FFFFFF"}}>
                    <AntDesign name="search1" size={18} style={{position:"absolute",left:30,top:70,zIndex:1}} />
                    <TextInput
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={styles.textStyle}
                    placeholder={"Dan號/名字/DID"}
                    editable
                    returnKeyType="search"
                    onSubmitEditing={searchFriend}
                    />
                </View>
                {
                    loading===true
                    &&
                    <Loading />
                }
                <View style={{flex:1}}>
                {
                    list!==undefined
                    &&
                    <FlatList  
                        data={list}
                        renderItem={ ({item})=><Item item={item} text={value} navigation={navigation} />  }
                        keyExtractor={item=>item.id.toString()}
                    />
                }
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    textStyle:{
        width:screenSize.width-40,
        height:40,
        backgroundColor:"#F7F5F8",
        borderRadius:20,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
        paddingLeft:40
    }
})
