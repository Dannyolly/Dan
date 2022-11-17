import { UserInfo } from '@/Model/user'
import { Button } from 'antd'
import { makeAutoObservable } from 'mobx'

class UserStore {

    userInfo: UserInfo  | undefined = undefined
    isLogin: boolean    | undefined = false
    username:string     | undefined = undefined
    password:string     | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    setUserInfo(info: UserInfo) {
        this.userInfo = info
    }
    setIsLogin( state:boolean){
        this.isLogin = state 
    }
    setUserName(username:string){
        this.username  = username
    }
    setPassWord(password:string){
        this.password  = password
    }

}




const userStore = new UserStore()

export {
    userStore
}