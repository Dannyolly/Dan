<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted, onActivated} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import Post from '@/components/Post.vue';
import Mark from '@/components/TopBarSetting/Mark.vue'
import RightBar from './Home/RightBar.vue';
import { Search } from '@element-plus/icons-vue'
import { CollectPost, FormattedPost } from '@/types/post';
import { faker } from '@faker-js/faker';
import { Random } from '@/utils/Num';
import { useScroll } from '@vueuse/core';
import { LocalStorageManager } from '@/utils/localStorage';
import { post } from '@/api/request';
import { useStore } from 'vuex';
import { useUserStore } from '@/store/user';
import EmptyVue from '@/components/Empty.vue';
import VirtualList from '@/components/VirtualList';
interface MarkProps {}
const props = defineProps<MarkProps>()
const { } = toRefs(props)
const { input, value , dataList,container, isLoad } = useState({
  input:'',
  value:'',
  dataList:[] as CollectPost[],
  container:null,
  isLoad:false
})
const userInfo = useUserStore().userInfo
const { x, y, isScrolling, arrivedState, directions } = useScroll(container)

const loadData = ()=>{
  
  const posts = LocalStorageManager.getLocalStorageInfo('collect',userInfo.id.toString()) ?? []
  setTimeout(()=>{
    isLoad.value = true
    dataList.value = posts;
  },1000)
  
}

const MarkHeader = ()=>{
  return (
    <MiddleTopHeader 
      name="Mark" 
      RightContent={Mark} 
    />
  )
}
const BottomEl = ()=>{
  
  return (
    <EmptyVue isLoad={isLoad.value}  desc='No more Collects'  />
  )
}
const onReach =(noMoredata)=>{

}
const appendDataFn = ref<(post:FormattedPost)=>void>()
const deleteDataFn = ref<(index:number)=>void>()
const noMoreDataFn=  ref<()=>void>()

const getVirtualListMethod = 
( appendData:(post:FormattedPost)=>void, deleteData:(index:number)=>void , noMoreData:()=>void) =>{
    appendDataFn.value = appendData
    deleteDataFn.value = deleteData
    noMoreDataFn.value = noMoreData
}
onMounted(()=>{
  loadData()
})
onActivated(()=>{
  //loadData()
  //@ts-ignore
  container.value.scrollTo({
    left:0,
    top:y.value
  })
})



</script>


<template>
  <div ref="container" class="mark-container">

    <VirtualList

      :Header="MarkHeader"
      :data="dataList.length===0?[]:dataList" 
      :Item="Post" 
      :estimate-size="100" 
      :buffer-size="10"
      :onReach="onReach"
      :is-show-data="isLoad"
      :is-show-loading="!isLoad"
      :debounce-delay-time="16.7"
      is-keep-alive
      :item-props="{
          isShowInteract:true
      }"
      :virtualListMethod="getVirtualListMethod"
      :Bottom="BottomEl"
      animated
  />
  </div>
  <RightBar/>
</template>

<style lang="less" scoped>
::-webkit-scrollbar{
  display: none;
}
:deep(.el-input__wrapper){
  border-radius: 20px;
}
.mark-container{
  width: 100%;
  height: 100%;
  border: 2px solid #F4F4F4;
  overflow: scroll;
  .query-container{
    padding: 20px;
    padding-bottom: 10px;
    display: flex;
    
  }
  .date{
    padding: 20px;
    padding-bottom: 10px;
    font-style: @font-style;
    font-weight: 600;
    font-size: 16px;
    color: @text-color;
  }
}

@media screen and (min-width:821px){
  .mark-container{
    width:70%;
    max-width: 600px;
  }
}
@media screen and (max-width:820px){
  .mark-container{
    width:100%
  }
}
</style>