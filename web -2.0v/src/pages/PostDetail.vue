<script setup lang='tsx'>
import {defineProps, toRefs, ref, watchEffect, onMounted ,watch} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/Header/MiddleTopHeader.vue';
import { FormattedPost } from '@/types/post';
import { useRoute, useRouter } from 'vue-router';
import { loadData } from '@/utils/FakePost';
import Post from '@/components/Post.vue';
import RightBar from './Home/RightBar.vue';
import VirtualList from '@/components/VirtualList/VirtualList.vue';
import { VirtualListMethod } from '@/types/virtualList';
import { faker } from '@faker-js/faker';
import { Random } from '@/utils/Num'
import { 
    ChatRound,
    Upload,
    Link,
    Pointer,
    CollectionTag,
} from '@element-plus/icons-vue';
import {
    useUserStore
}from '@/store/user'
import Publish from '@/components/Publish.vue';
import { ElNotification, useId } from 'element-plus';
import { cancelLike, uploadPost , likeAction as like } from '@/service/post';
import { LocalStorageManager } from '@/utils/localStorage';
import { comment, getPostComments } from '@/service/comment';
import { getUserById } from '@/service/user';
import { UserInfo } from '@/types/user';
import Empty from '@/components/Empty.vue';
import { isEnumDeclaration } from '@babel/types';
import { sendNotification } from '@/service/ws';
import { InformType } from '@/types/Notification';
import Comment from '@/components/Comment.vue'
import {PostNotification } from '@/types/Notification'
import { log } from 'console';
interface PostDetailProps {}
const props = defineProps<PostDetailProps>()
const { } = toRefs(props)
const userInfo = useUserStore().userInfo
const { post, dataList, username, isLoad, currentPage ,isEnd } = useState({
    post:{} as FormattedPost & PostNotification,
    dataList: [] as FormattedPost[] | null,
    username:'',
    isLoad:false,
    currentPage:1,
    isEnd:false
})
const interactContainer =[
    {
        index:0,
        Tag:ChatRound,
    },
    {
        index:1,
        Tag:Link,
    },
    {
        index:2,
        Tag:CollectionTag,
    },
    {
        index:3,
        Tag:Pointer,
    }
]

const route = useRoute()
const load = async ()=>{
  // @ts-ignore
  post.value = JSON.parse(route.query.info);
  // @ts-ignore
  username.value = route.query.username
  const { data }  = await getPostComments(post.value.post_id || post.value.id,5,currentPage.value++)
  const comments = data.data;
  return comments;
  
}
watch(route,(old,newVale)=>{
  dataList.value = []
  post.value  =undefined
  if(route.name==='postDetail'){
    load()
  }
},{deep:true})
const append = ref<(item:any)=>void>()
const noMoreData =ref<()=>void>()
const getMethod:VirtualListMethod = (appendData,deleteData,noMore)=>{
    append.value = appendData
    noMoreData.value = noMore

}

const isLike = ref()

