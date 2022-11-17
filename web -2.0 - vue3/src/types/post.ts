import {UserInfo} from './user'
/**
 * @description 格式化的Post
 */

interface Post {
    user_id:    number;
    name:       string;
    avatar:     string;
    id:         number;
    title:      string;
    content:    string;
    images:     string;
    like:       number;
    comments:   number;
    created_at: string;
}

interface Comment {
  content: string;
  user_id: number;
  like: number;
  created_at: string;
  post_id: number;
  comment_id: number;
  rel_id: number;
  name: string;
  avatar: string;
}


/**
 * @description 格式化後的Post
 */
interface FormattedPost extends Post{
    
}

interface CollectPost extends Post{
  collect_time:string
}

export {
    FormattedPost , 
    Post,
    Comment,
    CollectPost
}