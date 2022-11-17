/**
 * @description UserInfo 用戶屬性
 */
interface UserInfo {
    id: number,
    name: string,
    avatar: string
    email?: string
    background?: string
    password?:string
}

export {
    UserInfo
}