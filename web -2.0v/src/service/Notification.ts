import { get } from "@/api/request"

const getAllNotification = (userId,lastId)=>get(
    '/getAllNotification',
    {
        userId,
        lastId
    }
)

const signNotification  = (ids)=>get(
    '/signNotification',
    {
        ids:JSON.stringify(ids)
    }
)

const sendFollowNotification = (fromId,toId)=>get<{status:boolean}>(
    '/sendFollowNotification',
    {
        fromId,
        toId
    }
)

export {
    getAllNotification,
    signNotification,
    sendFollowNotification

}