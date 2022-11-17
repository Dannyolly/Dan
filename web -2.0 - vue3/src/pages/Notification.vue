<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted, nextTick, watch, onUnmounted, onActivated, onDeactivated} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import {middleStyle} from '@/utils/Style'
import NotificationContent from '../components/NotificationContent.vue'
import TabBar from '@/components/TabBar.vue';
import RightBar from './Home/RightBar.vue';
import VirtualList from '@/components/VirtualList/VirtualList.vue';
import { faker } from '@faker-js/faker';
import { FormattedPost } from '@/types/post';
import { Random } from '@/utils/Num';
import { VirtualListMethod } from '@/types/virtualList';
import { getAllRequest } from '@/service/AddRequest';
import { LocalStorageManager } from '@/utils/localStorage';
import { log } from 'console';
import { getUserById } from '@/service/user'
import { ElStep, useId } from 'element-plus';
import { getAllNotification } from '@/service/Notification';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/store/Notification';
import EmptyVue from '@/components/Empty.vue';
import { usePubSub } from '@/hooks/usePubSub';
interface NotificationProps {}
const props = defineProps<NotificationProps>()
const { } = toRefs(props)
const {
  activeIndex,
  dataList,
  isLoading,
  currentPage,
  notisArr,
  folsArr
} = useState({ 
  activeIndex:0,
  dataList:[] as any[] ,
  notisArr:[] as any[],
  folsArr:[] as any[],
  isLoading:true,
  currentPage:0,
})
const pubsub = usePubSub();
const { notifications, follows , isRead , unReadFols, unReadNoti,msgLength ,current } = storeToRefs(useNotificationStore())
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const onload =(noMoreData:()=>void)=>{
  /* noMoreData() */
  const res = 
      activeIndex.value?
      folsArr.value.slice(currentPage.value*10,(currentPage.value+1)*10)
      :
      notifications.value.slice(currentPage.value*10,(currentPage.value+1)*10);
  currentPage.value++;
  if(res.length===0){
    noMoreData()
    return;
  }
  setTimeout(()=>{
    dataList.value.push(...res);
  },500)

}
const notis = ref<number[]>([]) ;

const Header = ()=>{
  return (
    <div>
      <MiddleTopHeader 
        name="Notification" 
        BottomContent={<TabBar onChange={
          index=>{
            activeIndex.value = index
            current.value = index
          }
        } title={['Noti','Follow']}
          count={notis.value}
        />}
      />
      
    </div>
  )
}

const append = ref()
const deleteD = ref()
const getMethod:VirtualListMethod=(appendData,deleteData)=>{
  append.value = appendData
  deleteD.value  =deleteData
}

const BottomEl  = ()=>{
    return (
        <>
        {

            <EmptyVue  
              desc='NO NOTIFICATION ANYMORE'
              imageSize={300} 
              isLoad = {!isLoading.value}
            />
        }
        </>
    )
}

const readNotification = ()=>{
  //isRead.value = true;
  unReadNoti.value = 0;
  unReadFols.value = 0;
  msgLength.value = 0;
}

onMounted(()=>{
  pubsub.subscribe('noti',e=>{
    if(dataList.value.length!==0 ){
      if(!current.value){
        append.value(notifications.value[0])
      }
    }
  })

  pubsub.subscribe('fol',e=>{
    if(dataList.value.length!==0 ){
      if(current.value){
        append.value(follows.value[0])
      }
    }
  })
})

onUnmounted(()=>{
  pubsub.unsubscribe('noti');
})

onDeactivated(()=>{
  readNotification()
})


watch(activeIndex,(v,ov)=>{
  currentPage.value = 0;
  dataList.value = activeIndex.value? 
    folsArr.value.slice(currentPage.value*10,(currentPage.value+1)*10)
    :
    notifications.value.slice(currentPage.value*10,(currentPage.value+1)*10)
  currentPage.value++;
  
})

watchEffect(async ()=>{
  notis.value[0] = unReadNoti.value;
  notis.value[1] = unReadFols.value;
  notisArr.value = notifications.value;
  folsArr.value = follows.value;
})

watchEffect(()=>{
  if(dataList.value.length===0){
    currentPage.value = 0 ;

    dataList.value = activeIndex.value? 
        folsArr.value.length!==0?
          folsArr.value.slice(currentPage.value*10,(currentPage.value+1)*10)
          :
          []
        :
        notisArr.value.length!==0?
          notisArr.value.slice(currentPage.value*10,(currentPage.value+1)*10)
          :
          []
    if(notisArr.value.length || folsArr.value.length){
      currentPage.value++;
    }
    if(dataList.value.length!==0){
      isLoading.value = false
    }
  }
})
onMounted(()=>{
  setTimeout(()=>{
    if(dataList.value.length===0){
      isLoading.value = false
 
    }
  },2000)
})

</script>

<template>
  <div  class="notification-container">
      <div style="height: calc(100%)">
        <VirtualList      
          :data="dataList.length===0?[]:dataList"
          :Header="Header"
          :Item="NotificationContent"
          :estimate-size="70"
          :buffer-size="20"
          :onReach="onload"
          :debounce-delay-time="16.7"
          :is-show-data="true"
          :virtual-list-method="getMethod"
          is-keep-alive
          :is-show-loading="isLoading"
          :item-props="{
            activeIndex:activeIndex
            }"
          animated
          :Bottom="BottomEl"
        />
      </div>
  </div>
  <RightBar />
</template>

<style lang="less" scoped>

@media screen and (min-width:821px){
  .notification-container{
    width:70%;
    max-width: 600px;
    border: 2px solid #F4F4F4;
  }
}
@media screen and (max-width:820px){
  .notification-container{
    width:100%
    
  }
}

</style>