<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted, watch, onUnmounted, nextTick} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import { useRoute, useRouter } from 'vue-router';
import { UserInfo } from '@/types/user';
import { Position ,Picture } from '@element-plus/icons-vue';
import { FormattedPost } from '@/types/post';
import MessageRow from './MessageRow.vue';
import { sendMessageToServer, ws } from '@/websocket';
import { LocalStorageManager } from '@/utils/localStorage';
import { iconProps, UploadProps, UploadUserFile, useId } from 'element-plus';
import { log } from 'console';
import axios from 'axios';
import { isIfStatement } from '@babel/types';
import { sendMessage } from '@/service/ws'
import { usePubSub } from '@/hooks/usePubSub';
import { ChatMsg , ChatEntity, FormatChatMsg} from '@/types/chat';
import { sentPic } from '@/service/chat';
import { calculateDate } from '@/utils/Date';
import { ChatHelper } from '@/utils/chat';
import { normalUrl } from '@/api/config';
import { getUserById } from '@/service/user';
import { reverse } from 'lodash';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/store/Chat';
import { computed } from '@vue/reactivity';
interface MessageContentProps {}
const props = defineProps<MessageContentProps>()
const { } = toRefs(props)
const { realArr,input , chatArr ,fileList, uploadPicList,name ,icon,toId,chatCache,index} = useState({
  input:'',
  realArr:[] as Array<ChatMsg>,
  chatArr:[] as Array<ChatMsg>,
  chatCache:[] as Array<FormatChatMsg>,
  fileList:[] as UploadUserFile[],
  uploadPicList:[] as string[],
  name:'',
  icon:'',
  toId:0,
  index:0,
})
const route = useRoute()
const userInfo = ref<UserInfo>()
const info = ref<FormattedPost>()
const router = useRouter()
const pubsub = usePubSub()
const scrollBar = ref()
const scrollHeight = computed(()=>scrollBar.value.scrollHeight)
const { ids , unreadMsg , chatList } = storeToRefs(useChatStore())
const goContent = (event:MouseEvent)=>{
    router.push({
      
    })
}
const LeftContent = ()=> {
    if(icon.value === ''){
      return;
    }
    return (
      //@ts-ignore
      <img onClick={goContent} 
      style={{cursor:'pointer',borderRadius:'50%',width:'30px',height:'30px',marginRight:'10px'}} 
      src={normalUrl + icon.value} 
      />
    )
}
const send = async ()=>{
    const userInfo = LocalStorageManager.getLocalStorageInfo('userInfo');
    if(!userInfo){
      return ;
    }
    let { id,name, avatar  } = userInfo
    let chatMsg:ChatMsg  = {
      message:input.value,
      self:true,
      url:''
    }
    let msgForSave:FormatChatMsg = {
      name,
      avatar,
      id:-1,
      user_id: id,
      to_id: toId.value,
      message: input.value,
      url: '',
      created_at: new Date().toString()
    }
    sendMessage(id,toId.value,input.value,'')
    chatArr.value.push(chatMsg);
    input.value = '';
    const index = ids.value.length? ids.value.findIndex(id=>id == toId.value.toString() ):-1
    if(index===-1){
      chatList.value.push(msgForSave)
      ids.value.push(msgForSave.to_id.toString())
    }else{
      ids.value.unshift( ids.value.splice(index,1)[0]   )
      chatList.value.splice(index,1)[0] 
      chatList.value.unshift(msgForSave)
    }
    ChatHelper.setChatIds(ids.value)
    ChatHelper.setMsgsToLocal([toId.value.toString()],[ [msgForSave] ])
    await nextTick();
    scrollToBottom(true)
}

const onmessage = async function(type,e:ChatEntity){
  const {data:{data:{name,avatar}}} = await getUserById(e.user_id)
  let chatMsg:ChatMsg  = {
    message: e.message,
    self:false,
    url:e.url !=''? e.url : ''
  }
  let msgForSave:FormatChatMsg = {
    name,
    avatar,
    id:-1,
    user_id: toId.value,
    to_id:e.to_id,
    message: e.message,
    url: e.url,
    created_at: new Date().toString()
  }


  chatArr.value.push(chatMsg);
  chatCache.value = [msgForSave,...chatCache.value]
  unreadMsg.value[0] = []
  await nextTick();
  scrollToBottom(true)
  //ChatHelper.setMsgsToLocal([toId.value.toString()],[ chatCache.value ])
}

const handleBeforeUpload:UploadProps['beforeUpload'] = (rawFile) =>{
  const url = URL.createObjectURL(rawFile)
  uploadPicList.value.push(url)
}

