import { get } from "@/api/request"
import { Comment } from '@/types/post'
const comment = (user_id,postId,content)=>get(
    '/comment',
    {
        user_id,
        postId,
        content
    }
)

const getPostComments = (postId,pageSize,page)=>get<Comment[]>(
    '/getPostComments',
    {
        postId,
        pageSize,
        page
    }
)    

export {
    comment,
    getPostComments
}