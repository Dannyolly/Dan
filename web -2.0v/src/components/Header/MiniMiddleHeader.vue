<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import Logo from '../Logo.vue';
import { middleStyle } from '@/utils/Style';
import { Message, MoreFilled } from '@element-plus/icons-vue';
import IconButton from '../IconButton.vue';
/* interface MiniMiddleHeaderProps {

}
const props = defineProps<MiniMiddleHeaderProps>()
const { } = toRefs(props)
const {} = useState({}) */
</script>
<template>
  <div class="mini-middle-header-container">
    <div class="max" >
        <div class="name">Home</div>
    </div>
    <div style="display: flex;padding-right: 20px;">
        <IconButton :icon="Message" />
        <IconButton :icon="MoreFilled" />
        <div style="margin-right: 10px"/>
        <img src="../assets/icon.png" 
        style="width: 35px;height: 35px;border-radius: 20px;cursor: pointer;" />
    </div>
  </div>
</template>

<style lang="less" scoped>


@media screen and (min-width:0px) and (max-width:820px) {

  .mini-middle-header-container{
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name{
        padding-left: 10px;
        align-items:center;
        display:flex;
        color:black;
        font-weight:bold;
        font-size:18px;
    }
  }
}

@media screen and (min-width:821px){
  
  .name{
    padding-left: 10px;
    color:black;
  }
  .mini-middle-header-container{
    padding-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name{
        padding-left: 5px;
        align-items:center;
        display:flex;
        font-weight:bold;
        font-size:18px;
        padding-left: 10px;
        color:black;
    }
  }
}
</style>