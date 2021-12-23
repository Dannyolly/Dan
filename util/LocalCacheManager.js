import AsyncStorage from "@react-native-async-storage/async-storage"
import { MessageHandler } from '../pages/Message/MessageHandler'


/**
 * @typedef {import('../api/api').UserInfo} UserInfo
 */


/**
 * 此為處理後的 POST
 * @typedef FormattedPost
 * @property {number} id
 * @property {string} introduction
 * @property {number} likeCount
 * @property {Date} postDate
 * @property {Array<String>} postImage
 * @property {number} userId
 * @property {Array<UserInfo} userInfo
 */


/**
 * 
 * @param {Array<FormattedPost>} post 
 * @param {number} userId
 */
const savePostToLocal = async(post, userId) => {

    let json = await AsyncStorage.getItem(`${userId}Post`)


    if (json === null) {
        await AsyncStorage.setItem(`${userId}Post`, JSON.stringify(post))
    } else {
        /** @type {Array<FormattedPost>} */
        let res = JSON(json)

        await AsyncStorage.setItem(`${userId}Post`, JSON.stringify([...res, ...post]))
    }


}



/**
 * @description 獲取所有Post
 * @param {number} userId
 * @returns {Array<FormattedPost>}
 */
const getAllPost = async(userId) => {

    return await JSON.parse((await AsyncStorage.getItem(`${userId}Post`)))

}

/**
 * @description 獲取Post
 * @param {number} userId
 * @param {number} currentPage 
 * @param {number} [pageSize]  默認為 5
 * @returns {Array<FormattedPost>}
 */
const getThePostFromLocalByCurrentPage = async(userId, currentPage, pageSize) => {
    /** @type {Array<FormattedPost>} */
    let res = JSON.parse((await AsyncStorage.getItem(`${userId}Post`)))

    let pageSizeTemp = pageSize ? pageSize : 5


    if (res === null || res === undefined) {
        return null
    } else {
        return res.slice((currentPage * pageSizeTemp), (currentPage * pageSizeTemp + pageSizeTemp))
    }

}




/** 
 * 
 * @description 用作存儲本地 
 * @target      Post , Message ... 暫時
 */

class LocalCacheManager {

    /**
     * @description 保存 POSt 到本地
     */
    static savePostToLocal = savePostToLocal

    /**
     * @description 獲取Post
     */
    static getThePostFromLocalByCurrentPage = getThePostFromLocalByCurrentPage

    /**
     * @description 獲取全部Post
     */
    static getAllPost = getAllPost


    /**
     * @description 保存 信息 到本地
     */
    static saveMessageToLocal = MessageHandler.saveTheMessageToLocal


    /**
     * @description 獲取 各類信息....
     */
    static getTheMessageFromLocalByCurrentPage = MessageHandler.getTheMessageFromLocalByCurrentPage




}



export {
    LocalCacheManager
}