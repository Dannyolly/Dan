import {storeKey, useStore as vueUseStore} from 'vuex'
import { UserInfo} from "@/types/user";
import { json } from 'stream/consumers';
import { PostNotification } from '@/types/Notification';
import { CollectPost, FormattedPost } from '@/types/post';
import { post } from '@/api/request';
import { ChatMsg, FormatChatMsg } from '@/types/chat';
import { noConflict } from 'lodash';
type Key = 'token' | 'userInfo' | 'account' |
     'notis-maxId' | 'notis' | "follows" | 'collect' 
     | 'chatMsg' | 'friendIds' | 'friendList'
type Token = string
// ---------------------------------------get------------------------------------
function getLocalStorageInfo<T extends 'token'>(key:T):Token | null
function getLocalStorageInfo<T extends 'userInfo'>(key:T):UserInfo 
function getLocalStorageInfo<T extends 'account'>(key:T):UserInfo[] | null

function getLocalStorageInfo<T extends 'notis-maxId'>(key:T,userid:string):string
function getLocalStorageInfo<T extends 'friendIds'>(key:T,userid:string):string[] | null;
function getLocalStorageInfo<T extends 'notis' | 'follows'>(key:T,userid:string):PostNotification[] | null;
function getLocalStorageInfo<T extends 'collect'>(key:T,userid:string):CollectPost[] | null;
function getLocalStorageInfo<T extends 'friendList'>(key:T,userid:number):UserInfo[] | null

function getLocalStorageInfo<T extends 'chatMsg'>(key:T,id:string,userid:number):FormatChatMsg[] | null;

function getLocalStorageInfo(key:Key,id?:string | number,userId?:number){
    let itemKey =  key +'';
    const map = {'token':1,'userInfo':1,'account':1}
    if(!map[key] ){
        itemKey = `${key}:${id}`
    }
    if(key === 'chatMsg'){
        itemKey = `${key}:${id}:${userId}`
    }
    const item = localStorage.getItem(itemKey)
    if(key === 'token'){
        return item
    }
    if(item){
        return JSON.parse(item)
    }else {
        // error ...
        /* throw new Error("null item ");
         */
        return null;
    }
}
// ------------------------------------handle------------------------------------

function handleToken(key:Key,token:Token){
    localStorage.setItem(key,token)
}
function handleUserInfo(key:Key,userInfo:UserInfo){
    localStorage.setItem(key,JSON.stringify(userInfo))
}
function handleArray(key:Key,any:any[]){
    // @ts-ignore
    let tmp = getLocalStorageInfo(key);
    if(tmp === null){
        localStorage.setItem(`${key}`,JSON.stringify([...any]))
        return;
    }
    
    localStorage.setItem(`${key}`,JSON.stringify([...any,...tmp]));
    
}

function handleDictionary(key:Key,arr:any[],id:string){
    const userId = LocalStorageManager.getLocalStorageInfo('userInfo').id
    let resJson = localStorage.getItem(`${key}:${id}:${userId}`);
    if(resJson){
        localStorage.setItem(`${key}:${id}:${userId}`,JSON.stringify( [...arr,...JSON.parse(resJson)]))
    }else{
        localStorage.setItem(`${key}:${id}:${userId}`,JSON.stringify(arr))
    }
    
}

function handleFriendIds(key:Key,arr:any[]){
    const userId = LocalStorageManager.getLocalStorageInfo('userInfo')?.id
    // @ts-ignore
    localStorage.setItem(`${key}:${userId}`,JSON.stringify([...arr]))

}

function handlePersonalArray(key:Key , arr:any[]){
    const userId = LocalStorageManager.getLocalStorageInfo('userInfo')?.id
    //@ts-ignore
    let tmp = getLocalStorageInfo(key,userId);
    if(tmp === null){
        localStorage.setItem(`${key}:${userId}`,JSON.stringify([...arr]))
        return;
    }
    localStorage.setItem(`${key}:${userId}`,JSON.stringify([...arr,...tmp]));
}

function baseHandle(key:Key,value:any){
    localStorage.setItem(key,value);
}

// ---------------------------------------set------------------------------------
type KeyOptions={
    token?:Token,
    userInfo?:UserInfo,
    account?:UserInfo[],
    maxId?:string,
    notis?:PostNotification[],
    follows?:PostNotification[],
    posts?:CollectPost[],
    chatMsg?:FormatChatMsg[],
    friendIds?:string[],
    friendList?:UserInfo[]
}

function setLocalStorageInfo(key:Key,keyOptions:KeyOptions,id?:string){
    const {
        token,
        userInfo,
        account,
        maxId,
        notis,
        follows,
        posts,
        chatMsg,
        friendIds,
        friendList
    } = keyOptions
    if(userInfo!==undefined){
        handleUserInfo(key,userInfo)
        return;
    }
    if(token!==undefined){
        handleToken(key,token)
        return;
    }
    if(account ){
        handleArray(key, account  );
        return;
    }
    if(notis || follows || posts || friendList){
        handlePersonalArray(key,notis || follows || posts! || friendList)
    }
    if(friendIds){
        handleFriendIds(key,friendIds)
        return;
    }
    if(chatMsg && id){
        handleDictionary(key,chatMsg,id);
        return;
    }
    baseHandle(key,maxId);
}

function removeLocalStorageInfo(key:Key,id?:number ,userId?:number){
    if(userId){
        localStorage.removeItem(`${key}:${id}:${userId}`) 
        return;
    }
    if(id){
       localStorage.removeItem(`${key}:${id}`) 
       return;
    }
    localStorage.removeItem(`${key}`) 
    
    
}

type PrimaryKey = 'noti' | 'like' | 'collect' | 'fol'
function setPrimaryKey(key:PrimaryKey  ,id:number,value?:any){
    const userId = LocalStorageManager.getLocalStorageInfo('userInfo').id
    localStorage.setItem(`${key}:${id}:${userId}`,value || ' ');
}

function getPrimaryKey(key:PrimaryKey,id:number):string | any{
    const userId = LocalStorageManager.getLocalStorageInfo('userInfo').id
    return localStorage.getItem(`${key}:${id}:${userId}`);
}

function removePrimaryKey(key:PrimaryKey,id:number){
    const userId = LocalStorageManager.getLocalStorageInfo('userInfo').id
    localStorage.removeItem(`${key}:${id}:${userId}`)
}


class LocalStorageManager{
    static getLocalStorageInfo = getLocalStorageInfo
    static setLocalStorageInfo = setLocalStorageInfo
    static removeLocalStorageInfo = removeLocalStorageInfo
    static setPrimaryKey = setPrimaryKey
    static getPrimaryKey = getPrimaryKey
    static removePrimaryKey = removePrimaryKey
    
}

export{
    LocalStorageManager
}


