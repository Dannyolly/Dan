<template>
  <div class="app" ref="app">
      <router-view>
      </router-view>
      <MobileDrawer/>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, toRef, watchEffect } from 'vue';
import MobileDrawer from './components/MobileDrawer.vue';
import LeftBar from './views/LeftBar.vue';
import MidBar from './views/MidBar.vue';
 import { ws} from '@/websocket'
import { LocalStorageManager } from './utils/localStorage';
import { NotificationReceiver } from './utils/Notification';
import { useNotificationStore } from './store/Notification';
import { InformType, Message, PostNotification } from './types/Notification';
import { signNotification } from '@/service/Notification'
import { storeToRefs } from 'pinia';
import { Comment } from './types/post';
import { usePubSub } from './hooks/usePubSub';
import { ElNotification } from 'element-plus';
import { ChatEntity, FormatChatMsg } from '@/types/chat'
import { Response } from '@/api/request'
import { getAllMsg, signMessage } from './service/chat';
import { useUserStore } from './store/user';
import { useChatStore } from './store/Chat';
import { ChatHelper  } from '@/utils/chat'
import { findIndex } from 'lodash';
import { isDeepStrictEqual } from 'util';
import { getUserById, getUserFds } from './service/user';
import { ChatLineSquare } from '@element-plus/icons-vue';
import { uuid } from './utils/uuid';
import { acceptAddRequest } from './service/AddRequest';
import { useMutationObserver, useResizeObserver } from '@vueuse/core';

const { setFollows , setNotifcations  } =useNotificationStore()
const { msgLength ,unReadFols, unReadNoti } = storeToRefs(useNotificationStore());
const {  setUserInfo } =   useUserStore()
const { setChatList,setIds,setUnreadMsg, setIsLoad} =  useChatStore()
const { chatList, ids,unreadMsg }  =storeToRefs(useChatStore())
const pubsub = usePubSub()
const app =ref()
const handleNotification = async ()=>{
  //checkout new message 
  const userId = LocalStorageManager.getLocalStorageInfo('userInfo').id.toString()
  const receiver = new NotificationReceiver();
  let maxId = localStorage.getItem('notis-maxId')
  let notis:PostNotification[] 
  let fols:PostNotification[] 
  await receiver.collectFollow()
  await receiver.collectNotification(maxId?maxId:'0');
  notis = receiver.getNotification();
  fols = receiver.getFollows();
  msgLength.value = notis?.length + fols?.length 
  unReadNoti.value = notis?.length;
  unReadFols.value = fols?.length
  setFollows(receiver.getFollows());
  //@ts-ignore
  if(notis && notis.length!==0 ){
    let ids = [] as number[];
    for (let i = 0; i < notis.length; i++) {
      ids.push( notis[i].id )
    }
    
    const oldNotis = LocalStorageManager.getLocalStorageInfo('notis',userId);
    if(oldNotis){
      setNotifcations([...notis,...oldNotis]);
    }
    signNotification(ids)
    
    LocalStorageManager.setLocalStorageInfo('notis',{notis})
    LocalStorageManager.setLocalStorageInfo('notis-maxId',{maxId:String(notis[0].id)})
  }else{
    let notis = LocalStorageManager.getLocalStorageInfo('notis',userId);
    setNotifcations(notis?notis:[]);
  }
  
  if(fols && fols.length !==0){
    let ids = [] as number[];
    for (let i = 0; i < fols.length; i++) {
      ids.push( fols[i].id )
    }
    
    const oldfols = LocalStorageManager.getLocalStorageInfo('follows',userId);
    if(oldfols){
      setFollows([...fols,...oldfols]);
    }
    //signNotification(ids)
    acceptAddRequest(ids)
    LocalStorageManager.setLocalStorageInfo('follows',{follows:fols})
  }else{
    let fols = LocalStorageManager.getLocalStorageInfo('follows',userId);
    setFollows(fols?fols:[]);
  }

}

function initWebSocketSetting (){
  ws.onmessage = async function(e:MessageEvent<string>){
    const data:Response<any>['data'] = JSON.parse(e.data)
    let msg:Message<any> = data.data;
    
    if(msg===undefined){
      // 心跳包;
      return
    }
    if(msg.mode === InformType.CHAT){
      const chatMsg:ChatEntity = msg.extendField;
      let { id,to_id,user_id,message,url ,created_at } = chatMsg
      const { data:{data:{ avatar,name }}}  = await getUserById(user_id)
      let newChatMsg:FormatChatMsg = {
          name,
          avatar,
          id,
          user_id,
          to_id,
          message,
          url,
          created_at
      }
      // 存到本地..
      ChatHelper.setMsgsToLocal([user_id.toString()],[[newChatMsg ]])
      
      // 換到第一格..
      const switchToTop = ()=>{
        const index = ids.value.findIndex(id=>id === user_id.toString() )
        if(index>=0){
          ids.value.unshift( ids.value.splice(index,1)[0]   )
          chatList.value.splice(index,1)[0] 
          chatList.value.unshift( newChatMsg )
          let tmp = unreadMsg.value.splice(index,1)
          unreadMsg.value.unshift( tmp[0]  )
        }else{
          ids.value.unshift(user_id.toString())
          chatList.value.unshift(newChatMsg)
          unreadMsg.value.unshift([])
        }
      }
      switchToTop()
      // 設置未讀信息...
      
      unreadMsg.value.length!==0?
        unreadMsg.value[0].unshift(newChatMsg)
        :
        unreadMsg.value =[[newChatMsg]]
      setChatList(chatList.value)
      setIds(ids.value)
      setUnreadMsg(unreadMsg.value)
      ChatHelper.setChatIds(ids.value)
      pubsub.publish('msg',chatMsg)
    }
    if(msg.mode > 4){
        const { notifications ,follows    } = storeToRefs( useNotificationStore() )
        if(msg.mode === InformType.ADD_FRIENDS){
            msg.extendField.id = uuid();
            let fs = [msg.extendField,...follows.value]
            setFollows(fs)
            pubsub.publish('fol',' ');
            LocalStorageManager.setLocalStorageInfo('follows',{follows:[msg.extendField]})
            msgLength.value++
            unReadFols.value++
        }else{
            msg.extendField.id = uuid()
            let notis = [msg.extendField,...notifications.value]
            setNotifcations(notis);
            pubsub.publish('noti',' ');
            LocalStorageManager.setLocalStorageInfo('notis',{notis:[msg.extendField]});
            msgLength.value++
            unReadNoti.value++
        }
    }
  }
}

