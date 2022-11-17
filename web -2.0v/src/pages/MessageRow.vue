<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
interface MessageRowProps {
    self:boolean,
    message?:string,
    pic?:string,
    userPic?:string
}
const props = defineProps<MessageRowProps>()
const { self , message , pic ,userPic } = toRefs(props)
const {} = useState({})
</script>
<template>
    <div v-if="self" style="width: calc( 100% - 20px );margin-bottom: 20px;display: flex;justify-content: flex-end;padding-right: 10px;padding-left: 10px;">
        <div class="content-r" >
          {{message}}
          <img style="width: 50px;height: 50px;border-radius: 10px;" v-if=" pic!=='' " :src="self?pic:'http://127.0.0.1:8000/'+pic" alt="">
        </div>
      <div style="display: flex;align-items: flex-end;">
        <img src="../assets/icon.png" style="margin-left: 10px;border-radius: 20px;width: 40px;height: 40px">
      </div>
    </div>

    <div v-else style="width: calc( 100% - 20px );margin-bottom: 20px;display: flex;justify-content: flex-start;padding-right: 10px;padding-left: 10px;">
      <div style="display: flex;align-items: flex-start;">
        <img  src="../assets/icon.png" style="margin-right: 10px;border-radius: 20px;width: 40px;height: 40px">
      </div>
      <div class="content-l" >
        {{message}}
        <img style="width: 50px;height: 50px;border-radius: 10px;" v-if=" pic!=='' " :src="self?pic:'http://127.0.0.1:8000/'+pic" alt="">
      </div>
      
    </div>
</template>

<style scoped>

.content-r{
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      border-top-right-radius: 15px;
      color: aliceblue;
      background-color: rgb(29,155,240);
      width: fit-content;
      padding: 10px;
      padding-left: 15px;
      padding-right: 15px;
}
.content-l{
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    color: aliceblue;
    background-color: rgb(29,155,240);
    width: fit-content;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
}
</style>