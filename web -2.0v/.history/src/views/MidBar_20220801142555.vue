<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
/* interface MidBarProps {}
const props = defineProps<MidBarProps>()
const { } = toRefs(props) */
const {
  
} = useState({

})
</script>
<template>
  <div class="mid-bar-container">
      <router-view/>
  </div>
  
</template>

<style lang="less" scoped>

// PC
@media screen and (min-width:821px) {
    .mid-bar-container{
        display: flex;
        flex: 1; 
        border-right-width: 0.5px;
        border-right-color: #CDCDCD;
        border-left-width: 0.5px;
        border-left-color: #CDCDCD;
        border: 0.5px solid rgb(244, 244, 244);
        border-top-width: 0px;
        border-bottom-width: 0px;
        /* position: relative; */
    }
    .mid-bar-real-container{
      position:absolute;
      display: flex;
    }
}

// ipad
@media screen and (min-width:600px) and (max-width:820px) {
  .mid-bar-container{
    width: 75%;
    border-right-width: 0.5px;
    border-right-color: #CDCDCD;
    border-left-width: 0.5px;
    border-left-color: #CDCDCD;
    border: 0.5px solid rgb(244, 244, 244);
    border-top-width: 0px;
    border-bottom-width: 0px;
  }
}

// phone
@media screen and (min-width:0px) and (max-width:600px) {
    .mid-bar-container{
    width: 100%;
    border-right-width: 0.5px;
    border-right-color: #CDCDCD;
    border-left-width: 0.5px;
    border-left-color: #CDCDCD;
    border: 0.5px solid rgb(244, 244, 244);
    border-top-width: 0px;
    border-bottom-width: 0px;
  }
}
</style>