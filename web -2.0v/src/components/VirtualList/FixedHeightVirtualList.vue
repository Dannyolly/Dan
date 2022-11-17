<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, onUnmounted, watch, onUpdated, nextTick, pushScopeId, DefineComponent, onActivated, onDeactivated} from 'vue';
import {useState} from '@/hooks/useState';
import {  useDebounce, useDebounceFn, useResizeObserver, useThrottleFn } from '@vueuse/core';
import { he } from 'element-plus/es/locale/index.js';
import {  FixedHeightCachedPosition } from '@/types/virtualList'
import VirtualItem from './VirtualItem.vue';
import { log } from 'console';
import { cloneDeep } from 'lodash';
import { maxHeaderSize } from 'http';
import { faker } from '@faker-js/faker'
import { computed } from '@vue/reactivity';
import Publish from '../Publish.vue';
import { VueEl } from '@/types/Element';
import { Random } from '@/utils/Num';
import { FixedHeightVirtualListState } from '../../types/Fixed';
import { FixedHeightVirtualListProps as prop } from '@/types/virtualList'
import { uuid } from '@/utils/uuid';
interface FixedHeightVirtualListProps {
    /**
     * @data
     */
     data:Array<unknown>,
 
     /**
      * @description callback that load more data
      */
     onReach?:(noMoreData:()=>void)=>void,
     
     /**
      *  @description ListHeader?
      */
     Header?:VueEl,
 
     /**
      * @description if you set this as false ,the diplay of scrollbar will set as none.
      */
     hasScrollBar?:boolean 
    /**
     * @description
     */
    Item:VueEl
    /**
      * @description if you set this props ,this component will transform to fixed-height virtual-list.
      */
    fixedHeight:number,
    /**
     * @description pre-render elements you want
     * @tips you can add this if you see white screen when you're scrolling ...
     * @default 10
     */
    bufferSize?:number,
    /**
     * @description 
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
    virtualListMethod:(appendData:(item:typeof data.value[0])=>void,deleteData:(index:number)=>void )=>void,
    /**
     * @descirption pass this to your item
     */
    itemProps?:any
    /**
     * @description use animated when appendData or deleteData
     * @default false
     */
    animated?:boolean
}


const props = defineProps<FixedHeightVirtualListProps>()
const { data, onReach , Header , Item , fixedHeight , bufferSize , loadingOffset ,isKeepAlive, virtualListMethod,itemProps,animated} = toRefs(props)
const { 
    visibleList, 
    startIndex,
    endIndex , 
    visibleHeight,
    isBottom,
    currentMaxHeight,
    scrollTop,
    visibleCount,
    cachedPosition,
    isEnd,
    isActive
} = useState<FixedHeightVirtualListState>({
    cachedPosition:[] as FixedHeightCachedPosition[],
    visibleHeight:0,
    visibleList:[] as FixedHeightCachedPosition[],
    startIndex:0,
    endIndex:0,
    isBottom:false,
    currentMaxHeight:0,
    isEnd:false,
    scrollTop:0,
    visibleCount:0,
    isActive:false
})
const { headerContainer , headerHeight ,headerStop } = useState({
    headerContainer:null,
    headerHeight:0,
    headerStop:null as unknown as ()=>void
})

const bufferRealSize = ref( )

watchEffect(()=>{
    if(data.value.length!==0){
        currentMaxHeight.value = data.value.length * fixedHeight.value + headerHeight.value
    }else{
        currentMaxHeight.value = 0;
    }
})

const bottomOffset = computed(()=>cachedPosition.value[cachedPosition.value.length-1].index * fixedHeight.value )
const isSetUp = ref(false)
const items = ref()
const outerContainer = ref();
const stopF =  ref()
const loadOffset = ref(0)
const isAppendOrDelete = ref(false)
const noMoreData = function(){
    isEnd.value = true;
}

 
/**
 * 到達底部了。。。
 */
const handleOnReach = () =>{
    // loadMoreData
    if(onReach?.value){
        onReach.value(noMoreData);
    }
}

const updateVisibleList = (scrollTopTemp:number)=>{
    scrollTop.value = scrollTopTemp
    const currentStartIndex = getStartIndex(scrollTopTemp)
    const currentEndIndex = getEndIndex(currentStartIndex)
    const { left , right } = getRange( currentStartIndex, currentEndIndex )
    //console.log(currentEndIndex, scrollTop.value , bottomOffset.value );
    
    if(!isBottom.value && scrollTop.value >= bottomOffset.value - 600 ){
         //lock that 
        isBottom.value = true
        handleOnReach();
    }
    visibleList.value = cachedPosition.value.slice(left,right) 
  
}

const fn  = useDebounceFn((event:UIEvent)=>{
    //@ts-ignore
    let scrollTopTemp=  event.target.scrollTop
    updateVisibleList(scrollTopTemp)
},16.7)


const onScroll = (event:UIEvent)=>{
    fn(event)
}



const getStartIndex = function(scrollTop:number) { 
    return Math.floor(scrollTop / fixedHeight.value)
};

const getEndIndex = function(startIndex:number){
    return startIndex + visibleCount.value
}

/**
 * @description 設置初始position 和測量當前可視window
 */
const setUpFirstInfo = ()=>{
    if(data.value.length===0){
        return;
    }
    let length = data.value.length
    for (let i = 0; i < length; i++) {
        cachedPosition.value.push({
            index:i,
            uuid:uuid()
        });
        
    }
    containerResizeObserve();
    headerContainerResizeObserve()
    isSetUp.value = true
}
const headerContainerResizeObserve = ()=>{
    const {stop} = useResizeObserver(headerContainer,(entries) => {
        const entry = entries[0]
        const { width, height } = entry.contentRect
        if(headerHeight.value === height && headerHeight.value!=0){
            return
        }             
        headerHeight.value = height
    })
    headerStop.value = stop
}
/**
 * @description 當容器變化時的回調...
 */

