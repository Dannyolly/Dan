<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import { User ,ArrowRightBold } from '@element-plus/icons-vue'
import SettingDetailItem from '../components/Setting/SettingDetailItem.vue'
import { LocalStorageManager } from '@/utils/localStorage';
import { useRouter } from 'vue-router';
interface SettingDetailProps {}
const props = defineProps<SettingDetailProps>()
const { } = toRefs(props)
const {} = useState({})
const router = useRouter()
function logOut(){
    /* useHomeStore().setUserInfo('wow ~' + Random(0,100)) */
    LocalStorageManager.removeLocalStorageInfo('userInfo')
    LocalStorageManager.removeLocalStorageInfo('token')
    router.replace('/login')
}
</script>
<template>
  <div class="setting-detail-container">
      <MiddleTopHeader back-btn name="Account"/>
      <div class="introduction">
        See information about your account, download an archive of your data, or learn about your account deactivation options
      </div>
      <div class="setting-detail-list">
        <SettingDetailItem title="Account information" info="See your account information like your phone number and email address."/>
        <el-button class="logout-btn" @click="logOut" style="width: 200px;height: 40px;position: absolute;" type="primary" round>
            Logout
        </el-button>
      </div>
  </div>
</template>

<style lang="less" scoped>

.setting-detail-item:hover{
    background-color: @list-item-hover;
}
.setting-detail-container{
    .introduction{
        color: @fontColor2;
        font-size: 13px;
        font-style: @font-style;
        padding: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .setting-detail-list{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
@media screen and (min-width:621px){
  .setting-detail-container{
    border: 2px solid #F4F4F4;
  }
  .setting-detail-container{
    width:90%;
    height: 100%;
  }
  .logout-btn{
    bottom: 20px;
  }
}
@media screen and (max-width:600px){
  .setting-detail-container{
    width:100%;
    height: 100%;
  }
  .logout-btn{
    bottom: 80px;
  }
}
</style>