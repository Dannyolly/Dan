
import { getUserMainInfo } from "../../util/function"
import { getAllFriend } from "../../api/api"
/**
 * 加載未讀消息...
 */
const loadingUnread=()=>{

}


/**
     * @description 根據好友個數獲取最大的空數組   比如1好友 ,則數組為 [ [] ] 2則 [ [],[] ]
     */
const getMostUnReadMessageArr= async ()=>{
    let userInfo = await getUserMainInfo()
    let arr = []
    let { data } = await getAllFriend(userInfo.userInfo.id)
    for(let i = 0 ;i<data.length;i++){
        arr.push([])
    }
    return arr;
}


export{
    getMostUnReadMessageArr

}