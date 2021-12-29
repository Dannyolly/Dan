import { uuid } from "../../util/function"
import { base_url } from "../../api/config"
import { signMessage } from "../../api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ws } from "../../webSocket"

/**
 * @description 第一次(或重連)初始化"),
 */
const CONNECT = 1

/**
 * @description 聊天信息
 */
const CHAT = 2

/**
 * @description 消息簽收
 */
const SIGNED = 3
    /**
     * @description 客戶端保持心跳
     */
const KEEPALIVE = 4
    /**
     * @description 拉取好友
     */
const PULL_FRIEND = 5



/**
 * 
 * @param {Number} action 
 * @param {Number} senderId 
 * @param {Number} receiverId 
 * @param {String} message 
 * @param {Array} messageIds 
 * @param {String} extraField
 */
const chatMsg = (action, senderId, receiverId, message, extraField) => {


    let obj = {
        action: action,
        chatMsg: {
            senderId: senderId,
            receiverId: receiverId,
            message: message,

        },
        extendField: extraField
    }

    return obj
}



/**
 * @description     信息格式...
 * @param {String}  text 
 * @param {Object}  info 這個先你想轉的info
 * @param {String}  image
 * @param {Object}  user
 * @param {Number}  user.id
 * @returns {ChatMsg}
 */
const getMsgFormat = (text, info, image, isFinish) => {

    let avatar = ''
    if (info.icon) {
        if (info.icon.substring(0, 1) === 'h') {
            avatar = info.icon
        } else {
            avatar = base_url + info.icon
        }
    } else if (info.avatar) {
        if (info.avatar.substring(0, 1) === 'h') {
            avatar = info.avatar
        } else {
            avatar = base_url + info.avatar
        }
    }


    return {
        _id: uuid(),
        text: text,
        image: image || undefined,
        isFinish: isFinish || undefined,
        createdAt: new Date(),
        user: {
            _id: info.sendUserId || info.id,
            id: info.sendUserId || info.id,
            name: info.username,
            avatar: avatar
        }

    }
}



/**
 * @typedef ChatMsg
 * @property {number}   _id
 * @property {string}   text
 * @property {image}    image 
 * @property {boolean}  isFinish
 * @property {Date}     createdAt
 * @property {{ _id:number , id :number , name :string , avatar :String  }}      user
 * @returns 
 */




/**
 * @description 簽收信息
 * @param {Number} msgIds 
 * @returns {Promise<Number>}
 */
const signTheMsg = async(msgIds) => {
    let ids = ""
    for (const index in msgIds) {
        if (msgIds.length - 1 == index) {
            ids += msgIds[index]
        } else {
            ids += msgIds[index] + ','
        }
    }

    return await signMessage(ids)
}



/**
 * 
 * @param {String} messageInfo 
 * @param {Number} friendId 
 * @param {Number} userId 
 */
const saveTheMessageToLocal = async(messageInfo, friendId, userId) => {
    /**
     *  @AsyncStorage保存格式     只是單對單的存儲格式...  
     *  @userId       自己
     *  @friendId     對方
     *  @msg 
     *  $friendId $msg $userId
     *  @structure
        messageInfo =[
            {
            creatTime:
            id: (  信息id )
            msg:
            receiveUserId
            sendUserId
            signFlag:
            }
        ]

        存儲的為 arr 
     */
    let json = await AsyncStorage.getItem(`${friendId}msg${userId}`)
    let newArr
    let res
        /*   即為第一次,則起一個數組 */
    if (json === null || json === undefined) {
        newArr = [messageInfo]

    } else {
        res = JSON.parse(json)
        newArr = [messageInfo, ...res]
    }

    //console.log(newArr);
    await AsyncStorage.setItem(`${friendId}msg${userId}`, JSON.stringify(newArr))

}

const getTheMessageFromLocal = async(senderId, receiverId) => {

    let json = await AsyncStorage.getItem(`${senderId}msg${receiverId}`)

    return JSON.parse(json)

}


/**
 * @description 由當前頁數獲取更多以前的信息...每頁只取14?個  即pageSize為10
 * @mark        最早的信息都是最前面的... 即數組首位
 * @param {number} senderId 
 * @param {number} receiverId 
 * @param {number} currentPage 
 * @returns {Array<ChatMsg}
 */
const getTheMessageFromLocalByCurrentPage = async(senderId, receiverId, currentPage) => {

    let res = await getTheMessageFromLocal(senderId, receiverId)
    if (res === null || res === undefined) {
        return null
    } else {
        return res.slice((currentPage * 14), (currentPage * 14 + 14))
    }

}

/**
 * @description 獲取全部信息...
 * @param {number} senderId 
 * @param {number} receiverId 
 */

/**
 * @description 獲取最後信息...用來首頁顯示
 * 
 */
const getFinalMessage = async() => {
    let res = await getTheMessageFromLocal(senderId, receiverId)

    return res === null ? null : res[0]
}



class MessageHandler {
    /**
     * @description 第一次(或重連)初始化"),
     */
    static CONNECT = 1

    /**
     * @description 聊天信息
     */
    static CHAT = 2

    /**
     * @description 消息簽收
     */
    static SIGNED = 3
        /**
         * @description 客戶端保持心跳
         */
    static KEEPALIVE = 4
        /**
         * @description 拉取好友
         */
    static PULL_FRIEND = 5


    /**
     * @description  可以轉為上傳需要的格式
     */
    static transformToChatMsg = chatMsg


    /**
     * @description     雙方發信息的格式
     * @param {String}  text 
     * @param {Object}  info 這個先你想轉的info
     * @param {String}  image
     * @param {Object}  user
     * @param {Number}  user.id
     * @returns {ChatMsg}
     */
    static getMsgFormat = getMsgFormat


    /**
     * @description 簽收信息
     * @param {Number} msgIds 
     * @returns {Promise<Number>}
     */
    static signTheMsg = signTheMsg

    /**
     * @description 由當前頁數獲取更多以前的信息...每頁只取14?個  即pageSize為10
     * @mark        最早的信息都是最前面的... 即數組首位
     * @param {number} senderId 
     * @param {number} receiverId 
     * @param {number} currentPage 
     * @returns {Array<ChatMsg}
     */
    static getTheMessageFromLocalByCurrentPage = getTheMessageFromLocalByCurrentPage

    /**
     * @description 獲取最後信息...用來首頁顯示
     */
    static getFinalMessage = getFinalMessage


    /**
     * @description 獲取全部信息..
     */
    static getTheMessageFromLocal = getTheMessageFromLocal

    /**
     * @description 保存全部信息...
     * @param {String} messageInfo 
     * @param {Number} friendId 
     * @param {Number} userId 
     */
    static saveTheMessageToLocal = saveTheMessageToLocal
}




export {
    CONNECT,
    CHAT,
    SIGNED,
    KEEPALIVE,
    PULL_FRIEND,

    chatMsg,
    getMsgFormat,
    signTheMsg,


    getTheMessageFromLocal,
    saveTheMessageToLocal,
    getTheMessageFromLocalByCurrentPage,
    getFinalMessage,


    MessageHandler

}