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

import { Component } from "react";


/**
 * @typedef UserInfo
 * @property {string} backgroundImage 
 * @property {number} cid
 * @property {string} id
 * @property {string} introduction
 * @property {number} online
 * @property {string} password
 * @property {string} qrcode
 * @property {string} username
 */


/**
 * @typedef Post
 * @property {number} id
 * @property {string} introduction
 * @property {number} likeCount
 * @property {Date} postDate
 * @property {String} postImage
 * @property {number} userId
 */


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
let a

interface ChatMsgA {
    
    id?: number ,

    text? : string ,

    image? : string ,

    isFinish? : boolean

    createdAt : Date , 

    user : {
        _id : number ,
        id :number ,
        name : string ,
        avatar : string 
    }
}




