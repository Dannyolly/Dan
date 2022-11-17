<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, DefineComponent} from 'vue';
import {useState} from '@/hooks/useState';
import { DynamicHeightVirtualListProps, FixedHeightVirtualListProps, VirtualListMethod } from '@/types/virtualList';
import { VueEl } from '@/types/Element';
import DynamicHeightVirtualList from './DynamicHeightVirtualList.vue';
import FixedHeightVirtualList from './FixedHeightVirtualList.vue';
import { Obj } from '@popperjs/core';
import { FormattedPost } from '@/types/post';
interface VirtualListProps {
    /**
     * @data
     */
     data:Array<unknown>,
 
     /**
      * @description callback that load more data
      * @param {()=>void} noMoreData use it can stop to load more data  if we have no data to load
      */
    onReach:(noMoreData:()=>void)=>void,
     
     /**
      *  @description ListHeader?
      */
     Header?:VueEl | JSX.Element,
 
     /**
      * @description if you set this as false ,the diplay of scrollbar will set as none.
      */
     hasScrollBar?:boolean 
    /**
     * @description
     */
    Item: VueEl | JSX.Element
    /**
      * @description estimateSize 
      * @default 100
      */
    estimateSize?:number,
    /**
     * @description
     * 
     */
    fixedHeight?:number,
    /**
     * @description pre-render elements you want
     * @tips you can add this if you see white screen when you're scrolling ...
     * @default 10
     */
    bufferSize?:number,
    /**
     * @description if this is given as 5 , it will load new Data before rendered the last 5 element 
     * @default 5
     */
    loadingOffset?:number,
    /**
     * @description
     */
    isShowData?:boolean
    /**
     * @description if true , the scrollBar will scroll to where we left in last time
     * @default false
     */
    isKeepAlive?:boolean,
    /**
     * @descirption this method can get all method that can add or delete 
     */
    virtualListMethod:VirtualListMethod,
    /**
     * @descirption pass this to your item
     */
    itemProps?:any
    /**
     * @description the onscroll function is inside the debounceFunction so that var is delay time.
     * @default 30ms
     */
    debounceDelayTime?:number
    /**
     * @description use animated when appendData or deleteData
     * @default false
     */
    animated?:boolean

    isShowLoading?:boolean,

    Bottom?:VueEl | JSX.Element
}




const props = defineProps<VirtualListProps>()
const {  data ,  estimateSize , onReach , hasScrollBar , Header , Item, fixedHeight , bufferSize , loadingOffset ,debounceDelayTime , isShowLoading,Bottom} = toRefs(props)
const { isDynamic  } = useState({
  isDynamic: estimateSize?.value !==undefined
})

onMounted(()=>{
  
  
})



</script>

<template>
    <DynamicHeightVirtualList
      v-if="isDynamic "  
      :data="data"
      :estimate-size="estimateSize"
      :onReach="onReach"
      :has-scroll-bar="hasScrollBar"
      :Header="Header"
      :Item="Item"
      :bufferSize="bufferSize"
      :is-show-data="isShowData"
      :is-keep-alive="isKeepAlive"
      :virtual-list-method="virtualListMethod"
      :debounce-delay-time="debounceDelayTime"
      :animated="animated"
      :item-props="itemProps"
      :is-show-loading="isShowLoading"
      :Bottom="Bottom" 
    />
    <FixedHeightVirtualList
      v-if="!isDynamic "
      :data="data"
      :fixedHeight=" fixedHeight!==undefined ? fixedHeight:0 "
      :onReach="onReach"
      :has-scroll-bar="hasScrollBar"
      :Header="Header"
      :Item="Item"
      :bufferSize="bufferSize"
      :is-keep-alive="isKeepAlive"
      :virtual-list-method="virtualListMethod"
      :item-props="itemProps"
      :animated="animated"
    />
</template>

<style scoped>
</style>