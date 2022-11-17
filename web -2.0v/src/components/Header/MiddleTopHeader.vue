<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { VueEl } from '@/types/Element';
import RightBar from '@/pages/Home/RightBar.vue';
import IconButton from '../IconButton.vue';
import { 
    Back
    
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useResizeObserver } from '@vueuse/core';
import { faker } from '@faker-js/faker';
import { useUserStore } from '@/store/user';
import { normalUrl } from '@/api/config';
import { storeToRefs } from 'pinia';
interface MiddleTopHeaderProps {
    /**
     * @description 標題
     */
    name:string,

    /**
     * 右側設置...
     */
    RightContent?:VueEl,
    /**
     * 底下內容
     */
    BottomContent?:VueEl
    /**
     * 
     */
    LeftContent?:VueEl
    /**
     * 左側返回
     */
    backBtn?:boolean,

    showUserIcon?:boolean
}
const props = defineProps<MiddleTopHeaderProps>()
const { name , RightContent  ,BottomContent, LeftContent ,showUserIcon } = toRefs(props)
const { container, outerContainer,currentWidth ,currentHeight} = useState({
    container:null,
    outerContainer:null,
    currentWidth:0,
    currentHeight:0,
})
const { userInfo , isOpenDrawer} = storeToRefs(useUserStore())
const router = useRouter()
const handleClose = (done: () => void)=>{

}

onMounted(()=>{
    useResizeObserver(container, (entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      currentWidth.value = width;
    })
    
    useResizeObserver(outerContainer, (entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      currentHeight.value =height
    })
})

</script>
<template>
    <div ref="outerContainer" :style="{width:currentWidth+'px'}" class='outer-middle-top-container'>
        <div   class='middle-top-container'>
            <div style="transform: translateY(-3px);" v-if="backBtn">
                <el-button 
                    @click="router.back()"
                    circle
                    size='large'
                    style="
                    border:0;
                    transform: translateY(-3px);
                    background-color: transparent;
                    font-size: 20px;
                    margin-right: 5px;
                    "
                    :icon="Back"
                />
            </div>
            <div v-if="LeftContent!==undefined">
                <LeftContent/>
            </div>
            <div v-if="!showUserIcon" @click="isOpenDrawer = true" class="mobile"  >
               <img class="avatar" :src="normalUrl + userInfo?.avatar" /> 
            </div>
            
            <div class='middle-top-title' 
            style="line-height: 40px;display:flex;font-size: 20px;font-weight: bold;text-align: center;padding-top: 2px;">
                {{name}}
            </div>
            <div v-if="RightContent!==undefined" class="right-content-container">
                <RightContent/>
            </div>
        </div>
        <div   v-if="BottomContent!==undefined" class='middle-bottom-container'>
            <BottomContent/>
        </div>
    </div>
    <div class="content" ref="container" :style="{paddingTop:currentHeight+'px'}"></div>
</template>

<style lang="less" scoped>

.outer-middle-top-container{
    position: fixed;
    top:0;
    z-index: 700 ;
    
    .middle-top-container{
        width: 100% ;
        padding: 10px;
        padding-left: 15px;
        display: flex;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
        .middle-top-title{
            font-size: 20px;
            font-weight: bold;
        }
        .right-content-container{
            display: flex;
            flex: 1;
            justify-content: end;
        }
    }
    .middle-bottom-container{
        width: 100% ;
        padding: 10px;
        display: flex;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
    }
}

@media screen and (max-width:599px) {
    .mobile{
        display: flex;
        cursor: pointer;
        margin-right: 10px;
        padding-left: 5px;
        .avatar{
            width: 40px;
            height: 40px;
            border-radius: 20px;
            object-fit: cover;
        }
    }
    .middle-top-container{
        padding-top: 10px;
        padding-bottom: 0px;
    }
    .middle-bottom-container{
        width: calc(100% - 20px) ;
        padding: 10px;
        display: flex;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
    }
}
@media screen and (min-width:600px) {
    .mobile{
        display: none;
    }
    .middle-top-container{
        padding-top: 20px;
        padding-bottom: 0px;
        
    }
    .middle-bottom-container{
        width: calc(100% - 20px) ;
        padding: 10px;
        display: flex;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(4px);
    }
}
</style>