import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import * as Progress from 'react-native-progress';
import { screenSize } from '../../util/screenSize';
import CacheImage from '../NonIdCachedImage'

const index = ({ progress ,color ,size ,showsText ,circle }) => {
    return (
        <View>
            {
                /* circle===true? */
                <Progress.Circle  color={ color || "#CDCDCD"} progress={progress} size={ size ||100}   showsText={true} textStyle={'#CDCDCD'} />
                /* :
                <Progress.Pie  color={ color || "#CDCDCD"} progress={progress} size={ size ||100}  showsText={showsText} />
                 */
                
            }
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
