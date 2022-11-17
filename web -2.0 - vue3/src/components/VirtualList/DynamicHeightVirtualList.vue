<script setup lang='ts'>
import { defineProps, toRefs, ref, watchEffect, onMounted, onUnmounted, watch, onUpdated, nextTick, pushScopeId, DefineComponent, onActivated, onDeactivated, KeepAlive } from 'vue';
import { useState } from '@/hooks/useState';
import { useDebounce, useDebounceFn, useMutationObserver, useResizeObserver, useThrottleFn, useWebWorkerFn } from '@vueuse/core';
import { he } from 'element-plus/es/locale/index.js';
import { DynamicHeightCachedPosition } from '@/types/virtualList'
import VirtualItem from './VirtualItem.vue';
import { log } from 'console';
import { bottom } from '@popperjs/core';
import { cloneDeep } from 'lodash';
import { faker } from '@faker-js/faker'
import { computed, Ref, unref } from '@vue/reactivity';
import { VueEl } from '@/types/Element';
import { DynamicHeightVirtualListState } from '../../types/Dynamic';
import { DynamicHeightVirtualListProps as prop } from '@/types/virtualList'
import ListItem from './ListItem.vue';
import pubsub from 'pubsub-js'
import { uuid } from '@/utils/uuid';
import { ElNotification } from 'element-plus';
import { json } from 'stream/consumers';
import { TimeSlice } from '@/utils/TimeSlice';
interface DynamicHeightVirtualListProps {
    /**
     * @data
     */
    data: Array<unknown>,

    /**
     * @description callback that load more data
     */
    onReach?:(noMoreData:()=>void)=>void,

    /**
     *  @description ListHeader?
     */
    Header?: VueEl | JSX.Element,

    /**
     * @description if you set this as false ,the diplay of scrollbar will set as none.
     */
    hasScrollBar?: boolean
    /**
     * @description
     */
    Item: DefineComponent<{}, {}, any> | JSX.Element,
    /**
      * @description estimateSize 
      * @default 100
      */
    estimateSize?: number
    /**
     * @description pre-render elements you want
     * @tips you can add this if you see white screen when you're scrolling ...
     * @default 20
     */
    bufferSize?: number
    /**
     * @description 
     */
    loadingOffset?:number,

    /**
     * 
     */
    isShowData?:boolean
    /**
     * @description if true , the scrollBar will scroll to where we left in last time
     * @default false
     */
    isKeepAlive?:boolean
    /**
     * this method can get all method ( add or delete )
     */
    virtualListMethod:(
        appendData:(item:typeof data.value[0])=>void,
        deleteData:(index:number)=>void ,
        noMoreData:()=>void
    )=>void
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

    isShowLoading:boolean;

    Bottom?:VueEl | JSX.Element
}

const props = defineProps<DynamicHeightVirtualListProps>()
const { onReach, Header, estimateSize, data, Item, bufferSize ,loadingOffset,isShowData , isKeepAlive , virtualListMethod ,debounceDelayTime, animated,isShowLoading,Bottom } = toRefs(props)
const {
    visibleList,
    cachedPosition,
    defaultItemSize,
    startIndex,
    endIndex,
    visibleHeight,
    isBottom,
    currentMaxHeight,
    isEnd,
    scrollTop,
    isContainerWidthUpdating
} = useState<DynamicHeightVirtualListState>({
    visibleHeight: 0,
    isContainerWidthUpdating:false,
    visibleList: [] as DynamicHeightCachedPosition[],
    cachedPosition: [] as DynamicHeightCachedPosition[],
    defaultItemSize: estimateSize?.value !== undefined ? estimateSize.value : 100,
    startIndex: 0,
    endIndex: 0,
    isBottom: false,
    currentMaxHeight: 0,
    isEnd:false,
    scrollTop:0,
})