async function handleNewChatMsg(){
  const id = LocalStorageManager.getLocalStorageInfo('userInfo').id
  const { data :{data}} = await getAllMsg(id) 
  let idsTmp = new Set()
  let unreadtmp:FormatChatMsg[][] = []
  let temp = {}
  for (const item of data) {
    let id = String(item.user_id)
    idsTmp.add(id)
    if(temp[id]){
      temp[id].unshift(item)
    }else{
      temp[id] = [item]
    }
  }
  
  let realIds = Array.from(idsTmp.values()) as string[]
  for (let i = 0; i < realIds.length; i++) {
    const id = realIds[i];
    unreadtmp[i] = temp[id]
  }

  return {
    newUnread:unreadtmp,
    newIds:realIds
  }
}

async function handleChatMsg(){
  
  let { newUnread, newIds } = await handleNewChatMsg()
  const res = ChatHelper.getAllFirstMsgFromLocal()
  const initChatListWithLocalMsg = ( { ids , msgMap }:{ids:string[],msgMap:FormatChatMsg[]}  )=>{
    if(newUnread.length){
      let updatedIndex = [] as number[]
      // init the updateMap (  updateIndex -> msg )
      newIds.forEach(newId=>{
        let index = ids.findIndex(id=>id===newId)
        if(index!=-1){
          msgMap[index] = newUnread[index][0]
          updatedIndex.push(index)
        }
      })
      // update the chatlist according to the updateIndex
      for (let i = 0; i < updatedIndex.length; i++) {
        const index = updatedIndex[i];
        ids.unshift( ids.splice(index,1)[0]   )
        msgMap.unshift(  msgMap.splice(index,1)[0]  )
      }
      // ensure the length of array was equal to ids
      for (let i = newUnread.length; i < ids.length; i++) {
        newUnread.push([])
      }
      setChatList(msgMap)
      setIds(ids)
      ChatHelper.setChatIds(ids)
    }else{
      // 有本地消息 但沒新消息....
      newUnread = ids.map(v=>{
        return []
      })
      setChatList(msgMap)
      setIds(ids)
    }
  }
  if(res){
    // 有本地消息 且有新消息....
    initChatListWithLocalMsg(res)
  }else{
    // 沒有舊消息, 則加載新消息
    if(newUnread.length){
      let tmp = newUnread.map(v=>v[0])
      setChatList(tmp)
      setIds(newIds)
      ChatHelper.setChatIds(newIds)
    }
  }
  setUnreadMsg(newUnread)
  setIsLoad(true)
  
  // 把新消息保存到本地 
  if(newIds.length){
    let tmp ={}
    // 1. init user_id -> msg  Map
    newUnread.flat().forEach(v=> tmp[v.user_id] ? tmp[v.user_id].unshift(v) : tmp[v.user_id] = [v])
    // 2. savet to local
    ChatHelper.setMsgsToLocal(Object.keys(tmp) , Object.values(tmp))
    // 3. sign the Message
    signMessage(JSON.stringify(newUnread.flat().map(v=>v.id)))
  }
}

onMounted(async ()=>{
 
  //set store 
  const usr = LocalStorageManager.getLocalStorageInfo('userInfo');
  const usrTmp = await getUserById(usr.id);
  const newUser = usrTmp.data.data
  LocalStorageManager.setLocalStorageInfo('userInfo',{userInfo:newUser});

  if(usr===null){
    return ;
  }
  setUserInfo(newUser)

  // 1 - overwritting the onmessage fucntion of websocket 
  initWebSocketSetting() 

  // 2 - request unread notification 
  handleNotification()
  
  // 3 - 
  handleChatMsg()
  
  // 4 - friends
  const { data } = await getUserFds(LocalStorageManager.getLocalStorageInfo('userInfo')?.id,0,5);
  const { setMessager } =   useUserStore() 
  setMessager(data.data)
  
})

</script>
<style lang="less"  >
body,html{
  height: 100%;
  width: 100%;
  margin: 0px;
  
}
#app{
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app{
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  //align-items: center;
}
/* ::-webkit-scrollbar{
  display: none;
} */
</style>
