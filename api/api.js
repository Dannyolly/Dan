import { chatMsg, PULL_FRIEND } from '../pages/Message/MessageHandler'
import { transformToFormDataByMessage, transformToFormDataByPost, transformToFormDataByRegisterInfo } from '../util/function'
import {
    get,
    post,
    axios
} from './config'
import { AxiosResponse } from 'axios'
import { ws } from '../webSocket'
//const userLogin=(username,password)=>get(`/login?username=${username}&password=${password}`)
/* login?username=danny&password=28300136 */
const userLogin = (username, password) => get(`/login?username=${username}&password=${password}`)

const checkLogIn = (sessionId) => get(`/checkLogin?sessionId=${sessionId}`)

const uploadIcon = (url, id) => {

    let param = new FormData()
        //console.log(base64ToFile(base64));
    console.log('id=', id);
    param.append('id', id)
    param.append('file', {
        uri: url,
        type: 'multipart/form-data',
        name: ".png"
    })
    return axios({
        method: 'POST',
        url: '/upLoadIcon',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

const uploadBackgroundImage = (url, id) => {
    let param = new FormData()
    param.append('id', id)
    param.append('file', {
        uri: url,
        type: 'multipart/form-data',
        name: ".png"
    })
    return axios({
        method: 'POST',
        url: '/upLoadBackgroundImage',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}


const getUserIcon = (id) => get(`/getUserIcon?id=${id}`)


// friend 

const getAllFriend = (id) => get(`/friendList?userId=${id}`)




/**
 * 
 * @param {object} info 
 * @returns {Promise<AxiosResponse<Array<UserInfo>>>}
 */
const searchUser = (info) => get(`/searchUser?${info}`)

const updateUserInfo = (info) => get(`/updateUserSetting?${info}`)

const addRequest = (userId, otherId, message) => {


    let chatFormatMsg = chatMsg(PULL_FRIEND, userId, otherId, "", "")

    ws.send(JSON.stringify(chatFormatMsg))

    // get(`/addRequest?senderId=${userId}&receiverId=${otherId}&message=${message}`)

}
const getAllFriendRequest = (userId) => get(`/getAddRequest?userId=${userId}`)

const confirmRequest = (requestId, receiverId, senderId) => get(`/confirmRelationship?requestId=${requestId}&senderId=${senderId}&receiverId=${receiverId}`)

/** 這個是讀好友請求的... */
const readMessage = (id) => get(`/readMessage?id=${id}`)

const signMessage = (id) => get(`/signMsg?ids=${id}`)

const getAllNotReceiveMsg = (userId) => get(`/getNotReceiveMsg?userId=${userId}`)
    /**
     * 
     * @param {Number} userId 
     * @param {Number} online  0 為下線 1為上線...
     * @returns {Promise} res
     */
const online = (userId, online) => get(`/online?id=${userId}&online=${online}`)


/**
 * @description 上傳文章
 * @param {Array<String>} files 
 * @param {Number} userId 
 * @param {String} introduction 
 */
const uploadPost = (files, userId, introduction) => {
    let param = transformToFormDataByPost(files, userId, introduction)
    return axios({
        method: 'POST',
        url: '/uploadPost',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

/**
 * @description 上傳圖片
 * @param {Array<String>} files 
 * @param {Number} userId 
 * @param {Function} setProgress
 */
const sendPic = (files, senderId, receiverId, setProgress) => {
    let param = transformToFormDataByMessage(files, senderId, receiverId)

    return axios({
        method: 'POST',
        url: '/sendMessage',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
            let present = (progressEvent.loaded / progressEvent.total * 100 | 0) //上传进度百分比
            setProgress(present * 0.01)
                //console.log(present*0.01);
                /* setTimeout(()=>{r
                    setProgress(0)
                },4000) */

        }
    })
}

/**
 * @description 注冊
 * @param {Array<String>} files 
 * @param {Object} users
 */
const register = (files, users, setProgress) => {
    let param = transformToFormDataByRegisterInfo(files, users)

    return axios({
        method: 'POST',
        url: '/register',
        baseURL: 'http://dandan.ihk.vipnps.vip/',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
            let present = (progressEvent.loaded / progressEvent.total * 100 | 0) //上传进度百分比
            setProgress(present * 0.01)
                //console.log(present);
        },

    })
}

/**
 * 
 * @param {object} info 
 * @returns {Promise<AxiosResponse<Array<Post>>>}
 */
const getAllUserOwnPost = (userId, page, pageSize) => get(`/getUserOwnPost?userId=${userId}&page=${page}&pageSize=${pageSize}`)



/**
 * 
 * @param {object} info 
 * @returns {Promise<AxiosResponse<Array<Post>>>}
 */
const getAllUserPost = (userId, page, pageSize) => get(`/getAllPost?userId=${userId}&page=${page}&pageSize=${pageSize}`)

const addComment = (userId, postId, commentInfo) => get(`/addComment?userId=${userId}&postId=${postId}&commentInfo=${commentInfo}`)

const getAllComment = (postId, page, pageSize) => get(`/getComment?postId=${postId}&page=${page}&pageSize=${pageSize}`)

const getAllCommentCount = (postId) => get(`/getAllCommentCount?postId=${postId}`)

const addLike = (postId, userId, likeCount) => get(`/likeCount/add?postId=${postId}&userId=${userId}&likeCount=${likeCount}`)

const cancelLike = (postId, userId, likeCount) => get(`/likeCount/cancel?postId=${postId}&userId=${userId}&likeCount=${likeCount}`)

const likeCheck = (postId, userId) => get(`/like/check?postId=${postId}&userId=${userId}`)



/**
 * @type
 * @description 下列為和類的type 
 * 
 */

/**
 * @typedef UserInfo
 * @property {string} backgroundImage 
 * @property {number} cid
 * @property {number} id
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

export {
    userLogin,
    checkLogIn,
    uploadIcon,
    uploadBackgroundImage,
    getUserIcon,
    updateUserInfo,
    register,

    getAllFriend,
    searchUser,
    addRequest,
    getAllFriendRequest,
    confirmRequest,
    readMessage,
    signMessage,
    getAllNotReceiveMsg,
    online,


    uploadPost,
    sendPic,
    getAllUserPost,
    getAllUserOwnPost,
    addComment,
    getAllComment,
    getAllCommentCount,
    addLike,
    cancelLike,
    likeCheck,



}