const outerContainer = ref();
const outerStop = ref()
const headerStop = ref()
const { headerHeight, headerRef, bufferRealSize, loadOffset,appending , isActive } = useState({
    headerHeight: 0,
    headerRef: null,
    bufferRealSize: 0,
    loadOffset:0,
    appending:false,
    isActive:false
})
watchEffect(() => {
    if (cachedPosition.value.length !== 0) {    
        currentMaxHeight.value = cachedPosition.value[cachedPosition.value.length - 1].bottom + headerHeight.value
    } else {
        currentMaxHeight.value = 0;
    }
})

const noMoreData = function(){
    isEnd.value = true;
    isBottom.value = false;
}

/**
 * 到達底部了。。。
 */
const handleOnReach = () => {
    if (onReach?.value) {
        onReach.value(noMoreData);
    }
}

const updateVisibleList = (scrollTopT:number)=>{
    scrollTop.value = scrollTopT

    const currentStartIndex = getStartIndex(scrollTopT)
    const currentEndIndex = getEndIndex(scrollTopT)
    if (!isBottom.value && currentEndIndex > cachedPosition.value.length - 1 ) {
        //lock that 
        isBottom.value = true
        handleOnReach();
    }

    visibleList.value
        = cachedPosition.value.slice(
            currentStartIndex - bufferRealSize.value < 0 ?
                0 : currentStartIndex - bufferRealSize.value
            ,
            currentEndIndex + bufferRealSize.value <= cachedPosition.value.length ?
                currentEndIndex + bufferRealSize.value : cachedPosition.value.length
        )
    
    
}

const fn =  useThrottleFn((event: UIEvent) => {
    //console.log(isEnd.value);
    
    if(cachedPosition.value.length===0){
        return ;
    }
    //@ts-ignore
    let scrollTopT = event.target.scrollTop
    scrollTop.value = scrollTopT
    const currentStartIndex = getStartIndex(scrollTopT)
    startIndex.value =  currentStartIndex
    const currentEndIndex = getEndIndex(scrollTopT)
    if (!isEnd.value && !isBottom.value && currentMaxHeight.value - scrollTopT- visibleHeight.value  < 0 ) {
        //lock that 
        isBottom.value = true
        handleOnReach();
    }

    visibleList.value
        = cachedPosition.value.slice(
            currentStartIndex - bufferRealSize.value < 0 ?
                0 : currentStartIndex - bufferRealSize.value
            ,
            currentEndIndex + bufferRealSize.value <= cachedPosition.value.length ?
                currentEndIndex + bufferRealSize.value : cachedPosition.value.length
        )

    //console.log(cachedPosition.value);
    
}, debounceDelayTime?.value?debounceDelayTime.value:16.7)


const onScroll = (event: UIEvent) => {
    fn(event)  
    /* console.log(event.target.scrollTop); */
    
}

const task = (arr:Ref<any[]>,left:number,right:number)=>{
    for (let i = left; i < right; i++) {
        arr.value[i].top = arr.value[i - 1].bottom;
        arr.value[i].bottom =
        arr.value[i].top + arr.value[i].height
    }
}

const updateOnePosition = (index: number, newHeight: number) => {
    if(!cachedPosition.value[index]){
        return;
    }
    let indexHeight = cachedPosition.value[index].height
    if (newHeight< defaultItemSize.value || indexHeight >= newHeight && !isContainerWidthUpdating.value ) {
        return;
    }
    let updatedHeight = newHeight
    cachedPosition.value[index].height = updatedHeight
    cachedPosition.value[index].bottom = cachedPosition.value[index].top + updatedHeight
    ///console.log('updated');
    
}

const updateAllPosition = useDebounceFn(()=>{
    if(cachedPosition.value.length >= 10000){
        //console.log(Math.floor(cachedPosition.value.length/33));
        let timeSlice:typeof TimeSlice.prototype | null = new TimeSlice(
            task,
            Math.floor(cachedPosition.value.length/33),
            cachedPosition,
            cachedPosition.value.length,
            ()=>{
                //
                timeSlice = null;
            }
        )
        timeSlice.start();
    }else{
        for (let i = 1; i < cachedPosition.value.length; i++) {   
            cachedPosition.value[i].top = cachedPosition.value[i - 1].bottom;
            cachedPosition.value[i].bottom =
            cachedPosition.value[i].top + cachedPosition.value[i].height

        }
    }
    //console.log('update ALl');
     //updateVisibleList(scrollTop.value)
},80)

