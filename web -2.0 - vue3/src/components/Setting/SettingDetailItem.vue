<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { User ,ArrowRightBold } from '@element-plus/icons-vue'
interface SettingDetailItemProps {
    title:string
    info:string
}
const props = defineProps<SettingDetailItemProps>()
const { info } = toRefs(props)
const {} = useState({})
</script>
<template>
  <div class="setting-detail-item">
            <div class="left">
                <el-icon style="font-size: 18px">
                    <User/>
                </el-icon>
            </div>
            <div class="mid">
                <div class="title">{{title}}</div>
                <div class="content">{{info}}</div>
            </div>
            <div class="right">
                <el-icon>
                    <ArrowRightBold/>
                </el-icon>
          </div>
    </div>
</template>

<style lang="less" scoped>
        .setting-detail-item{
            cursor: pointer;
            padding: 15px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            .left{
                margin-right: 20px;
            }
            .mid{
                .content{
                    font-size: 12px;
                    color: @text-color;
                }
                .title{
                    font-size: 14px;
                    color: @title;
                }
            }
        }
</style>