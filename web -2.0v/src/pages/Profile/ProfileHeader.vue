<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { normalUrl } from '@/api/config';
import { useRoute, useRouter } from 'vue-router';
import { Edit , Setting ,Switch,SwitchButton, User} from '@element-plus/icons-vue'
import TabBar from '@/components/TabBar.vue'
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue'
import IconButton from '@/components/IconButton.vue';
import { LocalStorageManager } from '@/utils/localStorage';
import { checkIsFriend , uploadBackGroundImage , uploadAvatar } from '@/service/user';
import { sentAddRequest } from '@/service/ws';
import { ElNotification, UploadProps } from 'element-plus';
import { useStore } from 'vuex';
import { useUserStore } from '@/store/user';
import { sendFollowNotification } from '@/service/Notification';

interface ProfileHeaderProps {
    backgroundImg:string,
    avatar:string,
    name:string,
    id:number,
    self:boolean
}
type UploadType = 'background' | 'avatar'
const { backgroundImg , avatar ,name,id ,self = false } = defineProps<ProfileHeaderProps>()
const { isFollowed ,backgroundImage ,isProfile,cur, userAvatar } = useState({
  isFollowed:false,
  backgroundImage:backgroundImg,
  isProfile:false,
  cur:'background' as UploadType,
  userAvatar:avatar
})
const router = useRouter();
const route = useRoute()
const goChat = ()=>{
  router.push({
    path:'messageContent',
    query:{
        id,
        name,
        icon:avatar
    }
  })
}
const follow = async ()=>{
  const { data:{data:{status}}} = await sendFollowNotification(LocalStorageManager.getLocalStorageInfo('userInfo').id,id)
  if(status){
    ElNotification({
      title: 'Success',
      message: ' follow success ! ',
      type: 'success'
    });
    isFollowed.value = true
  }
  
}


const onChange:UploadProps['onChange'] = async (uploadFIle,uploadFiles)=>{
  if(!isProfile.value) return;

  let tmp = uploadFIle.raw as File
  const user_id = useUserStore().userInfo.id.toString()
  if(cur.value === 'background'){
    const {data:{data:{path}}}= await  uploadBackGroundImage(tmp,user_id);
    backgroundImage.value =  path;
  }else{
    const { data:{data:{path}}} = await uploadAvatar(tmp,user_id)
    console.log(path);
    
    userAvatar.value =  path
  }
  
    
}


onMounted(async ()=>{
  const {data:{data:{isFriend}}} = await checkIsFriend(LocalStorageManager.getLocalStorageInfo('userInfo').id,id)
  isFollowed.value = isFriend
  isProfile.value = route.name === 'profile' 
})
</script>
<template>
  <div id="profile-header">
      <MiddleTopHeader name="Profile" back-btn />
      <div class="background-image-container">
          <el-upload
                class="upload-demo"
                multiple
                :auto-upload="false"
                :show-file-list="false"
                :on-change="(a,b)=>{
                  cur = 'background'
                  onChange(a,b)
                }"
              >
                  <img v-if="backgroundImage !== '' " @click="" :src='normalUrl+ backgroundImage' />
                  <img v-else src="@/assets/icon.png" />
                </el-upload>
          
      </div>
      <div class="main-content">
          <div>
              <el-upload
                  class="upload-demo"
                  multiple
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="(a,b)=>{
                    cur = 'avatar'
                    onChange(a,b)
                  }"
                >
              <div class='icon-container' >

                  <img v-if="userAvatar !== '' " :src='normalUrl + userAvatar' />
                  <img v-else src="@/assets/home.png" />

                <div :style="{fontWeight: 600,color: 'rgb(55, 67, 77)','textAlign':'center'}">{{name}}</div>
              </div>
            </el-upload>
            <div class="setting-container">
              <IconButton v-if="!self && !isFollowed && !isProfile"  @click="follow" size="large" type='primary' :icon="User" />
              <IconButton @click="goChat" size="large" type='primary' :icon="Edit" />
              <IconButton v-if="LocalStorageManager.getLocalStorageInfo('userInfo').id === id" @click="router.push('/setting')" size="large" type='primary' :icon="Setting" />
            </div>
          </div>
      </div>
      <div>
        <TabBar :title="['Posts','Likes']" />
      </div>
    </div>
</template>

<style lang="less" scoped>
:deep(.el-upload.el-upload--text){
  width: 100%;
}
.background-image-container{
    
    img{
        width: 100%;
        max-height: 300px;
        object-fit: cover;
    }
}
.main-content{
    display: flex;
    justify-content: center;
    position: relative;
    .icon-container{
        width: 100px;
        height: 100px;
        transform: translateY(-30%);
        border-radius: 50px;
        padding: 3px;
        background-color: #FFFFFF;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50px;
          object-fit: cover;
        }
    }
    .setting-container{
        position: absolute;
        right: 20px;
        top: 20px;
    }
}

</style>