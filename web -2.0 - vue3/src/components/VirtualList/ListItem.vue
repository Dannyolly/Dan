<script lang='ts' setup>
import {defineProps, toRefs, ref, watchEffect, onMounted, defineComponent, onUnmounted} from 'vue';
import {useState} from '@/hooks/useState';
import { VueEl } from '@/types/Element';
import { useMutationObserver, useResizeObserver } from '@vueuse/core';
import { he } from 'element-plus/es/locale';
interface ListItemProps {
    /**
     * @description the function is used to update the position when the rect is changed .
     */
    updatePosition:(index:number,newHeight:number)=>void,
    /**
     * the index of the CachedPostion
     */
    index:number,
    /**
     * Item
     */
    Item:VueEl,
    /**
     * @description the element of dataList...
     */
    info:any,
    /**
     * deleData
     */
    deleteData:(index:number)=>void,

    /**
     * unique key
     */
    uuid:string,
    /**
     * the extra Props
     */
    itemProps:any
}
const props = defineProps<ListItemProps>();
const { updatePosition,index, Item, info, deleteData } = toRefs(props)
const { container } = useState({
    container:null
})
let stopFn:()=>void
onMounted(()=>{
    
    // const {stop} = useMutationObserver(container,(e)=>{
    //     const el = container.value
       
    //     const height = el.clientHeight
    //     console.log(e,el,'itemHeight',height,'index-',index.value);
    //     //updatePosition.value(index.value,height+20)
    // },{
    //     childList: true, 
    //     attributes: true, 
    //     subtree: true 
    // })
    const  { stop } =  useResizeObserver(container, (entries) => {
        const entry = entries[0]
        const { width, height } = entry.contentRect 
        //console.log(index.value , height ,'updated!');
        
        updatePosition.value(index.value,height)
    })
    stopFn = stop
})


onUnmounted(()=>{
    stopFn();
    
})

</script>
<template>
<div ref="container">
    <Item 
        :info="info" 
        :deleteData="()=>deleteData(index)" 
        :uuid="uuid"
        :itemProps="itemProps"
        :index="index"
    />
</div>
</template>


<style scoped>
</style>