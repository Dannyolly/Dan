<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import MessagerItem from '@/components/MessagerItem.vue';
import { Search } from '@element-plus/icons-vue'
import RightBar from './Home/RightBar.vue';
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import VirtualList from '../components/VirtualList/VirtualList.vue';
import Post from '@/components/Post.vue';
import { FormattedPost, Post as PostInfo } from '@/types/post';
import { 
    Back
} from '@element-plus/icons-vue'
import { faker } from '@faker-js/faker';
import { Random } from '@/utils/Num';
import { normalUrl } from '@/api/config';
import Empty from '@/components/Empty.vue';
import { useChatStore } from '@/store/Chat';
import { storeToRefs } from 'pinia';
import { ChatHelper } from '@/utils/chat';
import { FormatChatMsg } from '@/types/chat';
import { LocalStorageManager } from '@/utils/localStorage';
import { useUserStore } from '@/store/user';
import { getUserFds, searchUserByWord } from '@/service/user';
import { UserInfo } from '@/types/user';
/* interface MessageProps {}
const props = defineProps<MessageProps>()
const { } = toRefs(props) */
const {
  input,
  dataList,
  isFocus,
  isSearch,
  cached,
  appendData,
  deleteData,
  topMap,
  isLoad,
  loadOnce
} = useState({
  input:'',
  isLoad:false,
  dataList:[] as UserInfo[],
  isFocus:false,
  isSearch:false,
  cached:[] as UserInfo[],
  loadOnce:false,
  topMap:new Map<string,boolean>(),
  appendData:undefined as unknown as (item:UserInfo)=>void,
  deleteData:undefined as unknown as (index:number)=>void
})
const { messager } = storeToRefs(useUserStore())
const onload =(noMoreData:()=>void)=>{
    noMoreData()

}

const process = async (value)=>{
  let { data :{data }} = await searchUserByWord(value)
  isLoad.value = true;
  dataList.value = data 
}
const fn = useDebounceFn(process,1000)

const onInput = function(value:string){
  isLoad.value = false
  dataList.value = []
  fn(value)
  
}

const onclick = function(){
  isSearch.value = true;
  cached.value = [...dataList.value]
  dataList.value = []
}

const cancelSearch = function(){
  dataList.value = [...cached.value]
  isSearch.value = false;
  input.value = ''
}

const MessageHeader = ()=>{
  return (
    <div>
      <MiddleTopHeader 
        name="Messager"  
        /* BottomContent={Bottom} */
      />
      <div class="search-container">
        {
          isSearch.value
          &&
          <el-button 
            onclick={cancelSearch}
            circle
            size='large'
            style={{
              border:0,
              fontSize: '20px',
              marginRight: '10px',
            }}
            icon={Back}
          />
        }
        <el-input
          v-model={input.value}
          onInput={onInput}
          onfocus={()=>{
            onclick()
          }}
          onblur={()=>{
            //cancelSearch()
          }}
          style="height: 10%;"
          placeholder="Search Person"
          suffix-icon={Search}
          round
        />
      </div>
    </div>
  )
}


const Bottom = ()=>{
  if(!isLoad.value){
    return
  }
  return (
    <Empty desc='no messages' />
  )
}

const getMethod = (append , deleteD)=>{
  appendData.value = append
  deleteData.value = deleteD
}

watchEffect(()=>{
  if( !loadOnce.value && messager.value  && messager.value.length!==0){
    dataList.value = [...messager.value] ?? [] 
    cached.value = [...dataList.value]
    isLoad.value = true
    loadOnce.value = true
    //console.log(messager.value); 
  }
})



</script>
<template>
  <div   class="message-container">
    <VirtualList 
          :virtual-list-method="getMethod"
          :data="dataList" 
          :Item="MessagerItem" 
          :estimate-size="60"
          :Header="MessageHeader" 
          :buffer-size="20"
          :onReach="onload"
          :itemProps="topMap"
          :is-show-loading="!isLoad"
          :is-show-data="true"
          :Bottom="Bottom"
          animated
      />
  </div>
  <RightBar />
</template>

<style lang="less" scoped>


:deep(.el-input__inner){
  height:40px 
}
:deep(.el-input__wrapper){
  border-radius: 40px;
  box-shadow: 0 0 0 2px #CDCDCD inset ;
}
:deep(.el-input__wrapper.is-focus){
  box-shadow: 0 0 0 2px #409eff inset !important; ;
}

:deep(.search-container){
  padding: 20px;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.message-container{
  width: 50%;
  height: calc(100% - 4px);
  overflow: scroll;
  border: 2px solid #F4F4F4;
  
}  
::-webkit-scrollbar{
  display: none;
}

@media screen and (min-width:821px){
  
  .message-container{
    width:70%;
    max-width: 600px;
  }
}
@media screen and (max-width:820px){
  .message-container{
    width:100%
  }
}

</style>