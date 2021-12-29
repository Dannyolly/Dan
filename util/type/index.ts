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


/**
 * @description UserInfo 用戶屬性
 */
interface UserInfo {

    id: number ,

    cid : number ,

    introduction : string ,

    online : number ,

    password : string ,

    qrcode : string ,

    username : string 


}

/**
 * @description 格式化後的Post
 */
interface FormattedPost {


    id : number , 

    introduction :string ,

    likeCount :number,

    postDate : Date,

    postImage : Array<String>,

    userId : number ,

    userInfo : Array<UserInfo>

}

/**
 * @description 未格式化的Post
 */
interface Post {

     id : number , 

     introduction :string ,
 
     likeCount :number,
 
     postDate : Date,
 
     postImage : Array<String>,

     userId : number ,
}

export{
    FormattedPost , 
    UserInfo ,
    Post

}

