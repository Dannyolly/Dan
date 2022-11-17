<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { Collection, PriceTag, Notification,
   Document ,Reading, User ,Warning,Setting} from '@element-plus/icons-vue';
import { normalUrl } from '@/api/config';
import { useRouter } from 'vue-router';
import { LocalStorageManager } from '@/utils/localStorage';
interface MobileDrawerProps {

}
const {} = defineProps<MobileDrawerProps>()
const { currentIndex } = useState({
    currentIndex:0
})
const { isOpenDrawer , userInfo,messager } = storeToRefs(useUserStore())
const icons = [

  {
    tag:'Mark',
    dom:Warning,
  },
  {
    tag:'Profile',
    dom:Collection
  },
  {
    tag:'Setting',
    dom:Setting
  }
]
const router = useRouter()
const goTo= (index:number)=>{
  currentIndex.value = index
  router.push(`/${icons[index].tag.toLocaleLowerCase()}`)
  isOpenDrawer.value = false;
}

const logout = ()  =>{
  LocalStorageManager.removeLocalStorageInfo('userInfo')
  LocalStorageManager.removeLocalStorageInfo('token')
  isOpenDrawer.value  =false;
  router.replace('/login')
}

</script>
<template>
  <el-drawer
    v-model="isOpenDrawer"
    :direction="'ltr'"
    size="50%"
  >
    <template #title>
        <div style="font-size: 13px;font-weight: 600;">
            Account Info
        </div>
    </template>
    <div class="title">
        <img :src="normalUrl + userInfo?.avatar" >
        <div class="name">{{userInfo?.name}}</div>
        <div class="follow" >{{messager?.length? `${messager?.length} followers` : '' }}</div>
    </div>
    <div class="left-bar-navi-container">
      <div class="left-bar-navi-real-container">
        <div v-for="(Item,index) in icons" class="btn-container">
            <div @click="goTo(index)" class="navigation-button">
                <div  :style="{display:'flex'}">
                <el-icon :size="28"   >
                    <component :is="Item.dom"></component>
                </el-icon>
                <div id="btn-font" > {{Item.tag}} </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div @click="logout" style="width: 70%;position: absolute;bottom: 30px;display: flex;">
        <el-button type="primary" round style="width:100%">
            LogOut
        </el-button>
    </div>
  </el-drawer>
</template>

<style lang="less" scoped>
.title{
    display: flex;
    flex-direction: column;
    font-style: @font-style;
    
    img{
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50%;
        object-fit: cover;
        border: 0px solid rgb(238,238,238);
    }
    .name{
        line-height: 45px;
        font-weight: 600;
    }
    .follow{
        color: #CDCDCD;
        font-size: 14px;
    }
}

.left-bar-navi-container{
    padding-top: 20px;
    align-items: center;
    justify-content:flex-start;
    display:flex;
    padding-left: 0px;
      .left-bar-navi-real-container{
        width:80%;
        max-width: 214px;
        display: flex;
        flex-direction: column;
        .navigation-button{
            position: relative;
            width:min-content;
            padding: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            margin-bottom: 20px;
            padding-left: 0px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.85) ;
            border-radius: 40px;
            cursor: pointer;
            #btn-font{
              font-size: 14px;
              padding-left: 10px;
              line-height: 28px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            }
          }
        .bottom-btn-container{
          flex: 1;
          display: flex;
          justify-content: left;
        }
      }
    }
</style>