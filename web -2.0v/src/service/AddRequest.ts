import { get } from "@/api/request"

const acceptAddRequest = (ids:number[])=>get(
    '/acceptRequest',
    {
        ids
    }
)


const getAllRequest = (userId)=> get('/getAllAddRequest',{userId});

export {
    acceptAddRequest,
    getAllRequest
}