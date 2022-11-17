import { USERS_INFO, CURRENT_USER_INFO} from "../constant/storageKey"
import { UserInfo } from "@/Model/user"

export  class  UserHandler  {

    static saveUserInfoToLocal(id,userInfo :UserInfo | undefined){
        const userInfoArr = UserHandler.getUserInfoFromLocal(id)
        if(userInfoArr===undefined){
            return localStorage.setItem(USERS_INFO(id),JSON.stringify(userInfo))
        }
        localStorage.setItem(USERS_INFO(id),JSON.stringify(userInfo))
    }

    static getUserInfoFromLocal(id):UserInfo | null{
        const json = localStorage.getItem(USERS_INFO(id))
        if(json===null){
            return null
        }
        return JSON.parse(json)
    }
    
    static saveCurrentUserInfo(userInfo :UserInfo | undefined):void{
        const json = localStorage.setItem(CURRENT_USER_INFO,JSON.stringify(userInfo))
        
    }

    static getCurrentUserInfo():UserInfo | null{
        const json = localStorage.getItem(CURRENT_USER_INFO)
        if(json===null){
            return null
        }
        return JSON.parse(json)
    }

    static removeCurrentUserInfo():void{
        localStorage.removeItem(CURRENT_USER_INFO)
    }
}



