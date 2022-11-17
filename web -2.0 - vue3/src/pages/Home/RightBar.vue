<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, unref} from 'vue';
import {useState} from '@/hooks/useState';
import {
  Message,
  MoreFilled,
  Search
} from '@element-plus/icons-vue'
import IconButton from '@/components/IconButton.vue';
import Messager from '@/components/Messager.vue';
import Advertisement from '@/components/Advertisement.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { Random } from '@/utils/Num';
import { LocalStorageManager } from '@/utils/localStorage';
import { useStore } from 'vuex';
import { storeToRefs } from 'pinia';
import { sentAddRequest } from '@/service/ws'
import { UserInfo } from '@/types/user';
import { getUserFds} from '@/service/user';
import { normalUrl } from '@/api/config';
/* interface RightBarProps {}
const props = defineProps<RightBarProps>()
const { } = toRefs(props) */
const { fds } = useState({
    fds:[] as UserInfo[] | undefined
})

const user = useUserStore();
const { userInfo,messager }  = storeToRefs(user)
const router = useRouter()
const list = [
    {
       title: 'Add an Exist Account',
       Fn:()=>null
    },
    {
       title:'Logout',
       Fn:logOut
    }
    ]
function logOut(){
    
    /* useHomeStore().setUserInfo('wow ~' + Random(0,100)) */
    LocalStorageManager.removeLocalStorageInfo('userInfo')
    LocalStorageManager.removeLocalStorageInfo('token')
    router.replace('/login')
}

function goPersonPage(info:UserInfo){
    router.push({
        path:'/personProfile',
        query:{
            username:info.name,
            info:JSON.stringify(info)
        }
    })
}

onMounted(async ()=>{
    
})



</script>
<template>
  <div class="right-bar-container">
      <div class="right-bar-real-container">
          <div class="top">
              <IconButton :icon="Message" @click="sentAddRequest" />
              <IconButton :icon="MoreFilled" />
              <div style="margin-right: 10px"/>
            <el-dropdown trigger="click">
                <img :src="normalUrl + userInfo?.avatar"  />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="item.Fn" :key="index" v-for="(item,index) in list">
                            {{item.title}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
          </div>
          <div class="mid">
              <div class="mid-top">
                  <div class="title" style="font-size: 18px;font-weight: 800;,font-weight: 500color: rgb(15, 20, 25)">Messager</div>
                  <el-icon style="cursor: pointer">
                      <Search/>
                  </el-icon>
              </div>
              
              <Messager @click="goPersonPage(unref(item))" v-for="(item,index) in messager" :info="item"  />
          </div>
          <div class="bottom">
              <div >
                  <div class="title" style="font-size: 18px;font-weight: 800;
                  margin-bottom: 20px;color: rgb(15, 20, 25);
                  ">Advertisement</div>
                  <Advertisement/>
                  <Advertisement/>
                  <Advertisement/>
              </div>
          </div>
      </div>
  </div>
</template>

<style lang="less" scoped>
/* .title{
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
} */
.right-bar-container{
  max-width: 300px;
  width: 30%;
  padding: 20px;
  display: flex;
  .right-bar-real-container{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
    .top{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 20px;
      img{
        width: 35px;
        height: 35px;
        border-radius: 20px;
        cursor: pointer;
      }
    }
    .mid{
        width: calc(100% - 40px);
        margin-bottom: 20px;
        padding: 20px;
        background-color: rgb(247, 249, 249);
        border-radius: 15px;
        .mid-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
    }
    .bottom{

      width: 100%;
      width: calc(100% - 40px);
      padding: 20px;
      padding-bottom: 0px;
      background-color: rgb(247, 249, 249);
      margin-bottom: 20px;
      border-radius: 15px;
    }
  }
}

// PC
@media screen and (min-width:1300px) {
    

}

// PC
@media screen and (min-width:1100px) and (max-width:1299px) {
    
    
}
// ipad
@media screen and (min-width:600px) and (max-width:820px) {
    .right-bar-container{
        display: none;
    }
}

// phone
@media screen and (min-width:0px) and (max-width:600px) {
    
    .right-bar-container{
        display: none;
    }
}
</style>