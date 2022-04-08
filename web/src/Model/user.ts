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
    username : string, 
    backgroundImage : string ,
    icon : string 
}

export {
    UserInfo
}