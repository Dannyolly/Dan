import { normalUrl } from "@/api/config"
import { get, Response } from "@/api/request"
import { UserInfo } from "@/types/user"
import axios from "axios"

const userLogin = 
    (email:string,password:string) => get<{token:string,userInfo:UserInfo}>('/login',{
        email,
        password
    })

const getUserById = (id)=> get<UserInfo>(`/user/${id}`)

const register = 
    (name,password,code,email)=>get<{res:string,user:UserInfo}>('/register',{
        name,password,code,email
    })

const verify = (email) => get(`/verifyEmail/${email}`)

const getUserFds = (userId,page,pageSize) => get<UserInfo[]>('/getUserFriends',{
    userId,page,pageSize
})

const checkIsFriend = (user1Id,user2Id) => 
      get<{isFriend:boolean}>(`/checkIsFollow/${user1Id}/${user2Id}`)

const searchUserByWord = (word:string)=>get<UserInfo[]>('/searchUserByWord',{word})

const uploadBackGroundImage:(file:File,user_id:string)=>Promise<Response<{path:string}>> = (file,user_id)=>{
    let param = new FormData()
    file && param.append('image',file);
    param.append('user_id',user_id)
    return axios({
        method:'post',
        url:'/api/uploadBackgroundImage',
        baseURL: normalUrl,
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }) as unknown as Promise<Response<{path:string}>>
}

const uploadAvatar:(file:File,user_id:string)=>Promise<Response<{path:string}>> = (file,user_id)=>{
    let param = new FormData()
    file && param.append('image',file);
    param.append('user_id',user_id)
    return axios({
        method:'post',
        url:'/api/uploadAvatar',
        baseURL: normalUrl,
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }) as unknown as Promise<Response<{path:string}>>
}

const getUserByIds = (ids:number[])=>get<UserInfo[]>(
    '/getUserByIds',
    {
        ids
    }
)
export {
    userLogin,
    getUserById,
    register,
    verify,
    getUserFds,
    checkIsFriend,
    searchUserByWord,
    uploadBackGroundImage,
    uploadAvatar,
    getUserByIds
}
