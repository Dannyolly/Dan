
import { uploadPost } from "../service/post"
import { FormattedPost, Post } from "../Model/post"

const savePostToLocal = async (post: Array<FormattedPost>, userId: number) => {

    let json = localStorage.getItem(`${userId}Post`)

    if (json === null) {
        localStorage.setItem(`${userId}Post`, JSON.stringify(post))
    } else {

        let res: Array<FormattedPost> = JSON.parse(json)

        localStorage.setItem(`${userId}Post`, JSON.stringify([...post, ...res]))
    }

}



/**
 * @description 獲取所有Post
 */
const getAllPost = async (userId): Promise<Array<FormattedPost>| undefined>  => {
    let temp  = localStorage.getItem(`${userId}Post`)

    if(temp===null){
        return undefined
    }

    let res:Array<FormattedPost> =  JSON.parse(temp)
    return res

}

/**
 * @description 獲取Post
 * @param {number} userId
 * @param {number} currentPage 
 * @param {number} [pageSize]  默認為 5
 * @returns {Array<FormattedPost>}
 */
const getThePostFromLocalByCurrentPage = async (userId: number, currentPage: number, pageSize?: number): Promise<Array<FormattedPost> | undefined > => {
    let temp  = localStorage.getItem(`${userId}Post`)

    if(temp===null){
        return undefined;
    }

    let res:Array<FormattedPost> = JSON.parse(temp)

    let pageSizeTemp = pageSize ? pageSize : 5


    if (res === null || res === undefined) {
        return undefined
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

const savePostAsCollection = async (post: Post, userId: number) => {


    let json = localStorage.getItem(`${userId}PostCollection`)


    if (json === null) {
        let temp :Array<any> = []
        temp.push(post)
        localStorage.setItem(`${userId}PostCollection`, JSON.stringify(temp))
    } else {

        let res: Array<FormattedPost> = JSON.parse(json)

        localStorage.setItem(`${userId}PostCollection`, JSON.stringify([post, ...res]))
    }

}


const getPostAsCollection = async (userId: number): Promise<Array<FormattedPost>| undefined> => {

    let temp  = localStorage.getItem(`${userId}PostCollection`)

    if(temp===null){
        return undefined;
    }

    return JSON.parse(temp)

}

const checkPostSavedToCollection = async (userId: number, postId: number): Promise<boolean | undefined> => {

    let arr = await getPostAsCollection(userId)
    
    if(arr === undefined){
        return false
    }

    for (const item of arr) {
        if (item.id === postId) {

            return true
        }
    }
    return undefined
}

const getPostCollectionByCurrentPage = async (userId: number, currentPage: number, pageSize?: number) => {

    let res = await getPostAsCollection(userId)

    let pageSizeTemp = pageSize ? pageSize : 5


    if (res === null || res === undefined) {
        return null
    } else {
        return res.slice((currentPage * pageSizeTemp), (currentPage * pageSizeTemp + pageSizeTemp))
    }

}

const uploadUserPost = () =>{
    /* uploadPost() */
}

export class PostHandler {

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

    

}

