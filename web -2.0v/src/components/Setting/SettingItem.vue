<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { ArrowRightBold } from '@element-plus/icons-vue'
interface SettingItemProps {
    name:string
}
const props = defineProps<SettingItemProps>()
const { name } = toRefs(props)
const {} = useState({})
</script>
<template>
  <div class="setting-item-container">
    <div >{{name}}</div>
    <el-icon>
        <ArrowRightBold/>
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.setting-item-container:hover{
    background-color: @list-item-hover;
}
.setting-item-container{
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    color: @fontColor2;
    font-size: 14px;
    font-family: @font-style;
    font-weight: 500;
    font-stretch: normal;
    .left{

    }
    .right{

    }
}
</style>