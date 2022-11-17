import { normalUrl } from "@/api/config"
import { get, Response } from "@/api/request"
import { ChatEntity, FormatChatMsg } from "@/types/chat"
import axios, { AxiosPromise } from "axios"

const getAllMsg = (id)=> get<FormatChatMsg[]>('/getAllMsg',{
    id
})

const signMessage = (ids) => get<number>('/signMessage',{
    ids
})

const sentPic = (file:File | null):Promise<Response<{path:string}>>=>{
    let param = new FormData()
    file && param.append('image',file);
    return axios({
      method:'post',
      url:'/api/sentPic',
      baseURL: normalUrl,
      data: param,
      headers: {
          'Content-Type': 'multipart/form-data',
      }
    })
}

export {
    getAllMsg,
    signMessage,
    sentPic
}