const containerResizeObserve = ()=>{
    
    const { stop } = useResizeObserver(outerContainer, (entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      if(height === visibleHeight.value){
        return ;
      }
      visibleHeight.value = height
      visibleCount.value  = Math.floor(visibleHeight.value / fixedHeight.value)
      // 初始化 .... 
      if(endIndex.value===0){
        endIndex.value = visibleCount.value + bufferRealSize.value;
        visibleList.value = cachedPosition.value.slice(0,endIndex.value)  
      }
    })
    stopF.value = stop
}
/**
 * @return {string} uuid 
 */
const appendData = (item)=>{
   isAppendOrDelete.value = true;
   data.value.unshift(item)
   cachedPosition.value.unshift({
    index:0,
    uuid:uuid()
   })
   for (let i = 1; i < cachedPosition.value.length; i++) {
     cachedPosition.value[i].index++;
   }
   updateVisibleList(scrollTop.value)
   return cachedPosition.value[0].uuid;
}

const deleteData = (index:number)=>{
    isAppendOrDelete.value = true;
    data.value.splice(index,1)
    cachedPosition.value.splice(index,1)
    for (let i = index; i < cachedPosition.value.length; i++) {
        cachedPosition.value[i].index--;
    }
    updateVisibleList(scrollTop.value)
    
}

watch(data,(value,oldValue)=>{
    if(isAppendOrDelete.value){
        isAppendOrDelete.value = false; 
    }
    if(isBottom.value){
        let oldLength = cachedPosition.value.length
        let newLength = value.length
        for (let i = oldLength; i < newLength; i++) {
            cachedPosition.value.push({
                index:i,
                uuid:uuid()
            });
        }
        startIndex.value = getStartIndex(scrollTop.value)
        endIndex.value = getEndIndex(startIndex.value);
        const { left , right }  = getRange(startIndex.value,endIndex.value);
        visibleList.value = cachedPosition.value.slice(left,right);    
        setTimeout(()=>{
            isBottom.value = false
        },200)
    }else {
        if(data.value.length === 0){
            cachedPosition.value = [];
            visibleList.value = [];
            visibleHeight.value = 0;
            visibleCount.value = 0;
            endIndex.value = 0;
        }else{
            setUpFirstInfo();
           // console.log('?',data.value);
            
        } 
    }
},{deep:true})

const getRange = function(startIndex:number , endIndex:number):{left:number,right:number}{
    return {
        left: startIndex - bufferRealSize.value<0?
                0:startIndex - bufferRealSize.value
            ,
        right:  endIndex + bufferRealSize.value<=data.value.length?
                endIndex + bufferRealSize.value:data.value.length
    }
}

onMounted(()=>{
    virtualListMethod.value(appendData,deleteData)
    if(bufferSize?.value){
        bufferRealSize.value = Math.floor(bufferSize.value/2);
    }else{
        bufferRealSize.value = 5
    }
    
    if(loadingOffset?.value){
        loadOffset.value  = loadingOffset.value
    }
    //setUpFirstInfo()
})


onUnmounted(()=>{
    if(stopF.value){
        stopF.value();
    }
})


onActivated(()=>{
    if(isKeepAlive?.value){
        outerContainer.value.scrollTo(0,scrollTop.value)
    }  
    setTimeout(()=>{
            isActive.value = true
    },100)
})

onDeactivated(()=>{
    isActive.value = false
})


</script>
<template>
  <div @scroll="onScroll" ref="outerContainer" style="z-index: 1;width: 100%;height: 100%;overflow: scroll;position: relative;">
    <div :style="{ height: `${currentMaxHeight +50}px` }" 
    class="virtual-list-container no-scroll-bar" >
        <div  :style="{ zIndex: cachedPosition.length+1 }" ref="headerContainer" v-if="Header!==undefined">
            <Header/>
        </div>
        <div  v-if="data.length!==0">
            <div
                class="virtual-list-content-item"
                style="position: absolute;width: calc(100%);"
                ref="items"
                :key="item.index"
                v-for="( item,index) in visibleList"
                :class="{ ready:true, isActive:isActive && animated }"
                :style="{ transform:`translate3d(0,${ item.index * fixedHeight}px,0)`,
                        zIndex:(item.index)
                }"
                
            >
                <Item 
                    :info="data[item.index]" 
                    :deleteData="()=>deleteData(item.index)" 
                    :appendData="appendData"
                    :uuid="item.uuid"
                    :itemProps="itemProps"
                />
            </div>
        </div>
        <div v-if="isBottom" v-loading="isBottom && !isEnd" style="width: 100%;position:absolute;;height: 40px;transform: translateX(-fixedHeight.value%);left: fixedHeight.value%;" 
            :style="{
                top: data.length * fixedHeight + fixedHeight + 50 
                + loadOffset + 'px'}"
        >

        </div>
    </div>  
    <div 
    v-loading="data.length===0" 
    v-if="data.length===0"
    style="width: 100%;z-index: 0;transform: translateY(50%);position: absolute;top: 50%;" 
    class="loading" >

    </div>
  </div>
</template>

<style lang="less" scoped>
.virtual-list-container{
    width: 100%;
    position: relative;
}
// 只作用于body标签

::-webkit-scrollbar {
  width: 8px;
  background-color: #f2f2f2;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(222,223,225);
  
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  background-color: #CDCDCD;
}

::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}


.virtual-list-content-item{
    width: 400px;
    height: auto;
    position: absolute;
    opacity: 0;
}

.isActive{
    transition: all 0.3s ease-out 0s;
}
.ready{
    opacity: 1;
}

</style>