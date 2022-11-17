<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import Logo from '@/components/Logo.vue';
import {
  PriceTag, 
  Document ,
  Notification,
  Warning,
  Collection,
  Setting,
  Reading,
  User
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { middleStyle } from '@/utils/Style';
import Publish from '@/components/Publish.vue';
import IconButton from '@/components/IconButton.vue';
import pubsub from 'pubsub-js'
import { ElNotification } from 'element-plus';
import { useNotificationStore } from '@/store/Notification';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/store/Chat';
import { computed } from '@vue/reactivity';
/* interface LeftBarProps {


}
const props = defineProps<LeftBarProps>()
const { } = toRefs(props) */
const router = useRouter()
const icons = [
  {
    tag:'Home',
    dom:PriceTag,
  },
  {
    tag:'Message',
    dom:Document,
  },
  {
    tag:'Messager',
    dom:User
  },
  {
    tag:'Notification',
    dom:Notification,
  },
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

const { dialogVisible ,currentIndex  } = useState({
  dialogVisible:false,
  currentIndex:0,
})
const { msgLength ,isRead, } = storeToRefs( useNotificationStore() )
const { unreadMsg } = storeToRefs(useChatStore())
const unreadNumber = computed(()=>unreadMsg.value.flat().length);
const goTo= (index:number)=>{
  currentIndex.value = index
    router.push(`/${icons[index].tag.toLocaleLowerCase()}`)
  
}
const handleClose = (done: () => void) => {
  
}

const handleUpload = (post,des)=>{
  pubsub.publish('publish',post)
  ElNotification({
      title: 'Success',
      message: 'Success to publish new Post',
      type: 'success',
      duration:1000
  })
  dialogVisible.value = false
}

watchEffect(()=>{
  const { msgLength ,follows , notifications } = useNotificationStore();  
})

</script>

<template>
  <div class="left-bar-container">
    <Logo/>
    <div class="left-bar-navi-container">
      <div class="left-bar-navi-real-container">
        <div v-for="(Item,index) in icons" class="btn-container">
           <div @click="goTo(index)" class="navigation-button">
              <div v-if=" !isRead && msgLength!==0 && Item.tag === 'Notification'" class="noti-number">
                {{msgLength}}
              </div>
              <div v-if=" unreadNumber!==0 && Item.tag === 'Message'" class="noti-number">
                {{unreadNumber}}
              </div>
              <div  :style="{display:'flex'}">
                <el-icon :size="28"   >
                  <component :is="Item.dom"></component>
                </el-icon>
                <div id="btn-font" :style="{
                  paddingTop: '2px',
                  paddingLeft: '13px',
                  fontSize: '110%',
                  fontWeight:500,
                  paddingBottom: '1px',
                }"> {{Item.tag}} </div>
              </div>
          </div>
        </div>
        <div class="bottom-btn-container" >
          <el-button class="pc" size="large" type="primary" round 
          style="padding-left: 60px;padding-right: 60px;
          padding-top: 10px;padding-bottom: 10px;"
          @click="dialogVisible = true"
          >
          Dan !
          </el-button>
          <el-button 
          style="margin-left:0px" 
          circle 
          class="mini" 
          type="primary" 
          size="large" 
          :icon="Reading" 
          @click="dialogVisible = true"
          >
          </el-button>
        </div>
      </div>
    </div>
    
  </div>
  
  <div>
    <el-dialog
      v-model="dialogVisible"
    >
        <Publish 
        :onUploadNewPost="handleUpload" 
        :min-rows="5" 
        :underline="false" />
    </el-dialog>
  </div>
  
</template>

<style lang="less" scoped >

:deep(.el-dialog){
  border-radius: 40px;
  width: 70%;
  min-width: 400px;
  max-width: 600px;
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
  left: 0px;
  top: 0px;
  z-index: 1;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  color: #FFFFFF;
  background-color: rgb(64,158,255);
  border-radius: 20px;
}
@media screen and (min-width:1100px) {
  .bottom-bar-container{

    display: none;
   
  }
  .pc{
    display: flex;
  }
  .mini{
    display: none;
  }
 .left-bar-container{
    display: flex;
    width: 23%;
    min-width: 140px;
    height: 100%;
    flex-direction: column;
    .left-bar-navi-container{
        padding-top: 5px;
        align-items: center;
        justify-content:flex-end;
        display:flex;
        padding-left: 0px;
      .left-bar-navi-real-container{
        width:80%;
        max-width: 214px;
        display: flex;
        flex-direction: column;
        .navigation-button{
            position: relative;
            transition: all 0.3s;
            width:min-content;
            padding: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.85) ;
            border-radius: 40px;
            cursor: pointer;
            #btn-font{
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            }
          }
        .navigation-button:hover{
            background-color: #e7e7e8;
        }
        .bottom-btn-container{
          flex: 1;
          display: flex;
          justify-content: left;
        }
      }
    }
 }
}

@media screen and (min-width:600px) and (max-width:1099px) {
  .bottom-bar-container{

    display: none;
   
  }
  .pc{
    display: none;
  }
  .mini{
    display: flex;
  }
  .left-bar-container{
    display: flex;
    width: 13%;
    height: 100%;
    flex-direction: column;
    .left-bar-navi-container{
        padding-top: 5px;
        align-items: center;
        justify-content:flex-end;
        display:flex;
        padding-left: 0px;
      .left-bar-navi-real-container{
        width:80%;
        max-width: 214px;
        display: flex;
        flex-direction: column;
        .btn-container{
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .navigation-button{
          position: relative;
          transition: all 0.3s;
          width:min-content;
          padding: 10px;
          padding-top: 10px;
          padding-bottom: 10px;
          margin-bottom: 20px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.85) ;
          border-radius: 40px;
          cursor: pointer;
          #btn-font{
            display: none;
          }
        }
        .navigation-button:hover{
          background-color: #e7e7e8;
        }
        .bottom-btn-container{
          flex: 1;
          display: flex;
          justify-content: center;
        }
      }
    }
 }
}

@media screen and (min-width:0px) and (max-width:599px) {
  .pc{
    display: none;
  }
  .mini{
    display: flex;
  }
  .left-bar-container{
    display: none;
    width: 15%;
    height: 100%;
    flex-direction: column;
  }
  .bottom-bar-container{
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 10000;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px #CDCDCD;
  }
}
</style>