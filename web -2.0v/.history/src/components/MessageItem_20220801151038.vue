<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style'
import { MoreFilled } from '@element-plus/icons-vue'
import IconButton from './IconButton.vue';
interface MessageItemProps {}
const props = defineProps<MessageItemProps>()
const { } = toRefs(props)
const {} = useState({})
</script>
<template>
  <div class="notification-content-container">
    <img src="../assets/icon.png" />
    <div class="detail">
        <div class="name"> Danny</div>
        <div class="content">Hello TOM?</div>
    </div>
    <div class="time">
        18:09
    </div>
    <div class="more" >
        <el-dropdown trigger="click">
            <IconButton backgroundColor="#FFFFFF" :icon="MoreFilled" />
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>置頂</el-dropdown-item>
                    <el-dropdown-item>移除</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.notification-content-container:hover{
    background-color: @list-item-hover;
    /* .more{
        display: block;
    } */
}
.notification-content-container{
    transition: all 0.2s;
    cursor: pointer;
    padding: 15px;
    height: 50px;
    display: flex;
    img{
        border-radius: 30px;
    }
    .detail{
        width: 75%;
        line-height: 23px;
        padding-left: 15px;
        .name{
            color: @title ;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .content{
            color: @text-color ;
            font-size: 13px;
            font-weight: 500;
            font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
    }
    .time{
        display: flex;
        padding-right: 10px;
        justify-content: right;
        font-weight: 500;
        font-size: 14px;
        line-height: 25px;
        color: @text-color ;
        font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .more{
        display: block;
        transform: translateY(-5px);
    }
}

</style>