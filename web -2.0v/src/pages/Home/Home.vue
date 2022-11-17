

<script setup lang='tsx'>
import {defineComponent,defineProps, toRefs, ref, watchEffect, onMounted, computed, ExtractPropTypes,  ComponentPublicInstance, getCurrentInstance} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import Publish from '@/components/Publish.vue';
import RightBar from './RightBar.vue';
import { FormattedPost, Post as PostInfo } from '@/types/post';
import { useMutationObserver, useResizeObserver } from '@vueuse/core';
import VirtualList from '@/components/VirtualList'
import { Faker, faker } from '@faker-js/faker';
import { Random } from '@/utils/Num';
import Home1 from '../../components/Skeleton/HomeSkeleton.vue';
import HomeSkeleton from '../../components/Skeleton/HomeSkeleton.vue';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { Column, ElNotification, useId } from 'element-plus';
import { TimeSlice } from '@/utils/TimeSlice'
import Post from '@/components/Post.vue';
import { uploadPost , getUnReceivePosts } from '@/service/post';
import { log } from 'console';
import { LocalStorageManager } from '@/utils/localStorage';
import EmptyVue from '@/components/Empty.vue';
import { usePubSub } from '@/hooks/usePubSub';
import { file } from '@babel/types';
/* import { VirtualList } from '@/types/virtualList'; */
/* type vList = typeof VirtualList
 */
interface HomeProps {}
const props = defineProps<HomeProps>()
const { } = toRefs(props)
const { postArr ,isLoad,currentPage,pageSize,isEnd,isloading } = useState({
    postArr:[] as any[],
    isLoad:false,
    isloading:false,
    currentPage:1,
    pageSize:5,
    isEnd:false
})
const home  = ref(null)
const pubsub = usePubSub()
const appendDataFn = ref<(post:FormattedPost)=>void>()
const deleteDataFn = ref<(index:number)=>void>()
const noMoreDataFn=  ref<()=>void>()

const getVirtualListMethod = ( appendData:(post:FormattedPost)=>void, deleteData:(index:number)=>void , noMoreData:()=>void) =>{
    appendDataFn.value = appendData
    deleteDataFn.value = deleteData
    noMoreDataFn.value = noMoreData
}
const loadData = async ()=>{
    let temp = [] as FormattedPost[]
    const { data } = await getUnReceivePosts(
        LocalStorageManager.getLocalStorageInfo('userInfo').id,
        0,
        currentPage.value++,
        pageSize.value
    )
    const id = LocalStorageManager.getLocalStorageInfo('userInfo').id
    let posts = data.data;

    
    // for (let i = 0; i < posts.length; i++) {
    //     const el  = posts[i];
    //     let userInfo:UserInfo = {
    //         id: el.user_id,
    //         password: el.password,
    //         name: el.name,
    //         email: el.email,
    //         avatar: el.avatar
    //     }
    //     posts[i].userInfo = userInfo;
    // }
    for (let i = 0; i < posts.length; i++) {
        temp.push(posts[i]) 
    }
    return temp
}
const onload = async (noMoreData:()=>void)=>{
    //console.log('loaded More data ,current page -',currentPage.value);
    isloading.value  = true
    let data = await loadData()
    if(data.length===0){
        noMoreData();
        isEnd.value = true;
        return ;
    }
    postArr.value.push(...data)    
    isloading.value = false;
}

const publish = async (post,des,files)=>{
    let flag = true;
    if(files.length ===0){
        flag = false
    }
    const { data } = await uploadPost(flag?files[0]:null,"hi",des,LocalStorageManager.getLocalStorageInfo('userInfo').id);
    
    post.images = data.data.path;
    post.id = data.data.id;
    post.created_at = new Date().toDateString();
    post.name = LocalStorageManager.getLocalStorageInfo('userInfo').name
    post.avatar  = LocalStorageManager.getLocalStorageInfo('userInfo').avatar
    if(appendDataFn.value){
        appendDataFn.value(post)
    }
    ElNotification({
        title: 'Success',
        message: 'Success to publish new Post',
        type: 'success',
        duration:2000
    })
}

const HomeHeader =()=>{
    return (
        <div>
            <MiddleTopHeader name={'Home'}  />
            <Publish  onUploadNewPost={publish} />
            {
                !isLoad.value
                &&
                <HomeSkeleton /> 
            }
        </div>
    )
}

const BottomEl  = ()=>{
    if(!isLoad.value){
        return;
    }
    return (
        <>
        {

            <EmptyVue isLoad  desc='NO POST ANYMORE' imageSize={300} />
        }
        </>
    )
}

onMounted(async ()=>{   
    
    postArr.value =await loadData()
    pubsub.subscribe('publish',(message,{des,files,post})=>{
        publish(post,des,files)
    })
    setTimeout(() => {
       isLoad.value = true
    }, 500);
    
})  

</script>
<template>
    <div ref="home" class='home-container'> 
          <div class='home-post-container' 
          :style="{width:'100%',height:'100%',display:'flex',flexDirection:'column',position:'relative'}"
          > 
            <VirtualList 
                :Header="HomeHeader"
                :data="postArr.length===0?[]:postArr" 
                :Item="Post" 
                :estimate-size="100" 
                :buffer-size="10"
                :onReach="onload"
                :is-show-data="isLoad"
                :debounce-delay-time="16.7"
                is-keep-alive
                :virtual-list-method="getVirtualListMethod"
                :item-props="{
                    isShowInteract:true
                }"
                :Bottom="BottomEl"
            />
          </div>
          
        
            
    </div>
    <RightBar/>
</template>

<style lang="less" scoped>
::-webkit-scrollbar{
    display: none;
}

// PC
@media screen and (min-width:600px) {
    .home-container{
        display: flex;
        flex: 1;
        max-width: 650px;
        flex-direction: column;
        border: 1px solid rgb(238,238,238);
        overflow: scroll;
        position: relative;
        
        .home-post-container{
            position: relative;
        }
    }
}



// ipad
/* @media screen and (max-width:599px)  {
    .home-container{
        display: flex;
        flex: 1;
        border: 0.5px solid #F4F4F4;
        flex-direction: column;
        overflow: scroll;
    }
}
 */
// phone
@media screen and (min-width:0px) and (max-width:599px) {
    .home-container{
        width: 100%;
        padding-bottom: 60px;
    }
    
}


/* .home-container::-webkit-scrollbar {
    display: none;
} */
</style>