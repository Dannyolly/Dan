import { UserInfo } from "./user";

interface ChatMsg {
    _id:number, 
    text:string,
    image:string,
    isFinish:boolean,
    createdAt:Date,
    user:UserInfo
}

interface FormatChatMsg {
    _id:number, 
    text:string | undefined,
    image:string | undefined,
    isFinish:boolean | undefined ,
    createdAt:Date,
    user:{
        _id: number,
        id: number,
        name: string,
        avatar: string
    }
}

export {
    ChatMsg,
    FormatChatMsg
}