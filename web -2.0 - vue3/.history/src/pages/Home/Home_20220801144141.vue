<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/MiddleTopHeader.vue';
interface HomeProps {}
const props = defineProps<HomeProps>()
const { } = toRefs(props)
const {} = useState({})
</script>
<template>
  <div class='home-container'> 
          <div class='home-post-container' 
          :style="{width:'100%',height:'100%',display:'flex',overflow:'scroll',flexDirection:'column'}"
          > 
            <MiddleTopHeader/>
          </div>
    </div>
</template>

<style lang="less" scoped>
.home-post-container::-webkit-scrollbar{
    display: none;
}

.infinite-scroll-component::-webkit-scrollbar{
    display: none;
}
// PC
@media screen and (min-width:1300px) {
    .home-container{
        width: %;
        height: 100%
        border-right-width: 1px;
        border-right-color: #CDCDCD;
        overflow: scroll;
    }
}

// PC
@media screen and (min-width:1100px) and (max-width:1299px) {
    
    .home-container{
        max-width: 600px;
        
        width: 80%;
        height: calc(100%-53px);
        border-right-width: 1px;
        border-right-color: #CDCDCD;
        overflow: scroll;
    }
}



// ipad
@media screen and (min-width:600px) and (max-width:1099px) {
    .home-container{
        max-width: 600px;
        
        width: 80%;
        height: calc(100%-53px);
        border-right-width: 1px;
        border-right-color: #CDCDCD;
        overflow: scroll;
    }
}

// phone
@media screen and (min-width:0px) and (max-width:599px) {
    .home-container{
        width: 100%;
        /* overflow: scroll; */
        /* padding-top: 53px; */

    }
    
}


.home-container::-webkit-scrollbar {
    display: none;
}
</style>