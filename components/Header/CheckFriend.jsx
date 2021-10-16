import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default function CheckFriend() {

    const navigation = useNavigation()




    return (
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('addUser')}>
            <View>
                <Text style={{fontSize:14}}>增加</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
