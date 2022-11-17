<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
interface EmptyProps {
    desc?:string,
    image?:string,
    imageSize?:number,
    isLoad?:boolean
}
const { desc , image , imageSize = 200, isLoad = true } = defineProps<EmptyProps>()
const {} = useState({})
</script>
<template>
  <el-empty v-if="isLoad" :image-size="imageSize" :description="desc"  />
</template>

<style scoped>

</style>