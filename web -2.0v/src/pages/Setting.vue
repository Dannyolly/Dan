<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import RightBar from './Home/RightBar.vue';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import { Search } from '@element-plus/icons-vue'
import SettingItem from '../components/Setting/SettingItem.vue'
import { useRoute, useRouter } from 'vue-router';
interface SettingProps {
  
}
const props = defineProps<SettingProps>()
const {  } = toRefs(props)
const { input } = useState({
  input:''
})
const settingList = [
  'Your account',
  'Security and account access',
  'Privacy and safety',
  'Notifications',
  'Accessibility, display, and languages',
  'Additional resources'
]
const router = useRouter()
</script>
<template>
  <div class="setting-container">
      <MiddleTopHeader :back-btn="true" name="Setting" />
    <SettingItem 
      v-for="(item,index) in settingList" 
      @click="router.push('/setting/Account')"
      :key="index" 
      :name="item" 
    />
  </div>
</template>

<style lang="less" scoped>
:deep(.el-input__inner){
  height:40px 
}
:deep(.el-input__wrapper){
  border-radius: 20px;
}
.setting-container{
  border: 2px solid #F4F4F4;
  .search-container{
    padding: 15px;
  }
}
@media screen and (min-width:600px){
  .setting-container{
    border: 2px solid #F4F4F4;
  }
  .setting-container{
    width:85%;
    height: 99%;
  }
}
@media screen and (max-width:599px){
  .setting-container{
    width:100%;
    height: 99%;
  }
}
</style>