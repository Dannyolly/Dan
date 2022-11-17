<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import {
  Message,
  MoreFilled,
  Search
} from '@element-plus/icons-vue'
import IconButton from '@/components/IconButton.vue';
import Messager from '@/components/Messager.vue';
import Advertisement from '@/components/Advertisement.vue';
/* interface RightBarProps {}
const props = defineProps<RightBarProps>()
const { } = toRefs(props) */
const {} = useState({})
</script>
<template>
  <div class="right-bar-container">
      <div class="right-bar-real-container">
          <div class="top">
              <IconButton :icon="Message" />
              <IconButton :icon="MoreFilled" />
              <div style="margin-right: 10px"/>
              <img src="../assets/icon.png" 
              style="width: 35px;height: 35px;border-radius: 20px;cursor: pointer;" />
          </div>
          <div class="mid">
              <div class="mid-top">
                  <div class="title" style="font-size: 18px;font-weight: 800;,font-weight: 500color: rgb(15, 20, 25)">Messager</div>
                  <el-icon style="cursor: pointer">
                      <Search/>
                  </el-icon>
              </div>
              <Messager/>
              <Messager/>
              <Messager/>
              <Messager/>
              <Messager/>
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
  width: 23%;
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