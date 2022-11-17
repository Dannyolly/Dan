<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/MiddleTopHeader.vue';
import Publish from '@/components/Publish.vue';
import RightBar from './RightBar.vue';
import Post from '@/components/Post.vue';
import { Post as PostInfo } from '@/types/post';
interface HomeProps {}
const props = defineProps<HomeProps>()
const { } = toRefs(props)
const { postArr } = useState({
    postArr:[] as PostInfo[]
})

onMounted(()=>{
    let postInfo:PostInfo = {
        id:1,
        introduction:"ICYMI: The Avengers aren't officially returning to the MCU until 2025's Avengers: The Kang Dynasty. Which heroes can you expect to assemble at that point? From Thor to Wong to Ms. Marvel to She-Hulk, we break down the most likely candidates.",
        userId:1,
        likeCount:123,
        postDate:new Date(),
        postImage:''
    }
    postArr.value = new Array(100).fill(postInfo);
    console.log(postArr.value);
    
})  
</script>
<template>
    <div class='home-container'> 
          <div class='home-post-container' 
          :style="{width:'100%',height:'100%',display:'flex',overflow:'scroll',flexDirection:'column'}"
          > 
            <MiddleTopHeader name='Home' />
            <Publish/>
            <!-- <Post v-for="(item,index) in postArr" 
            :key="index" 
            :post-info="item" /> -->
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
        display: flex;
        flex: 1;
        flex-direction: column;
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