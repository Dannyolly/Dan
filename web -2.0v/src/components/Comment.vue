<script setup lang='ts'>
import pubsub from 'pubsub-js'
import {defineProps, toRefs, ref, watchEffect, onMounted, unref} from 'vue';
import {useState} from '@/hooks/useState';
import { Comment, Post } from '@/types/post';
import { UserInfo } from '@/types/user';
import {baseUrl, normalUrl} from '@/api/config'
import { middleStyle } from '@/utils/Style'
import { MoreFilled ,
    ChatRound,
    Upload,
    Link,
    Pointer,
    
} from '@element-plus/icons-vue';
import { calculateDate } from '@/utils/Date'
import IconButton from './IconButton.vue';
import { useRouter } from 'vue-router';
import { likeAction as like , cancelLike,  } from '@/service/post'
import { ElNotification, useId } from 'element-plus';
import { sendNotification } from '@/service/ws';
import { LocalStorageManager } from '@/utils/localStorage';
import { InformType } from '@/types/Notification';
interface PostProps {
    info : Comment
    deleteData?:()=>void,
    uuid?:string,
    itemProps?:any
    /**
     * @default true
     */
    isShowInteract?:boolean,
    /**
     * @default false
     */
    isComment?:boolean,

    index?:number
}
const props = defineProps<PostProps>()
const  { index , info , deleteData ,uuid , itemProps , isShowInteract ,isComment = false } = toRefs(props)
const {
     loading,  post, input, commentCount,
     isLike
} = useState({
    loading:true,
    post:info.value as Comment,
    input:'',
    commentCount:0,
    isLike:false
})
const router = useRouter()
const deletePost = (index:number)=>{
    if(deleteData?.value){
        deleteData.value()
    }
}

const goPersonFilePage = (e)=>{
    e.cancelBubble = true;
    let userId =  info.value.user_id 
    let selfId = LocalStorageManager.getLocalStorageInfo('userInfo')?.id;
    // if(userId === selfId){
    //     router.push({
    //         path:'profile',
    //     })
    //     return ;
    // }

    router.push({
        path:'personProfile',
        query:{
            username:info.value.name,
            info:JSON.stringify(unref(info))
        }
    })
}

const goPostDetailPage = (e:MouseEvent)=>{
    e.cancelBubble = true;
    
    if(isComment?.value || itemProps?.value && itemProps.value?.isComment){
        return ;
    }
    router.push({
        path:'postDetail',
        query:{
            username:info.value.name,
            info:JSON.stringify( info.value )
        }
    })
    //console.log('hello?',info.value)
}

const likeAction = async (e:MouseEvent)=>{
    return;
    e.cancelBubble = true;
    if(!isLike.value){
        localStorage.setItem(`like:${post.value.post_id}`,"");
        let userId = LocalStorageManager.getLocalStorageInfo('userInfo')?.id;
        let toId = post.value.user_id;
        const { data }  = await like(post.value.post_id)
        if(userId !== toId){
            sendNotification(userId,toId,InformType.LIKE,post.value.post_id,'');
        }
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
    return;
    const { data } = await cancelLike(post.value.post_id)
    localStorage.removeItem(`like:${post.value.post_id}`)
    isLike.value = false
    ElNotification({
        title: 'Success',
        message: 'Success to dislike',
        type: 'success',
        duration:1000
    })
}


const checkIsLike = ()=>{
    return;
    if(localStorage.getItem(`like:${post.value.id}`)!=null){
        isLike.value = true;
    }
}
const dropdown1 = ref();

onMounted(()=>{
  /* console.log(info,'???');
   */
  checkIsLike();
})



</script>
<template>
  <div v-if="info" @click="goPostDetailPage"  class='post-container' :style="{paddingBottom:( itemProps?.isShowInteract===true || isShowInteract === true )?'20px':'20px'}">
        <div class='post-header '>
            <img  @click="goPersonFilePage"  :src="normalUrl + info.avatar " />
            <div class='post-name'>
                <div :style="{...middleStyle,fontSize:'14px',justifyContent:'flex-start',marginBottom:3}">{{info.name}}</div>
                <div :style="{...middleStyle,justifyContent:'flex-start',fontSize:'10px'}">{{calculateDate(new Date(info.created_at))}}</div>
            </div>
            
            <div class='more' @click.stop>
                <el-dropdown ref="dropdown1" trigger="click">
                <IconButton backgroundColor="#FFFFFF" :icon="MoreFilled" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>舉報</el-dropdown-item>
                        <el-dropdown-item @click="deletePost" >移除</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            </div>
        </div>
        <div :style="{height:'65%',paddingLeft:( itemProps?.isShowInteract===true || isShowInteract === true )?'60px':'10px',
                    /* paddingRight:itemProps?.isShowInteract===true?'20px':'0px' */}">
            <div class="post-introduction" :style="{
                fontSize:'15px',textAlign:'left',
                paddingTop:'0',
                paddingRight:'20px'
                }">
            
                <span :style="{paddingLeft:'0px'}">
                   {{ info.content}}
                </span>
                
            </div>
            <!-- <div  v-if="info.images!=='' " class="post-picture">
                <img :src="normalUrl + info.images"  />
            </div> -->

            <div :style="{marginBottom:0,flexDirection:'row',
            display:'flex',padding:10,paddingBottom:0,paddingLeft:20,paddingRight:20}" />
            
            <div class='post-bottom' 
            :style="{paddingLeft:20,paddingRight:20,marginBottom:0,
            width:'90%',
            display:'flex',alignItems:'center'}">
                
                <div v-if="isShowInteract || itemProps && itemProps.isShowInteract" class='interaction-container' 
                        :style="{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'18px'}">
                    <div @click="likeAction" class='post-like' 
                    :style="{...middleStyle,
                            alignItems:'left',
                            marginRight:0,
                            cursor:'pointer',
                            color:isLike?'#79bbff':'inherit'
                    }">
                        <el-icon>
                            <Pointer/>
                        </el-icon>
                        <span style="padding-left: 10px;font-size: 13px" > {{itemProps.isComment? 0:(info.like + (isLike?1:0))  }} </span>
                    </div>
                    <div  class='post-comment' :style="{...middleStyle,alignItems:'left',cursor:'pointer',marginRight:0}">
                        <el-icon>
                            <ChatRound/>
                        </el-icon>
                        <span style="padding-left: 10px;font-size: 13px" >  {{itemProps.isComment?0:info.comments}} </span>
                    </div>
                    <div class='post-share' :style="{...middleStyle,alignItems:'left',cursor:'pointer',marginRight:0}">
                        <el-icon>
                            <Link/>
                        </el-icon>
                        <span style="padding-left: 10px;font-size: 13px" > {{itemProps.isComment?0:43}}</span>
                    </div>
                    <el-icon>
                        <Upload />
                     </el-icon>
                </div>
            </div>
        </div>

        <!-- <div :style="{width:'100%',position:'absolute',bottom:0,paddingLeft:0,paddingRight:0,marginBottom:5}">
            <div :style="{height:1,width:'100%',backgroundColor:'#F4F4F4'}"></div>
        </div> -->
        
    </div>
