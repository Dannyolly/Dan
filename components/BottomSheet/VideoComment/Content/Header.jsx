import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { screenSize } from '../../../../util/screenSize'


/** @param {{CommentCount : number }} */
const Header = ({ CommentCount  }) => {
    return (
        <View style={{width:screenSize.width,justifyContent:'center',alignItems:'center'}}>
            <Text>{CommentCount} 條評論</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})
