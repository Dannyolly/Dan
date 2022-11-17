<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, computed} from 'vue';
import {useState} from '@/hooks/useState';
import { Collection, PriceTag, Notification,
   Document ,Reading, User,Promotion } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import Publish from '@/components/Publish.vue';
import Messager from '@/pages/Messager.vue';
import { usePubSub } from '@/hooks/usePubSub';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/store/Notification';
import { useChatStore } from '@/store/Chat';
/* interface BottomBarProps {}
const props = defineProps<BottomBarProps>()
const { } = toRefs(props) */
const { dialogVisible } = useState({
    dialogVisible:false
})
const pubsub = usePubSub()
const iconsMini = [
  {
    tag:'Home',
    dom:PriceTag,
  },
  {
    tag:'Message',
    dom:Document,
  },
  {
    tag:'Notification',
    dom:Notification,
  },
  {
    tag:"Messager",
    dom:User
  }
]
const { msgLength ,isRead, } = storeToRefs( useNotificationStore() )
const { unreadMsg } = storeToRefs(useChatStore())
const unreadNumber = computed(()=>unreadMsg.value.flat().length);
const router = useRouter()
const goTo= (index:number)=>{
    router.push(`/${iconsMini[index].tag.toLocaleLowerCase()}`)
}
const handleUpload = (post,des,files)=>{
  const param = {post,des,files}
  pubsub.publish('publish', param )
  dialogVisible.value = false
}
onMounted(()=>{
  
})
</script>
<template>
  <div class="bottom-bar-container">
    <div v-for="(Item,index) in iconsMini">
        <div style="display:flex;position: relative;" >
          <div v-if="index===2 && msgLength !==0 || index === 1 && unreadNumber !==0" class="noti-number" >
            {{index ===2 ?
             msgLength  :
             unreadNumber 
            }}
          </div>
          <el-button  
              @click="goTo(index)"
              style="font-size: 24px;" 
              size="large" 
              circle 
              color="#FFFFFF"  
              :icon="Item.dom"
          />
        </div>
        
    </div>
    <div @click="dialogVisible = true" style="position: absolute;right: 20px;bottom: 100px;">
      <el-button style="width: 50px;height: 50px;font-size: 20px" type="primary" circle   > 
          <el-icon >
            <Promotion />
          </el-icon>
      </el-button>
    </div>
    <!-- publish -->
    <el-dialog
      v-model="dialogVisible"
    >
        <Publish 
          :min-rows="5" 
          :underline="false" 
          :onUploadNewPost="handleUpload" 
        />
    </el-dialog>
  </div>
  
</template>

<style scoped>
:deep(.el-dialog){
  border-radius: 40px;
  width: 70%;
  min-width: 400px;
  height: auto;
  padding: 20px;
  padding-top: 20px;
  padding-bottom: 0px;
}
:deep(.el-dialog__body){
  padding: 0px;
}
.noti-number{
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #FFFFFF;
  background-color: rgb(64,158,255);
  border-radius: 20px;
  font-size: 8px;
}
.bottom-bar-container{
    position: fixed;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    bottom: 0;
    width: 100%;
    height: 60px;
    padding-bottom: 20px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px #CDCDCD;
}

@media screen and (max-width:599px) {
    .bottom-bar-container{
        display: flex;
    }
}
@media screen and (min-width:600px) {
    .bottom-bar-container{
        display: none
    }
}
</style>