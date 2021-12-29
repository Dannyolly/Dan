import AsyncStorage from "@react-native-async-storage/async-storage"
import Message from "../components/Header/Message"
import { Post } from "../pages/Discover"
import { MessageHandler } from '../pages/Message/MessageHandler'
import { FormattedPost } from "./type"


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
        let res = JSON.parse(json)

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
 * @target      Post , Message  ( 12/29 ) 新增了可以保存貼子... 暫時
 * 
 */

const savePostAsCollection = async (post : Post ,userId:number ) => {
    

    let json  = await AsyncStorage.getItem(`${userId}PostCollection`)


    if (json === null) {
        let temp = []
        temp.push(post)
        await AsyncStorage.setItem(`${userId}PostCollection`, JSON.stringify(temp))
    } else {

        let res:Array<FormattedPost> = JSON.parse(json)

        await AsyncStorage.setItem(`${userId}PostCollection`, JSON.stringify([post,...res]))
    }
    
}


const getPostAsCollection = async (userId:number ):Promise<Array<FormattedPost>> => {
    
    return  JSON.parse(await AsyncStorage.getItem(`${userId}PostCollection`))

}

const checkPostSavedToCollection = async (userId : number, postId : number ):Promise<boolean> =>{

    let arr = await getPostAsCollection(userId)
    for (const item of arr) {
        if(item.id === postId) {
    
            return true
        }
    }
    return false
}   

const getPostCollectionByCurrentPage = async (userId : number,currentPage : number , pageSize? : number ) =>{

    let res = await getPostAsCollection(userId)

    let pageSizeTemp = pageSize ? pageSize : 5


    if (res === null || res === undefined) {
        return null
    } else {
        return res.slice((currentPage * pageSizeTemp), (currentPage * pageSizeTemp + pageSizeTemp))
    }

}


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


    /**
     * @description 獲取所有信息...
     */
    static getAllMessageFromLocal = MessageHandler.getTheMessageFromLocal


    /**
     * @description 保存Post到收藏...
     */
    static savePostToCollection = savePostAsCollection

    /**
     * @description 獲取Post到收藏....
     */
    static getPostCollection = getPostAsCollection

    /**
     * @description (分頁...) 獲取Post到收藏....
     */
    static getPostCollectionByCurrentPage = getPostCollectionByCurrentPage

    /**
     * @description 檢查是否保存到收藏......
     */
    static checkPostSavedToCollection = checkPostSavedToCollection

}



export {
    LocalCacheManager
}