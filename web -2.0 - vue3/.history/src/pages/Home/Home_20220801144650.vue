<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/MiddleTopHeader.vue';
import Publish from '@/components/Publish.vue';
import RightBar from './RightBar.vue';
import Post from '@/components/Post.vue';
import { Post } from '@/types/post';
interface HomeProps {}
const props = defineProps<HomeProps>()
const { } = toRefs(props)
const {} = useState({
    postArr:[] as Post[]
})
</script>
<template>
    <div class='home-container'> 
          <div class='home-post-container' 
          :style="{width:'100%',height:'100%',display:'flex',overflow:'scroll',flexDirection:'column'}"
          > 
            <MiddleTopHeader name='Home' />
            <Publish/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
          </div>
    </div>
    <RightBar/>
</template>

<style lang="less" scoped>
.home-post-container::-webkit-scrollbar{
    display: none;
}

.infinite-scroll-component::-webkit-scrollbar{
    display: none;
}
// PC
@media screen and (min-width:600px) {
    .home-container{
        display: flex;
        flex: 1;
        flex-direction: column;
        border-right-width: 1px;
        border-right-color: #CDCDCD;
        overflow: scroll;
    }
}



// ipad
@media screen and (max-width:599px)  {
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
    }
    
}


.home-container::-webkit-scrollbar {
    display: none;
}
</style>