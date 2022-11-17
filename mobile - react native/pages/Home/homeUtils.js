import { getUserMainInfo } from "../../util/function"
import { getAllFriend } from "../../api/api"
/**
 * 加載未讀消息...
 */
const loadingUnread = () => {

}


/**
 * @description 根據好友個數獲取最大的空數組   比如1好友 ,則數組為 [ [] ] 2則 [ [],[] ]
 */
const getMostUnReadMessageArr = async() => {
    let userInfo = await getUserMainInfo()
    let arr = []
    let { data } = await getAllFriend(userInfo.userInfo.id)
    for (let i = 0; i < data.length; i++) {
        arr.push([])
    }
    return arr;
}

const dateCompare = (a, b, isDesc) => {
    let dateA = Date.parse(a.lastMsgDetail.createdAt)
    let dateB = Date.parse(b.lastMsgDetail.createdAt)


    if (dateA - dateB > 0) {
        return -1
    } else if (dateA - dateB < 0) {
        return 1
    } else {
        return 0
    }
}


export {
    getMostUnReadMessageArr,
    dateCompare

}