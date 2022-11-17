<script setup lang='ts'>
import { toRefs, ref, watchEffect, onMounted, getCurrentInstance, defineProps, onUnmounted} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style'
import { FormattedPost } from '@/types/post';
import { useRouter } from 'vue-router';
import { normalUrl } from '@/api/config';
import { calculateDate, getFormatDate } from '@/utils/Date';
import { getPostById } from '@/service/post';
import { getUserById } from '@/service/user';
import { PostNotification } from '@/types/Notification';
import { BellFilled } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/store/Notification';
import { LocalStorageManager } from '@/utils/localStorage';

interface NotificationContentProps {
    info:FormattedPost & PostNotification | undefined,
    itemProps:any
}
const props = defineProps<NotificationContentProps>()
 const { info , itemProps } = toRefs(props) 
const { isRead } = useState({
    isRead:false
})
const instance = getCurrentInstance();
const router = useRouter()
const { current } = storeToRefs(useNotificationStore())
const goPersonFilePage = async ()=>{
    if(!info.value){
        return;
    }
    const user = await getUserById(info.value.user_id);
    router.push({
        /* name:'personProfile',
        params:{
            username:info.value.userInfo.username,
            info:JSON.stringify(info.value)
        }, */
        path:'personProfile',
        query:{
            username:info.value.name,
            info:JSON.stringify(user.data.data)
        }
    })
}

const goPostPage = async ()=>{

    if(info.value===undefined)   return;
    if(current.value) return;
    current.value? 
        LocalStorageManager.setPrimaryKey('fol',info.value.id)
        :
        LocalStorageManager.setPrimaryKey('noti',info.value.id)

    isRead.value = true;
    router.push({
        path:'postDetail',
        query:{
            username:info.value.name,
            info:JSON.stringify(info.value)
        }
    })
}

const checkRead = async ()=>{
    if(info.value === undefined) return;
    if(current.value){
        if(LocalStorageManager.getPrimaryKey('fol',info.value.id)){
          isRead.value = true;  
        }
        return;
    }
    if(LocalStorageManager.getPrimaryKey('noti',info.value.id)){
        isRead.value = true;
    }
    
    
}

onMounted(()=>{
    checkRead();
})

onUnmounted(()=>{
    if(!info.value) return;
    if(!current.value){
        if(!isRead.value){
            console.log('!!!!',current.value,info.value.name);
            LocalStorageManager.setPrimaryKey('fol',info.value.id)
        }
        
    }
})

</script>
<template>
  <div @click="goPostPage" v-if="info" class="notification-content-container">
    <div>
        <el-icon v-if="!isRead" style="color: rgb(6,117,232);font-size: 22px;position: absolute;left: 10px;top: 15px;">
            <BellFilled />
        </el-icon>
    </div>
    <div class="detail">
        <img @click.stop="goPersonFilePage" :src="normalUrl + info.avatar" />
        <div class="date">{{calculateDate(new Date(info.created_at))}}</div>
        <div class="content">{{
                current?
                `${info.name} just follow you `
                :
                info.content || info.name +':' +info.comment_content
        }}</div>
    </div>
    <div v-if="!itemProps.activeIndex" style="position: absolute;right: 20px;width: 20%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <img v-if="info.images" style="border-radius: 30%;width: 60px;height: 60px;" :src="normalUrl + info.images"  >
        <div style="width: 100%;text-align: center;color: #CDCDCD;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
            {{info.post_content}}
        </div>
    </div>
    <!-- <div v-if="itemProps.activeIndex" :style="{...middleStyle,flex:1,justifyContent:'end'}">
        <el-button   type="primary" round> Accept </el-button>
    </div> -->
  </div>
</template>

<style lang="less" scoped>
img:hover{
    opacity: 0.6;
}
img{
    transition: opacity 0.2s ease-in 0s;
}
.notification-content-container:hover{
    background-color: rgb(231,231,232);
}
.notification-content-container{
    
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
    padding: 15px;
    padding-left: 30px;
    height: auto;
    display: flex;
    .detail{
        img{
            border-radius: 20px;
            width: 40px;
            height: 40px;
        }
        padding-left: 15px;
        .name{
            color: @fontColor1;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .date{
            color: @fontColor1;
            font-size: 13px;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin-bottom: 10px;
        }

        .content{
            color: @fontColor1;
            font-size: 16px;
            font-weight: 600;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
    }
}

</style>