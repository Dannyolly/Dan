<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import LeftBar from './LeftBar.vue';
import MidBar from './MidBar.vue';
import BottomBar from './BottomBar.vue';
interface MainContentProps {}
const props = defineProps<MainContentProps>()
const { } = toRefs(props)
const {} = useState({})
</script>
<template>
    <LeftBar/>
    <MidBar/>
    <BottomBar/>
</template>

<style scoped>
</style>