const onChange:UploadProps['onChange'] = async (uploadFIle,uploadFiles)=>{
  const userInfo = LocalStorageManager.getLocalStorageInfo('userInfo');
  const { data : { data } } = await sentPic(uploadFIle.raw as File)
  if(!userInfo){
      return ;
  }
  let { id,name, avatar  } = userInfo
  let chatMsg:ChatMsg = {
    self:true,
    message:'',
    url:URL.createObjectURL(uploadFIle.raw!)
  }
  let msgForSave:FormatChatMsg = {
    name,
    avatar,
    id:-1,
    user_id: id,
    to_id: toId.value,
    message: input.value,
    url: data.path,
    created_at: new Date().toString()
  }
  chatArr.value.push(chatMsg);
  sendMessage(id,toId,input.value,data.path)

  const index = chatList.value.length?
        chatList.value.findIndex(v=>v.user_id === toId.value || v.user_id === toId.value)
        :-1
  if(index===-1){
    chatList.value.push(msgForSave)
    ids.value.push(msgForSave.to_id.toString())
  }else{
    ids.value.unshift( ids.value.splice(index,1)[0]   )
    chatList.value.splice(index,1)[0] 
    chatList.value.unshift(msgForSave)
  }
  console.log(chatList.value);
  
  chatCache.value = [msgForSave,...chatCache.value]
  ChatHelper.setMsgsToLocal([toId.value.toString()],[ chatCache.value ])
}

const scrollToBottom= (smooth = false)=>{
  scrollBar.value.scrollTo({
      left:0,
      top:scrollHeight.value,
      behavior: smooth?'smooth' : 'auto'
  })
  
}
onMounted(async ()=>{
 
  pubsub.subscribe('msg',onmessage)
  //@ts-ignore
  toId.value = route.query.id
  //@ts-ignore
  name.value = route.query.name
  //@ts-ignore
  icon.value = route.query.icon
  //@ts-ignore
  index.value = route.query.index

  const id = LocalStorageManager.getLocalStorageInfo('userInfo').id
  const chats = ChatHelper.getChatById(String(toId.value))
  chatCache.value = chats ?? []
  unreadMsg.value[index.value] = []
  
  
  chatArr.value = chats?.reverse().map(v=>{
    return {
      self:v.user_id === id,
      message:v.message,
      url:v.url
    } as ChatMsg
  }) ?? []

  await nextTick();
  scrollToBottom()
})



onUnmounted(()=>{
  pubsub.unsubscribe('msg')
})
</script>
<template>
  <div class="message-content-container">
    <MiddleTopHeader 
      :LeftContent="LeftContent" 
      :name="(name as string)" 
      back-btn 
      show-user-icon
    />
    
    <div ref="scrollBar" style="width: 100%;height: 90%;overflow: scroll;">
      <MessageRow 
        v-for="(item,index) in chatArr" 
        :self="item.self" 
        :message="item.message" 
        :pic="item.url"
      />
    </div>


    
    
    <div class="bottom-container">
      
        <el-input 
          @keydown.enter="send" 
          style="width: 70%;padding-right: 20px;" 
          v-model="input" 
          placeholder="Start a new message" 
          @click="e=>scrollToBottom(true)"
        />
        <el-upload
                
                v-model:file-list="fileList"
                class="upload-demo"
                name="image"
                multiple
                :show-file-list="false"
                :before-upload="handleBeforeUpload"
                :on-change="onChange"
                :auto-upload="false"
              >
              <el-button type='primary' size="medium" :icon="Picture" circle style="font-size: 14px;margin-right: 10px;" />
        </el-upload>
        <el-icon @click="send" style="cursor: pointer;padding-left: 20px;color:rgb(29,155,240);font-size: 24px;">
          <Position/>
        </el-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>

::-webkit-scrollbar {
  width: 5px;
  background-color: #f2f2f2;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(222, 223, 225);
}

::-webkit-scrollbar-track {
    background-color: #FFFFFF;
}
img:hover{
  opacity: 1;
}
:deep(.el-input__inner){
  height:35px 
}
:deep(.el-input__wrapper){
  border-radius: 40px;
  box-shadow: 0 0 0 2px #CDCDCD inset ;
}
.message-content-container{

  height: calc(100% - 60px - 4px);
  padding-bottom: 60px;
  border: 2px solid #F4F4F4;
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction:column;
}
// ipad
@media screen and (min-width:600px)  {
   .message-content-container{
     width: 80%;
     .bottom-container{
        position: absolute;
        width: 100%;
        height: 50px;
        border: 2px solid #F4F4F4;
        border-left-width: 0px;
        border-right-width: 0px;
        display: flex;
        justify-content:center;
        align-items: center;
        position: absolute;
        bottom: 0px;
      }
   }
}

// phone
@media screen and (min-width:0px) and (max-width:599px) {
    .message-content-container{
      width: 100%;
    }
    .bottom-container{
      position: absolute;
      width: 100%;
      height: 60px;
      border: 2px solid #F4F4F4;
      border-left-width: 0px;
      border-right-width: 0px;
      display: flex;
      justify-content:center;
      align-items: center;
      position: absolute;
      bottom: 0px;
      z-index: 10001;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 5px #CDCDCD;
    }
}

</style>