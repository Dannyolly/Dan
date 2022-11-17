<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { MoreFilled } from '@element-plus/icons-vue'
import IconButton from '../IconButton.vue';
interface MarkProps {}
const props = defineProps<MarkProps>()
const { } = toRefs(props)
const {} = useState({})
</script>
<template>
  <div>
    <el-dropdown trigger="click">
    <IconButton :icon="MoreFilled" />
    <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item>移除全部</el-dropdown-item>
        </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
</style>