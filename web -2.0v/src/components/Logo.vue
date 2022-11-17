<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { useRouter } from 'vue-router';
/* interface LogoProps {}
const props = defineProps<LogoProps>()
const { } = toRefs(props) */
const {} = useState({

})
const router=  useRouter()
</script>
<template>
  <div @click="router.push('/')" class='logo-container'>
      <div class='logo-real-container' >
          <img  :src="require('../assets/home.png')" />
          <div  class="name">DanDan</div>
      </div>
    </div>
</template>

<style lang="less" scoped>
.logo-container{
    cursor: pointer;
}

// PC
@media screen and (min-width:1100px)  {
    .logo-container{
        height: 70px;
        align-items: center;
        justify-content:flex-end;
        display:flex;
        padding-left: 20px;
        .logo-real-container{
            width: 80%;
            max-width: 204px;
            display:flex;
            padding-right: 0%;
            img{
                width:40px;
                height: 40px;
                margin-right:5px
            }
            .name {
                justify-content:center;
                align-items:center;
                display:flex;
                color:rgb(6,117,232);
                font-weight:bold;
                font-size:18px;
            }
        }
    }
}
// ipad
@media screen and (min-width:600px) and (max-width:1099px) {
    .logo-container{
        height: 70px;
        align-items: center;
        justify-content:flex-end;
        display:flex;
        padding-left: 10px;
        .logo-real-container{
            width: 80%;
            max-width: 204px;
            display:flex;
            padding-right: 0%;
            justify-content: center;
            img{
                width:40px;
                height: 40px;
                margin-right:5px
            }
            .name {
                display: none;
            }
        }
    }
}

// phone
@media screen and (min-width:0px) and (max-width:600px) {
    
    .logo-container{
        height: 70px;
        align-items: center;
        justify-content:center;
        display:flex;
        padding-left: 5px;
        .logo-real-container{
            width: 80%;
            max-width: 204px;
            display:flex;
            padding-right: 0%;
            justify-content: center;
            img{
                width:40px;
                height: 40px;
                margin-right:5px
            }
            .name {
                display: none;
            }
        }
    }
}
</style>