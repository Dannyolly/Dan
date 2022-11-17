/**
 * @description 
 *          { name:abc,
 *          age:18  }       ==>    name=abc&age=18             
 *          
 * @param {ChatMsgA} obj 
 * @returns 
 */
export function objTOParams(obj) {
    let keys = Object.keys(obj)
    let values = Object.values(obj)
    let str = ""
    for (const key in keys) {
        if (Number(key) + 1 !== keys.length) {
            str += `${keys[key]}=${values[key]}&`
        } else {
            str += `${keys[key]}=${values[key]}`
        }
    }
    return str
}




export function uuid() {
    var s: Array<any> = [];
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
 */

export const calculateDate = (date: Date | undefined ) => {
    if (date !== undefined) {
        let currentTime = new Date()
        let testDate = new Date(date)
        var drr = Math.abs(currentTime.getTime() - testDate.getTime());
        // @ts-ignore
        var day = parseInt(drr / (24 * 60 * 60 * 1000));
        // @ts-ignore
        var hours = parseInt(drr % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        // @ts-ignore
        var minutes = parseInt(drr % (60 * 60 * 1000) / (60 * 1000));
        // @ts-ignore
        var seconds = parseInt(drr % (60 * 1000) / 1000);
        var res = "相差" + day + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";

        //console.log(res);
        //console.log(`${currentTime.getMonth()+1}月${currentTime.getDate()}日`); 

        return `${testDate.getMonth() + 1}月${testDate.getDate()}日`
    }
    return undefined
}


type Platform = 'windows' |
    'macOS'     | 
    'ios'       |
    'android'   |
    'Ubuntu'    |
    'other'     |
    'ipad'      

export const getPlatform = (): Platform => {
    let u = navigator.userAgent
    
    if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
        return 'windows'
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
        return 'macOS'
    } else if (!!u.match(/iphone/i) ) {
        return 'ios'
    } else if (u.match(/android/i)) {
        return 'android'
    } else if (u.match(/Ubuntu/i)) {
        return 'Ubuntu'

    } else if (u.match(/ipad/i)) {
        return 'ipad'
    } else{
        return 'other'
    }
}

interface Dimension {
    width :number,
    height: number
}
export const getDimension =():Dimension =>{
     
    return {
        width : document.body.clientWidth,
        height : document.body.clientHeight
    }
    
}

const convertBase64UrlToBlob=(urlData) : Blob =>{
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  } 

export {
    Platform
}







