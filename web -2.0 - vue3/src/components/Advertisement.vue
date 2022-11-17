<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style';
/* interface AdvertisementProps {}
const props = defineProps<AdvertisementProps>()
const { } = toRefs(props)
const {} = useState({}) */
</script>
<template>
  <div class='advertisement-container' :style="{display:'flex',paddingLeft:10}">
      <img  
        :style="{
          width:'35%',
          maxWidth:80,
          height:'100%',
          borderRadius:'10px',
          marginRight:'10px',
          objectFit:'cover',
        }"
      src='../assets/post.png' />
      <div :style="{...middleStyle,flexDirection:'column'}">
        <div :style="{fontSize:'14px',fontWeight:500}">Dead by Daylight</div>
        <div :style="{fontSize:'5px'}">DeadbyDaylight.com</div>
      </div>
    
    </div>
</template>

<style lang="less" scoped>
.advertisement-container:hover{
    background-color: rgb(228,230,232);
}

.advertisement-container{
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 10px;
}

// PC
@media screen and (min-width:1300px) {
    
}

// PC
@media screen and (min-width:1100px) and (max-width:1299px) {
    
    
}
// ipad
@media screen and (min-width:600px) and (max-width:1099px) {
    
}

// phone
@media screen and (min-width:0px) and (max-width:599px) {
    
    .right-content-container{
        display: none;
    }
}

.home-container::-webkit-scrollbar {
    display: none;
}
</style>