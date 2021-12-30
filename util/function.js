import AsyncStorage from "@react-native-async-storage/async-storage";

import { showMessage } from 'react-native-flash-message'
import { screenSize } from '../util/screenSize'




/**
 * @description 
 *          { name:abc,
 *          age:18  }       ==>    name=abc&age=18             
 *          
 * @param {ChatMsgA} obj 
 * @returns 
 */
function objTOParams(obj) {

    let keys = Object.keys(obj)
    let values = Object.values(obj)

    let str = ""
    for (const key in keys) {
        //console.log(keys[key],values[key])
        if (Number(key) + 1 !== keys.length) {

            str += `${keys[key]}=${values[key]}&`
        } else {
            str += `${keys[key]}=${values[key]}`
        }

    }
    return str
}

/**
 * @param {Number}  list 請求好友數組
 * @return {Number}
 */
function calculateRequestNotification(list) {
    let sum = 0
    for (const index in list) {
        if (list[index].read === 0) {
            sum += 1
        }
    }
    return sum

}

/**
 * 
 * @param {JSON} info 
 */
async function setUserMainInfo(info) {
    await AsyncStorage.setItem("userInfo", info)

}


async function getUserMainInfo() {
    let jsonRes = await AsyncStorage.getItem('userInfo')
    let res = JSON.parse(jsonRes)
    return res;
}


function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}


/**
 * @description 計算日期...
 * @explain    暫時只返回X月X日
 * @param {Date}
 */
const calculateDate = (date) => {
    if (date !== undefined) {
        let currentTime = new Date()
        let testDate = new Date(date)
        var drr = Math.abs(currentTime.getTime() - testDate.getTime());
        var day = parseInt(drr / (24 * 60 * 60 * 1000));
        var hours = parseInt(drr % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        var minutes = parseInt(drr % (60 * 60 * 1000) / (60 * 1000));
        var seconds = parseInt(drr % (60 * 1000) / 1000);
        var res = "相差" + day + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";



        //console.log(res);
        //console.log(`${currentTime.getMonth()+1}月${currentTime.getDate()}日`); 

        return `${testDate.getMonth()+1}月${testDate.getDate()}日`
    }

}

/**
 * @description 計算總和
 */
const calculateSum = (arr) => {
    let sum = 0;
    for (const item of arr) {
        sum += item
    }
    return sum
}



const transformToFormDataByPost = (uris, userId, introduction) => {
    let param = new FormData()
    param.append('userId', userId)
    param.append('introduction', introduction)
    let arr = []
    for (const item of uris) {
        param.append("files", {
            uri: item,
            type: 'multipart/form-data',
            name: ".png"
        })
    }
    //param.append('files',arr)


    return param

}


const transformToFormDataByMessage = (uris, senderId, receiverId) => {
    let param = new FormData()

    param.append('senderId', senderId)
    param.append('receiverId', receiverId)
    let arr = []
    for (const item of uris) {
        param.append("files", {
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
const transformToFormDataByRegisterInfo = (uris, users) => {
    let param = new FormData()
    param.append('users', users)
        //console.log(uris);
    let arr = []
    for (const item of uris) {
        //console.log(item);
        param.append("files", {
            uri: item,
            type: 'multipart/form-data',
            name: ".png"
        })
    }

    return param

}

/**
 * @description 假如只發一句話..
 * @param {{ message? : string , type? :string }: Options } options
 */
const defaultShowMessage = ({ message, type }) => {

    showMessage({
        icon: type || 'info',
        message: message,
        titleStyle: { position: "relative", fontSize: 14 },
        style: {
            height: 40,
            backgroundColor: "#8C8E8F",
            width: screenSize.width - 20,
            borderRadius: 10,
            paddingLeft: 20,
            left: 10,
            top: 40,
        }
    })
}



/**
 * @description  這個是負責上傳的各類操作
 */
class UpLoadHandler {


    /**
     * @confine     只給發送圖片用...
     * @description 轉化為FormData 即上傳圖片格式
     * @param {Array<String>} uris
     */
    static transformToFormDataByMessage = transformToFormDataByMessage


    /**
     * @confine     只給上傳文章用...
     * @description 轉化為FormData 即上傳圖片格式
     * @param {String} uri 
     */
    static transformToFormDataByPost = transformToFormDataByPost



    /**
     * @confine     只給發送注冊用...
     * @description 轉化為FormData 即上傳圖片格式
     * @param {Array<String>} uris
     */
    static transformToFormDataByRegisterInfo = transformToFormDataByRegisterInfo


}




export {
    objTOParams,
    calculateRequestNotification,
    setUserMainInfo,
    getUserMainInfo,
    uuid,
    calculateDate,
    calculateSum,
    transformToFormDataByMessage,
    transformToFormDataByPost,
    transformToFormDataByRegisterInfo,
    defaultShowMessage,


    UpLoadHandler


}