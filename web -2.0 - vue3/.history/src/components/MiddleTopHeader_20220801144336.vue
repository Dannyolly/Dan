<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { VueEl } from '@/types/Element';
import RightBar from '@/pages/Home/RightBar.vue';
import IconButton from './IconButton.vue';
import { 
    Back
    
} from '@element-plus/icons-vue'
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
     * 左側返回
     */
    backBtn?:boolean
}
const props = defineProps<MiddleTopHeaderProps>()
const { name , RightContent } = toRefs(props)
const {} = useState({})
</script>
<template>
  <div className='middle-top-container'>
        <div style="transform: translateY(-3px);" v-if="backBtn">
            <el-button 
                circle
                size='large'
                style="
                border:0;
                transform: translateY(-3px);
                font-size: 20px;
                margin-right: 5px;
                "
                :icon="Back"
            />
        </div>
        <div className='middle-top-title' style="display:flex">
            {{name}}
        </div>
        <div v-if="RightContent!==undefined" class="right-content-container">
            <RightContent/>
        </div>
    </div>
</template>

<style lang="less" scoped>
.middle-top-container{
    width: calc(100% - 20px) ;
    padding: 10px;
    display: flex;
    .middle-top-title{
        width: min-content;
        font-size: 20px;
        font-weight: bold;
    }
    .right-content-container{
        display: flex;
        flex: 1;
        justify-content: end;
    }
}
@media screen and (max-width:599px) {
    .middle-top-container{
        padding-top: 10px;
        padding-bottom: 0px;
    }
}
@media screen and (min-width:600px) {
    .middle-top-container{
        padding-top: 20px;
        padding-bottom: 0px;
    }
}
</style>