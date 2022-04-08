/* import { uuid } from "../../util/function"
import { base_url } from "../../api/config"
import { signMessage } from "../../api/api"

import { ws } from "../../webSocket"
 */

import { base_url } from "@/api/config"
import { CONNECT, CHAT, KEEPALIVE, SIGNED, PULL_FRIEND } from "@/constant/chat"
import { ChatMsg } from "@/Model/chat"
import { signMessage } from "@/service/chat"
import { ws } from "@/websocket"
import { uuid } from '../utils/index'





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
 * @description 簽收信息
 */
const signTheMsg = async (msgIds: Array<Number>) => {
    let ids = ""
    for (const index in msgIds) {
        if (msgIds.length - 1 === Number.parseInt(index)) {
            ids += msgIds[index]
        } else {
            ids += msgIds[index] + ','
        }
    }
    return await signMessage(ids)
}




const saveTheMessageToLocal = async (messageInfo, friendId, userId) => {

    let json = await localStorage.getItem(`${friendId}msg${userId}`)
    let newArr
    let res
    /*   即為第一次,則起一個數組 */
    if (json === null || json === undefined) {
        newArr = [messageInfo]

    } else {
        res = JSON.parse(json)
        newArr = [messageInfo, ...res]
    }

    await localStorage.setItem(`${friendId}msg${userId}`, JSON.stringify(newArr))

}

const getTheMessageFromLocal = async (senderId, receiverId): Promise<Array<ChatMsg> | undefined> => {

    let json = await localStorage.getItem(`${senderId}msg${receiverId}`)
    if (json === null) {
        return undefined;
    }

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
const getTheMessageFromLocalByCurrentPage = async (senderId, receiverId, currentPage) => {

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
const getFinalMessage = async (senderId: number, receiverId: number) => {
    let res = await getTheMessageFromLocal(senderId, receiverId)

    return res === undefined ? null : res[0]
}



class MessageHandler {
    /**
     * @description 第一次(或重連)初始化"),
     */
    static CONNECT = CONNECT

    /**
     * @description 聊天信息
     */
    static CHAT = CHAT

    /**
     * @description 消息簽收
     */
    static SIGNED = SIGNED
    /**
     * @description 客戶端保持心跳
     */
    static KEEPALIVE = KEEPALIVE
    /**
     * @description 拉取好友
     */
    static PULL_FRIEND = PULL_FRIEND

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


    signTheMsg,
    getTheMessageFromLocal,
    saveTheMessageToLocal,
    getTheMessageFromLocalByCurrentPage,
    getFinalMessage,
    MessageHandler

}