<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, DefineComponent, VueElement} from 'vue';
import {useState} from '@/hooks/useState';
import { VueEl } from '@/types/Element'
interface IconButtonProps {
    icon:VueEl,
    type?:"primary" |  "success",
    size?:'small' | 'large' ,
    backgroundColor?: string
}
const props = defineProps<IconButtonProps>()
const { icon ,type ,size ,backgroundColor } = toRefs(props)
</script>

<template>
  <el-button 
        v-if="type===undefined"
        :color='backgroundColor'
        circle
        :size="size"
        style="border:0;
        border-radius:20;width: 35px;height: 35px;
        font-size: 16px;
        margin-right: 5px;
        "
        :icon="icon"
    />
    <el-button 
        v-else
        :color='backgroundColor'
        :type="type"
        circle
        :size='size'
        style="border:0;
        border-radius:20;
        font-size: 16px;
        margin-right: 5px;
        "
        
        :icon="icon"
    />
</template>

<style scoped>
</style>