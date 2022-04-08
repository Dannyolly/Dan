import {UserInfo} from './user'
/**
 * @description 未格式化的Post
 */
interface Post {
    id: number,
    introduction: string,
    likeCount: number,
    postDate: Date,
    postImage: Array<String>,
    userId: number | undefined,
}

/**
 * @description 格式化後的Post
 */
interface FormattedPost extends Post {
 
    userInfo : Array<UserInfo>
}


export {
    FormattedPost , 
    Post
}