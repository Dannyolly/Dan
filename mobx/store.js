import AsyncStorage from "@react-native-async-storage/async-storage"
import { makeObservable, observable, action } from "mobx"
import { observer } from 'mobx-react'
import { TouchableHighlightBase } from "react-native"
import Animated from "react-native-reanimated"
import { getAllFriend } from '../api/api'
import { defaultShowMessage, getUserMainInfo } from "../util/function"


class UserInfoStore {

    text = ""


    /**
     * @type {{
     *  userInfo: import("../api/api").UserInfo
     *  
     * 
     * }}
     */
    userInfo = undefined


    /* 這里是用來看有多少個朋友請求 */
    friendRequestInfo = undefined

    friendRequestDidNotReadNumber = 0

    /*  看看有多少未讀信息... */
    unreadMessage = []

    unreadMessageCount = 0

    isSignIn = false

    //記錄當前Scroll 的值...
    /**
     * @value  {Animated.Value} currentTopOffset 
     */
    currentTopOffset = 0


    registerProgress = 0


    submitInfo = {
        username: '',
        password: '',
        introduction: '',
        backgroundImage: '',
        icon: ''
    }

    constructor() {
        makeObservable(this, {
            /* field */
            userInfo: observable,
            friendRequestInfo: observable,
            friendRequestDidNotReadNumber: observable,
            unreadMessage: observable,
            unreadMessageCount: observable,
            text: observable,
            currentTopOffset: observable,
            registerProgress: observable,
            submitInfo: observable,
            isSignIn: observable,

            /* function  */
            setUserInfo: action,
            setFriendRequestInfo: action,
            setFriendRequestDidNotRead: action,
            setUnReadMessage: action,
            resetUnReadMessage: action,
            calculateUnreadMsgCount: action,
            setCurrentTopOffset: action,
            setUnReadMessageCount: action,
            setText: action,
            setFriendRequestIsAlreadyRead: action,
            setRegisterProgress: action,
            setSubmitInfo: action,
            setIsSignIn: action,
        })
    }

    setIsSignIn(flag) {
        this.isSignIn = flag
    }

    setSubmitInfo(key, info) {
        this.submitInfo[key] = info
    }

    setRegisterProgress(progress) {
        this.registerProgress = progress
    }

    setUserInfo(userInfo) {
        // 观察者不会看到中间状态.
        this.userInfo = userInfo

    }

    setFriendRequestInfo(info) {
        this.friendRequestInfo = info
    }


    setText(info) {
        this.text = info
    }

    setCurrentTopOffset(offset) {
        this.currentTopOffset = offset
    }

    /**
     * @description 未查看好友請求
     */
    setFriendRequestDidNotRead(num) {
        this.friendRequestDidNotReadNumber = num
    }

    /**
     * @description  已全部查看
     */
    setFriendRequestIsAlreadyRead() {
        this.friendRequestDidNotReadNumber = 0
    }


    setUnReadMessageCount(count) {
        this.unreadMessageCount = count
    }

    /* ------------------------------主頁....信息-------------------------------------- */

    /**
     * @description 根據好友個數起最大
     */
    async resetUnReadMessage() {
        let userInfo = await getUserMainInfo()
        this.unreadMessage = []
        getAllFriend(userInfo.userInfo.id).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.unreadMessage.push([])
            }
        })

    }

    /**
     * @description 數組中的信息..
     * @param {Object} unReadMessage 信息  
     * @param {boolean} isReset 是否把數組清空
     * @param {boolean} isArr   判斷是否數組傳入 正常為對象..
     * @format [ {info}, .... ]
     */
    setUnReadMessage(unReadMessage, index, isReset, isArr) {
        if (isReset !== undefined) {
            this.unreadMessage[index] = []
        } else if (isArr !== undefined) {
            this.unreadMessage = [...unReadMessage]
        } else {
            this.unreadMessage[index].push(unReadMessage)
        }

    }

    /**
     * @description 計算總共有多少未讀消息..
     */
    calculateUnreadMsgCount() {
        let count = 0
        for (const item of this.unreadMessage) {
            count += item.length
        }
        this.unreadMessageCount = count
    }


}

var userStore = new UserInfoStore()

/* userStore.resetUnReadMessage() */


/**
 * 关于自定义类型的描述
 * @typedef {String} myType
 */

/**
 * 关于自定义类型的描述
 * @param {myType} val - 使用自定义的类型
 */
function myFn(val) {
    console.log(val);
}



/**
 * 指定一个对象对命名空间
 * @namespace
 */
var MyNamespace = {
    /**
     * 表示为 MyNamespace.fn
     * @returns {*}
     */
    fn: function() {},
    /**
     * 表示为 MyNamespace.a
     * @type {number}
     * @typedef number 
     */
    a: 1
}

/**
 * 手动指定命名空间
 * @namespace MyNamespace
 */
/**
 * 一个成员函数，MyNamespace.myFn
 * @function
 * @returns {*}
 * @memberof MyNamespace
 */
function myFn1() {

}


export {
    userStore,
    observer
}