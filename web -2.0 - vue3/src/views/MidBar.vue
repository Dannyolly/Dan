<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
/* interface MidBarProps {}
const props = defineProps<MidBarProps>()
const { } = toRefs(props) */
const {
  
} = useState({

})

const route = useRoute()
</script>
<template>
  <div class="mid-bar-container">
      <router-view  v-slot="{ Component }">
        <keep-alive  include="Home,Message,Notification,Mark,Profile,Messager" >
          <component :is="Component" />
        </keep-alive>
      </router-view>

  </div>
  
</template>

<style lang="less" scoped>

// PC
@media screen and (min-width:821px) {
    .mid-bar-container{
        display: flex;
        flex: 1; 
        /* border: 0.5px solid black;
        border-right-width: 10px;
        border-top-width: 0px;
        border-bottom-width: 0px; */
        /* position: relative; */
    }
    .mid-bar-real-container{
      position:absolute;
      display: flex;
    }
}


// phone
@media screen and (min-width:0px) and (max-width:820px) {
  .mid-bar-container{
    display: flex;
    flex: 1;
  }
}
</style>