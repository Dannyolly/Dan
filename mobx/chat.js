import AsyncStorage from "@react-native-async-storage/async-storage"
import { makeObservable, observable, action ,makeAutoObservable} from "mobx"
import { observer } from 'mobx-react'
import { TouchableHighlightBase } from "react-native"
import Animated from "react-native-reanimated"
import { getAllFriend } from '../api/api'
import { defaultShowMessage, getUserMainInfo } from "../util/function"

class MessageStore {

    containerSize = 0

    currentOffset = 0

    scrolling = false

    setContainerSize (  size ){
        this.containerSize = size
    }

    setCurrentOffset ( offset ){
        this.currentOffset = offset
    }

    setScrolling ( state ){
        this.scrolling = state
    }

    constructor() {
        makeAutoObservable(this)
    }

  

   
}

var messageStore = new MessageStore()


export {
    messageStore,
    observer
}