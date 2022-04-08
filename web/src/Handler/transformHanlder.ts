import { base_url } from "../api/config"
import { FormatChatMsg } from "../Model/chat"
import { uuid } from "../utils"

export class TransFormHanlder {

    /**
     * @confine     只給上傳貼子用...
     * @description 轉化為FormData 即上傳圖片格式
     */
    static transformToFormDataByPost(files:File[], userId:string, introduction:string) {
        let param = new FormData()
        param.append('userId', userId)
        param.append('introduction', introduction)
        for (const file of files) {
            param.append("files",file,'.png');
        }
        return param
    }

    /**
     * @confine     只給發送信息用...
     * @description 轉化為FormData 即上傳圖片格式
     */
     static transformToFormDataByMessage(uris, senderId, receiverId){
        let param = new FormData()
    
        param.append('senderId', senderId)
        param.append('receiverId', receiverId)
        for (const item of uris) {
            param.append("files", {
                // @ts-ignore
                uri: item,
                type: 'multipart/form-data',
                name: ".png"
            })
        }
        return param
    }

    /**
     * @confine     只給發送注冊用...
     * @description 轉化為FormData 即上傳圖片格式
     * @param {Array<String>} uris
     */
     static transformToFormDataByRegisterInfo (uris, users) {
        let param = new FormData()
        param.append('users', users)
        for (const item of uris) {
            //console.log(item);
            param.append("files", {
                // @ts-ignore
                uri: item,
                type: 'multipart/form-data',
                name: ".png"
            })
        }
        return param
    }

    /**
     * 
     * @description  轉化為服務器需要的格式
     */
    static transformToServiceFormat(action, senderId, receiverId, message, extraField?){

        let obj = {
            action: action,
            chatMsg: {
                senderId: senderId,
                receiverId: receiverId,
                message: message,
    
            },
            extendField: extraField
        }
        return obj
    }

    /**
     * @description 轉化為FormatMsg
     */
    static transformToFormatMsg(text:string | undefined, userInfo:any, image?:string, isFinish?:boolean):FormatChatMsg{

        let avatar = ''
        if (userInfo.icon) {
            if (userInfo.icon.substring(0, 1) === 'h') {
                avatar = userInfo.icon
            } else {
                avatar = base_url + userInfo.icon
            }
        } else if (userInfo.avatar) {
            if (userInfo.avatar.substring(0, 1) === 'h') {
                avatar = userInfo.avatar
            } else {
                avatar = base_url + userInfo.avatar
            }
        }

        return {
            _id: parseInt(uuid()),
            text: text,
            image: image || undefined,
            isFinish: isFinish || undefined,
            createdAt: new Date(),
            user: {
                _id: userInfo.sendUserId || userInfo.id,
                id: userInfo.sendUserId || userInfo.id,
                name: userInfo.username,
                avatar: avatar
            }

        }
    }


}