</template>

<style scoped lang="less">


/* // PC
@media screen and (min-width:1300px) {
    
}

// PC
@media screen and (min-width:1100px) and (max-width:1299px) {
    
    
} */
// ipad
@media screen and (min-width:600px)  {
    :deep(.el-input__wrapper){
        border-radius: 20px;
        border: 0px;
    }
    .post-container:hover{
        background-color: @list-item-hover;
    }
    .post-container{
        border-bottom-width: 1px;

        /* transition: all 0.3s ease-out 0s ; */
        cursor: pointer;
        border: 1px solid #F4F4F4;
        width: 100%;
        height: auto;
        /* max-height: 560px; */
        padding-bottom: 20px;
        position: relative;
    .post-header{
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        height: 50px;
        display: flex;
        flex: 1;
        position: relative;
        align-items: center;
        
        img:hover{
            opacity: 0.6;
        }
        img{
            transition: opacity 0.2s ease-in 0s;
            position: absolute;
            left: 20px;
            width: 40px;
            height: 40px;
            border-radius: 24px;
        }
        .post-name{
            color: @title;
            font-family: @font-style;
            position: absolute;
            left: 70px;
            height: 34px;
            padding: 4px;
            padding-left: 10px;
            font-weight: 500;
        }
        .more{
            height: 30px;
            position: absolute;
            right: 20px;
            font-weight: bolder;
            font-size: 16px;
            cursor: pointer;
        }
    }
    .post-introduction{
        font-family:TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: @text-color;
        padding-left: 20px;
        /* font-weight: 500; */
    }
    .post-picture{
        width: 90%;
        height: 90%;
        padding: 10px;
        padding-top: 5px;
        padding-bottom:5px;
        padding-left: 20px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 16px;
            border-color: rgb(207, 217, 222);
            border-width: 1px;
            border-style: solid;
        }
    }

    .interaction-container{
        color: rgb(83, 100, 113);
        width: 80%;
        padding-left: 20px;
        padding-right: 5%;
        padding-top: 5px;
    }
}
}

// phone
@media screen and (min-width:0px) and (max-width:599px) {
    .post-container:hover{
        background-color: @list-item-hover;
    }
    .post-container{
        border:1px solid #f4f4f4;
        width: 100%;
        height: auto;
        /* transition: all 0.3s ease-out 0s ; */
        /* max-height: 560px; */
        padding-bottom: 20px;
        position: relative;
        .post-header{
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 5px;
            padding-top: 10px;
            height: 45px;
            display: flex;
            flex: 1;
            position: relative;
            align-items: center;
            
            img:hover{
                opacity: 0.6;
            }
            img{
                transition: opacity 0.2s ease-in 0s;
                position: absolute;
                left: 20px;
                width: 40px;
                height: 40px;
                border-radius: 24px;
            }
            .post-name{
                color: @title;
                font-family: @font-style;
                position: absolute;
                left: 70px;
                height: 34px;
                padding: 4px;
                padding-left: 0px;
                font-weight: 500;
            }
            .more{
                height: 30px;
                position: absolute;
                right: 20px;
                font-weight: bolder;
                font-size: 16px;
                cursor: pointer;
            }
    
        }
        .post-introduction{
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: rgb(15, 20, 25);
            padding-left: 10px;
            padding-right: 20px;
        }
        .post-picture{
            width: calc(100% - 40px);
            height: 80%;
            padding: 20px;
            padding-top: 5px;
            padding-bottom:10px;
            padding-left: 10px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 15px;
                border-color: rgb(207, 217, 222);
                border-width: 1px;
                border-style: solid;
            }
        }
        .post-bottom{
            img{
                display: none;
            }
            .interaction-container{
                flex: 1;
                padding-left: 20px;
                /* padding-right: 5%; */
                .post-like{
                    margin-right: 2px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span:nth-child(2){
                        font-size: 10px;
                    }
                }
                .post-comment{
                    margin-right: 2px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span:nth-child(2){
                        font-size: 10px;
                    }
                }
                .post-share{
                    margin-right: 2px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span:nth-child(2){
                        font-size: 10px;
                    }
                }
            }
            
        }
    }
}
</style>