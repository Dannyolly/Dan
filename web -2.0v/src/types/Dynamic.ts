import { VueEl } from "@/types/Element"
import { DynamicHeightCachedPosition } from "@/types/virtualList"


interface DynamicHeightVirtualListState {
    /**
     * 可視高度
     */
    visibleHeight:number,
    /**
     * 容器widh
     */
    isContainerWidthUpdating:boolean,
    /**
     * 當前列表
     */
    visibleList:DynamicHeightCachedPosition[],
    /**
     * 記錄列表數據..
     */
    cachedPosition:DynamicHeightCachedPosition[],
    /**
     * 默認的defaultItemSize
     */
    defaultItemSize:number | 100,
    /**
     *  起點..
     */
    startIndex:number,
    /**
     * 終點...
     */
    endIndex:number,
    /**
     * 到底部了?
     */
    isBottom:boolean,
    /**
     *  當前高度
     */
    currentMaxHeight:number ,

    isEnd:boolean,
    
    scrollTop:number,
}


export{
    DynamicHeightVirtualListState,
}