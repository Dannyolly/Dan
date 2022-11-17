<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted, watch} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import IconButton from '@/components/IconButton.vue';
import { Edit , Setting} from '@element-plus/icons-vue'
import TabBar from '@/components/TabBar.vue';
import Post from '@/components/Post.vue';
import RightBar from '../Home/RightBar.vue';
import { faker } from '@faker-js/faker';
import { FormattedPost } from '@/types/post';
import { Random } from '@/utils/Num';
import { useRoute, useRouter } from 'vue-router';
import { useId } from 'element-plus';
import { getUnReceivePosts, getUserPosts } from '@/service/post';
import { LocalStorageManager } from '@/utils/localStorage';
import { normalUrl } from '@/api/config';
import { getUserById } from '@/service/user';
import { UserInfo } from '@/types/user';
import VirtualList from '@/components/VirtualList'
import { VirtualListMethod } from '@/types/virtualList';
import PH from './ProfileHeader.vue'
import EmptyVue from '@/components/Empty.vue';
import { last } from 'lodash';
import { profile } from 'console';
interface ProfileProps {}
const props = defineProps<ProfileProps>()
const { } = toRefs(props)
const { dataList,userId , currentPage, pageSize ,isload,isloading,isEnd,isPersonProfile} = useState({
  dataList:[] as FormattedPost[],
  userId:0,
  currentPage:1,
  pageSize:5,
  isload:false,
  isloading:false,
  isEnd:false,
  isPersonProfile:false
})
const router = useRouter()
const route = useRoute()
const userInfo = ref<UserInfo>()
const userImage = ref(faker.image.people(640,400,true))

const appendDataFn = ref<(post:FormattedPost)=>void>()
const deleteDataFn = ref<(index:number)=>void>()
const noMoreDataFn=  ref<()=>void>()

const getVirtualListMethod : VirtualListMethod = 
( appendData, deleteData, noMoreData) =>{
    appendDataFn.value = appendData
    deleteDataFn.value = deleteData
    noMoreDataFn.value = noMoreData
}
const bimg = ref();
const ProfileHeader = ()=>{
  if(!userInfo.value){
    return;
  }
  return (
    <PH
    self 
    id={userInfo.value.id}
    name={userInfo.value.name} 
    avatar={userInfo.value.avatar}  
    backgroundImg={userInfo.value.background!}
    />
  )
}

const loadData = async ()=>{
    let temp = [] as FormattedPost[]
    let userId = isPersonProfile.value?LocalStorageManager.getLocalStorageInfo('userInfo')?.id:userInfo.value?.id
    const { data } = await getUserPosts(
        userId,
        0,
        currentPage.value,
        pageSize.value
    )
    let posts = data.data as unknown as FormattedPost[];
    for (let i = 0; i < posts.length; i++) {
        const el  = posts[i];
        let userInfo:UserInfo = {
            id: el.user_id,
            name: el.name,
            email: el.email,
            avatar: el.avatar
        }
        posts[i].userInfo = userInfo;
    }
    for (let i = 0; i < posts.length; i++) {
        temp.push(posts[i]) 
    }
    return temp;
}
const BottomEl  = ()=>{
  if(!isload.value) return;
    return (
        <>
        {

            <EmptyVue isLoad  desc='NO POST ANYMORE' imageSize={300} />
        }
        </>
    )
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
    currentPage.value++;
    dataList.value.push(...data)    
    isloading.value = false;
}


watch(route,(old,newVale)=>{
  let temp = []
  userId.value  = 0
  if(route.name==='personProfile'){
    console.log('!!');
    
    //load()
  }
},{deep:true})

const load = async ()=>{
  // @ts-ignore
  let info = JSON.parse(route.query.info);
  userInfo.value = info.userInfo;
  bimg.value = userInfo.value?.background;
  dataList.value =  await loadData()
  isload.value = true 
}

onMounted(async ()=>{
  //load()
  if(route.name==='profile'){
    isPersonProfile.value = true;
    const {data} = await getUserById(LocalStorageManager.getLocalStorageInfo('userInfo')?.id);
    const info = data.data
    bimg.value = info.background;
    userInfo.value = info;
    dataList.value =  await loadData()
    isload.value = true
   
  }else{
    load()
  }
})



</script>
<template>
  <div class="profile-container" :style="{width:'100%',height:'100%',display:'flex',flexDirection:'column',position:'relative'}">
      <VirtualList
          :Header="ProfileHeader"
          :data="dataList.length===0?[]:dataList" 
          :Item="Post" 
          :estimate-size="100" 
          :buffer-size="10"
          :onReach="onload"
          :is-show-data="isload"
          :debounce-delay-time="16.7"
          :is-keep-alive="true"
          :is-show-loading="!isload"
          :virtual-list-method="getVirtualListMethod"
          :item-props="{
              isShowInteract:true
          }"
          :Bottom="BottomEl"
      />
    </div>
  <RightBar/>
</template>

<style lang="less" scoped>
.profile-container{
  border: 2px solid #F4F4F4;
  
}

@media screen and (max-width:820px) {
  .background-image-container{
    height: 20%;
  }
  .profile-container{
    width: 100%;
  }
}

@media screen and (min-width:821px) {
  .background-image-container{
    height: 30%;
  }
  .profile-container{
    width: 70%;
    max-width: 600px;
  }
}

</style>