/**
 * 當元素大小更新時,更新數組數據..
 */
const updatePosition =  (index: number, newHeight: number) => {
    updateOnePosition(index,newHeight);
    updateAllPosition()
}

const getStartIndex = (scrollTop: number) => {
    return binarySearch(cachedPosition.value, scrollTop)
};


const getEndIndex = (scrollTop: number) => {
    let bottom = scrollTop + visibleHeight.value
    let index = binarySearch(cachedPosition.value, bottom)
    if (index) {
        return index;
    }
    return cachedPosition.value[cachedPosition.value.length - 1].index
}


const binarySearch = (list: DynamicHeightCachedPosition[], value: number) => {

    let start = 0;
    let end = list.length - 1;
    let mid = 0;
    let midValue: DynamicHeightCachedPosition
    while (start <= end) {
        mid = start + Math.floor((end - start) / 2)
        midValue = list[mid]
        if (value === midValue.top) {
            return mid
        } else if (value > midValue.top) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return mid
}

/**
 * @description 設置初始position 和測量當前可視window
 */
const setUpFirstInfo = () => {
    if(data.value.length===0){
        return;
    }
    if (bufferSize?.value) {
        bufferRealSize.value = Math.floor(bufferSize.value);
    } else {
        bufferRealSize.value = 10
    }
    let temp: DynamicHeightCachedPosition[] = []
    for (let i = 0; i < data.value.length; i++) {
        temp.push({
            index: i,
            height: defaultItemSize.value,
            top: i * defaultItemSize.value,
            bottom: defaultItemSize.value * (i + 1),
            uuid:uuid()
        })
    }
    cachedPosition.value = temp;
    containerResizeObserve();
  
}

const fn1 = useDebounceFn(()=>{
    isContainerWidthUpdating.value = false;
    
},1000)

/**
 * @description 設置變量令updatePosition
 */
const setContainerState= ()=>{
    if(!isContainerWidthUpdating.value){
        isContainerWidthUpdating.value = true;
    }
    fn1()
    
}

/**
 * @description 當容器變化時的回調...
 */
const containerResizeObserve = () => {
    // const {stop ,isSupported } = useMutationObserver(outerContainer,(e)=>{
    //     const el = outerContainer.value
    //     const height = Number(window.getComputedStyle(el).getPropertyValue('height').replace('px',''))
        
    //     if(visibleHeight.value === height) return;
        
    //     setContainerState()
    //     visibleHeight.value = height
    //     // 初始化 .... 
    //     if (endIndex.value === 0) {
    //         endIndex.value = 10 + bufferRealSize.value;
    //         visibleList.value = cachedPosition.value.slice(0, endIndex.value)
    //     }
    // },{
    //     childList: true, 
    //     attributes: true, 
    //     characterData: true, 
    //     subtree: true 
    // })


    const { stop } = useResizeObserver(outerContainer, (entries) => {
        const entry = entries[0]
        const { width, height } = entry.contentRect
        setContainerState()
        if (height === visibleHeight.value) {
            return;
        }
        visibleHeight.value = height
        // 初始化 .... 
        if (endIndex.value === 0) {
            endIndex.value = 10 + bufferRealSize.value;
            visibleList.value = cachedPosition.value.slice(0, endIndex.value)
        }
    })
    outerStop.value = stop
}

const headerContainerResizeObserve = ()=>{
    // useMutationObserver(headerRef,(e)=>{
    //     const el = headerRef.value
    //     const height = Number(window.getComputedStyle(el).getPropertyValue('height').replace('px',''))
    //     if(headerHeight.value !== height){
    //         headerHeight.value = height
    //     }
    // },{
    //     childList: true, 
    //     attributes: true, 
    //     characterData: true, 
    //     subtree: true 
    // })
    const {stop} = useResizeObserver(headerRef,(entries) => {
        const entry = entries[0]
        const { width, height } = entry.contentRect
        if(headerHeight.value === height && headerHeight.value!=0){
            return
        }             
        headerHeight.value = height
    })
    headerStop.value = stop
}

const appendData = (item)=>{
    if(data.value.length === 0){
        data.value.unshift(item)
        setUpFirstInfo()
        updateVisibleList(scrollTop.value)
        setTimeout(()=>{
            isActive.value = false
        },1000)
    }else{
        isActive.value = true
        appending.value = true;
        data.value.unshift(item)
        cachedPosition.value.unshift({
            index: 0,
            top: 0,
            bottom: defaultItemSize.value,
            height: defaultItemSize.value,
            uuid:uuid()
        })
        for (let i = 1; i < cachedPosition.value.length; i++) {
            cachedPosition.value[i].index++;
            cachedPosition.value[i].top = cachedPosition.value[i-1].bottom;
            cachedPosition.value[i].bottom = cachedPosition.value[i].top + cachedPosition.value[i].height
        }
        updateVisibleList(scrollTop.value)
        setTimeout(()=>{
            isActive.value = false
        },1000)
    }
    //console.log(cachedPosition.value);
    
}

const deleteData = (index:number)=>{
    if(cachedPosition.value.length === 1){
        cachedPosition.value.pop()
        data.value.pop()
        return;
    }
    isActive.value = true
    appending.value = true;
    data.value.splice(index,1)
    cachedPosition.value.splice(index,1)
    //console.log(index , cachedPosition.value);
    if(index===0){
        cachedPosition.value[0].top = 0;
        cachedPosition.value[0].bottom  = cachedPosition.value[0].height;
        cachedPosition.value[0].index = 0;
        index++ 
    }
    if(cachedPosition.value.length != 1){
        for (let i = index; i < cachedPosition.value.length; i++) {
            cachedPosition.value[i].top  =cachedPosition.value[i-1].bottom;
            cachedPosition.value[i].bottom = cachedPosition.value[i].top + cachedPosition.value[i].height
            cachedPosition.value[i].index--;
        }
    }
    
    ElNotification({
        title: 'Success',
        message: 'Success to delete a Post',
        type: 'success',
        duration:1000
      })
    updateVisibleList(scrollTop.value);
    setTimeout(()=>{
        isActive.value = false
    },1000)
    
    
}


watch(data, (value, oldValue) => {
    if(!data.value){
        return ;
    }
    if(appending.value){
        appending.value = false;
        return
    }
    if (isBottom.value) {
        let temp: DynamicHeightCachedPosition[] = cachedPosition.value
        let oldLength = cachedPosition.value.length
        let newLength = value.length
        temp.push({
            index: oldLength,
            height: defaultItemSize.value,
            top: temp[oldLength - 1].bottom,
            bottom: temp[oldLength - 1].bottom + defaultItemSize.value,
            uuid:uuid()
        })
        for (let i = oldLength + 1; i < newLength; i++) {
            temp.push({
                index: i,
                height: defaultItemSize.value,
                top: (temp[i - 1].bottom),
                bottom: (temp[i - 1].bottom) + defaultItemSize.value,
                uuid:uuid()
            })
        }
        cachedPosition.value = temp
        updateVisibleList(scrollTop.value)
        setTimeout(() => {
            isBottom.value = false
        }, 200)
    }
    else{
        if(data.value.length === 0){
            cachedPosition.value = [];
            visibleList.value = [];
            visibleHeight.value = 0;
            endIndex.value = 0;
        }else{
            setUpFirstInfo();
            updateVisibleList(0);
            isEnd.value = false;
            //console.log(data.value);
            
        } 
    }
}, { deep: true  })




onMounted(() => {

    virtualListMethod.value( 
        appendData ,
        deleteData, 
        noMoreData 
    )
    if(!data.value){
        return;
    }
    setUpFirstInfo()
    if(loadingOffset?.value){
        loadOffset.value  = loadingOffset.value
    }
    /* headerStop.value = stop */
})

onUpdated(()=>{
    if(!headerHeight.value){
        headerContainerResizeObserve()
    }
})

onUnmounted(() => {
  
    if(outerStop.value){
        outerStop.value();
    }

})


onActivated(()=>{

    if(isKeepAlive?.value && data.value.length!==0){
        setTimeout(() => {
            outerContainer.value.scrollTo({
                left:0,
                top:scrollTop.value
            })
            updateVisibleList(scrollTop.value)
        }, 0);
        
    }  
})

onDeactivated(()=>{
    
})



</script>
<template>
<div ref="outerContainer" @scroll="onScroll" style="width: 100%;height: 100%;overflow: scroll;overflow-x: hidden;position: relative;">
    <div :style="{ height: `${currentMaxHeight + 50 + (isEnd?0:0)}px` }" class="virtual-list-container no-scroll-bar">
        
        <div class="header" ref="headerRef" style="position: relative;height:auto" v-if="Header !== undefined">
            <Header  />
        </div>

        <div v-show="isShowData">
            <div  
                class="virtual-list-content-item" 
                style="position: absolute;width: 100%;" 
                :index="item.index"
                :key="item.uuid" v-for="( item, index) in visibleList" 
                :class="{ ready: item.height !== defaultItemSize ,isActive:isActive }"
                :style="{ transform: `translate3d(0,${item.top}px,0)`, 
                        zIndex:(item.index)  }">
                <ListItem 
                    :deleteData="deleteData"
                    :Item="Item" 
                    :info="data[item.index]" 
                    :index="item.index" 
                    :updatePosition="updatePosition"
                    :default-size="(estimateSize as number)" 
                    :uuid="item.uuid"
                    :item-props="itemProps"
                    
                />
            </div>
            
        </div>
        <div v-if="data.length===0 "  
        :style="data.length!==0?{
            position:'absolute',bottom:'0px',height: '40px',transform: 'translateX(-50%)',left: '50%'
        }:{position:'relative'}" >
    
                <Bottom v-if="Bottom" />
        </div>
        <div v-if="cachedPosition.length!==0 && isBottom"  v-loading="true"
            style="width: 100%;position:absolute;;height: 40px;z-index: 100;transform: translateX(-50%);left: 50%;"
            :style="{ top: cachedPosition[cachedPosition.length - 1].bottom + headerHeight + 20 + 'px' }">

        </div>
        <div
        v-loading="true"
        v-show="isShowLoading"
        style="width: 100%;z-index: 100;transform: translateY( 100px )" 
        class="loading" >
        </div>
        
    </div>
</div>

</template>

<style lang="less" scoped>
.virtual-list-container {
    width: 100%;
    position: relative;
}

// 只作用于body标签

@media screen and (max-width:599px) {
    ::-webkit-scrollbar {
        width: 5px;
        background-color: #f2f2f2;

    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgb(222, 223, 225);
    }

    ::-webkit-scrollbar-track {
        background-color: #FFFFFF;
    }
}

@media screen and (min-width:600px) {
    ::-webkit-scrollbar {
        width: 5px;
        background-color: #f2f2f2;

    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgb(222, 223, 225);
    }

    ::-webkit-scrollbar-track {
        background-color: #FFFFFF;
    }


}




.virtual-list-content-item {
    width: 400px;
    height: auto;
    position: absolute;
    opacity: 0;
    background-color: #FFFFFF;
    transition: opacity  0.3s ease-out 0s;
}

.isActive{
    transition: all 0.3s ease-out 0s;
}


.ready {
    opacity: 1;
}
</style>