const PostDetailHeader =()=>{
 
    if(post.value){
        return (
            <div style={{position:'relative'}}>
                <MiddleTopHeader  
                    name={username.value} 
                    back-btn 
                />
                <Post 
                itemProps={{isShowInteract:false}} 
                info={post.value as unknown as FormattedPost} 
                />
                <div class="interact-num-container">
                    <div class="interact-num">
                        <div class="tag-num">{post.value.comments}</div>
                        <div class="tag-name">Comment</div>
                    </div>
                    <div class="interact-num">
                        <div class="tag-num">{post.value.like + (isLike?1:0)}</div>
                        <div class="tag-name">Like</div>
                    </div>
                    <div class="interact-num">
                        <div class="tag-num">{0}</div>
                        <div class="tag-name">Collect</div>
                    </div>
                </div>
                <div class="interact-pic-container" style={{padding:'10px',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                    {
                        interactContainer.map((v,i)=>{
                            return (
                                <div onClick={e=>i===3 && likeAction(e)} class="interact" >
                                    <el-icon >
                                        {
                                            <v.Tag  style={{color: i===3 && isLike.value?'#79bbff':'inherit' }}  />
                                        }
                                    </el-icon>
                                </div>
                            )
                        })
                    }
                </div>
                <Publish onUploadNewPost={async (pos,des,files)=>{
                
                    const { data } = await comment(
                        LocalStorageManager.getLocalStorageInfo('userInfo')?.id,
                        post.value?.id,
                        des
                    )
                    let userId = LocalStorageManager.getLocalStorageInfo('userInfo')?.id;
                    let toId = post.value?.user_id;
                    if(userId!==toId){
                       sendNotification(userId,toId,InformType.COMMENT,post.value?.id,des); 
                    }
                    pos.images = ''
                    pos.user_id = userInfo.id
                    pos.name = userInfo.name
                    pos.avatar = userInfo.avatar
                    pos.created_at = new Date().toDateString();
                    if(append.value){
                        append.value(pos)
                    }
                    ElNotification({
                        title: 'Success',
                        message: 'Success to publish new Comment',
                        type: 'success',
                        duration:1000
                    })
                }}/>
                
            </div>
        ) 
    }
    
}

const onload = async (noMoreData:()=>void)=>{
    let data = await load()
    if(data.length!==0){
         dataList.value?.push(...data)
    }else{
        noMoreData();
        isEnd.value = true;
    }
   
}

const checkIsLike = ()=>{
    if(localStorage.getItem(`like:${post.value?.id}`)!=null){
        isLike.value = true;
        console.log('liked');
        
    }
}

const likeAction = async (e:MouseEvent)=>{
    e.cancelBubble = true;
    if(!isLike.value){
        localStorage.setItem(`like:${post.value.id}`,"");
        const { data }  = await like(post.value.id)
        isLike.value = true;
        ElNotification({
        title: 'Success',
        message: 'Success to like',
        type: 'success',
        duration:1000
    })
    }else{
        cancelLikeAction()
    }
}

const cancelLikeAction  =async ( ) => {
    const { data } = await cancelLike(post.value.id)
    localStorage.removeItem(`like:${post.value.id}`)
    isLike.value = false
    ElNotification({
        title: 'Success',
        message: 'Success to dislike',
        type: 'success',
        duration:1000
    })
}

const BottomEl = ()=>{
    if(!isLoad.value){
        return;
    }
    return (
        <>
            {
                <Empty isLoad desc='NO MORE COMMENTS'  />
            }    
        </>
        
    )
}


onMounted(async()=>{

    let data = await load()
    if(data.length!==0){
         dataList.value?.push(...data)
    }else{
        noMoreData.value();
    }
    checkIsLike();
    isLoad.value = true;
})

</script>
<template>
  <div class="post-detail-container">
    <div class="left">
        
        <VirtualList 
            :Header="PostDetailHeader"
            :data="dataList"
            :buffer-size="20"
            :Item="Comment"
            :virtual-list-method="getMethod"
            :estimate-size="40"
            is-show-data
            :item-props="{
                isComment:true,
                isShowInteract:true
            }"
            :onReach="onload"
            is-keep-alive
            :is-show-loading="!isLoad"
            :Bottom="BottomEl"
            
        />
    </div>
  </div>
  <RightBar/>
</template>

<style scoped lang="less">
:deep(.interact-pic-container){
    border: 1px solid #F4F4F4;
    width: calc(100% - 20px +2px);
    border-right-width: 0px;
    border-top-width: 0px;
}
:deep(.interact-num-container){
    display: flex;
    align-items: center;
    padding: 16px;
    border: 0px solid #F4F4F4;
    border-bottom-width: 1px;
}
:deep(.interact-num){
    font-style: @font-style;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @text-color;
    margin-right: 20px;
    .tag-num{
        font-size: 14px;
        font-weight: bolder;
        color: @fontColor1;
        margin-right: 5px;
    }
    .tag-name{
        font-weight: 500;
    }
}
:deep(.interact){
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @text-color;
}
:deep(.interact:hover){
    color: rgb(64,158,255);
}
.post-detail-container{
    position: relative;
    width: 100%;
    height: calc(100% - 2px);
    display: flex;
    border: 1px solid #F4F4F4;
    max-width: 650px;
    .left{
        display: flex;
        width: fit-content;
        flex: 1;
    }

}
</style>