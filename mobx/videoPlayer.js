import AsyncStorage from "@react-native-async-storage/async-storage"
import { makeObservable, observable, action ,makeAutoObservable} from "mobx"
import { observer } from 'mobx-react'
import { TouchableHighlightBase } from "react-native"
import Animated from "react-native-reanimated"
import { getAllFriend } from '../api/api'
import { defaultShowMessage, getUserMainInfo } from "../util/function"

class VideoPlayerStore {

    constructor() {
        makeAutoObservable(this)
       /* makeObservable(this,{
            isCall:observable,
            callTheKeyBoard:action
       }) */
    }

    isCall = false

    callTheKeyBoard(){
        this.isCall= !this.isCall
    }

    setIsCall( state ){
        this.isCall = state
    }

   
}

var videoPlayerStore = new VideoPlayerStore()


export {
    videoPlayerStore,
    observer
}