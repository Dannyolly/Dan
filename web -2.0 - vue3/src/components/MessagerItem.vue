<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, toRef} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style'
import { MoreFilled } from '@element-plus/icons-vue'
import IconButton from './IconButton.vue';
import { FormattedPost } from '@/types/post';
import { calculateDate } from '@/utils/Date';
import { useRouter } from 'vue-router';
import { FormatChatMsg } from '@/types/chat';
import { normalUrl } from '@/api/config';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/store/Chat';
import { UserInfo } from '@/types/user';
import { useUserStore } from '@/store/user';
import { getUserById } from '@/service/user';
import { sentAddRequest } from '@/service/ws';
interface MessageItemProps {
    info:UserInfo,
    deleteData?:()=>void
    appendData?:(item:any)=>string,
    uuid:string,
    itemProps:Map<string,boolean>,
    index:number
}
const props = defineProps<MessageItemProps>()
const userId = useUserStore().userInfo.id
const { info  ,deleteData , appendData , itemProps,uuid,index } = toRefs(props)
const { chatList, unreadMsg,ids } = storeToRefs(useChatStore())
const { userInfo } = useUserStore()
const toTop = ()=>{
    deleteData.value()
    let uuid = appendData.value(info)
    if(!itemProps.value.has(uuid)){
        itemProps.value.set(uuid,true)
    }
}
const router = useRouter()
const goContent = (event:MouseEvent)=>{
    router.push({

        path:'personProfile',
        query:{
            info:JSON.stringify(info.value),
            //name:info.value.name,
            
        }
    })
}

const deleteD = (event:MouseEvent) =>{
    deleteData.value()
}

const followUser =()=>{
   const userId = userInfo.id
   const toId = info.value.id;
   console.log(userId, toId);
   
}


</script>
<template>
  <div v-if="info"  
  
  class="notification-content-container" 
  :class="{
    unread:unreadMsg && unreadMsg.length && unreadMsg[index] && unreadMsg[index].length!==0 , 
    top:itemProps.has(uuid)
  }" 
  
  >
    <div v-if="unreadMsg && unreadMsg.length && unreadMsg[index] && unreadMsg[index].length!==0" class="unread-number">
        {{unreadMsg[index].length}}
    </div>
    <div @click="goContent" style="display: flex;width: 70%;">
        <img v-if="info.avatar && info.avatar !== '' " :src="normalUrl + info.avatar" />
        <div  class="detail">
            <div class="name"> {{info.name}}</div>
        </div>
    </div>
    <div style="display: flex;flex: 1;justify-content: flex-end;">
        <div @click.prevent="()=>'' " class="more" >
            <el-dropdown trigger="click">
                <IconButton backgroundColor="#FFFFFF" :icon="MoreFilled" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click.prevent="followUser">follow</el-dropdown-item>
                    
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
  </div>
</template>

<style lang="less" scoped>


.unread-number{
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 1;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  color: #FFFFFF;
  background-color: rgb(64,158,255);
  border-radius: 20px;

}
// .notification-content-container.unread{
//     background-color: rgb(224,227,233);
// }

.notification-content-container:hover{
    //background-color: @list-item-hover;
    background-color: rgb(240,240,240);
    /* .more{
        display: block;
    } */
}
.notification-content-container{
    transition: all 0.2s;
    cursor: pointer;
    padding: 15px;
    height: 50px;
    display: flex;
    img{
        border-radius: 30px;
        width: 50px;
        height: 50px;
        object-fit: cover;
    }
    .detail{
        width: 100%;
        line-height: 40px;
        padding-left: 15px;
        .name{
            color: @title ;
            font-weight: 500;
            font-size: 20px;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .content{
            color: @text-color ;
            font-size: 13px;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
    }
    .time{
        display: flex;
        padding-right: 10px;
        justify-content: right;
        font-weight: 500;
        font-size: 14px;
        line-height: 25px;
        color: @text-color ;
        font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .more{
        display: block;
        transform: translateY(-5px);
    }
}

.top{
    background-color: @list-item-hover;
}

</style>