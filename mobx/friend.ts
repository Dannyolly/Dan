import AsyncStorage from "@react-native-async-storage/async-storage"
import { makeObservable, observable, action, makeAutoObservable } from "mobx"
import { observer } from 'mobx-react'
import { TouchableHighlightBase } from "react-native"
import Animated from "react-native-reanimated"
import { getAllFriend, UserInfo } from '../api/api'
import { defaultShowMessage, getUserMainInfo } from "../util/function"

class FriendStore {


    friendList : Array<UserInfo> = []

    setFriendList(list : Array<UserInfo>) {
        this.friendList = list
    }

    constructor() {
        makeAutoObservable(this)
    }




}

var friendStore = new FriendStore()


export {
    friendStore,
    observer
}