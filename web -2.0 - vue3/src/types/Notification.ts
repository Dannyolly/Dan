
class InformType{

    static CHAT = 1;

    static CHATROOM = 2;

    static SIGNATURE = 3;

    static INIT  = 4;

    static COMMENT = 6;

    static ADD_FRIENDS = 7;

    static LIKE = 8;

    //static SUBSCRIBE = 9;
    static PUBLISH_POST = 10;
}

// websocket entity 
interface Message<T extends Object>{
    user_id:number,
    to_id:number,
    message:string,
    mode:number,
    pic?:string,
    post_id?:number,
    extendField?:T
}
// 信息 --- post ...
interface PostNotification {
    comment_content: string;
    post_id: number;
    post_content: string;
    images: string;
    user_id: number;
    name: string;
    avatar: string;
    created_at: string;
    comments:number,
    id:number
  }

export {
    InformType,
    Message,
    PostNotification
}