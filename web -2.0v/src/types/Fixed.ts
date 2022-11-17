import { VueEl } from "@/types/Element"
import { FixedHeightCachedPosition } from "./virtualList"



interface FixedHeightVirtualListState {
    /**
     * 可視高度
     */
    visibleHeight:number,
    /**
     * 當前列表
     */
    visibleList:FixedHeightCachedPosition[],
    /**
     * 記錄所有節點的index
     */
    cachedPosition:FixedHeightCachedPosition[],
    
    
    visibleCount:number,
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

    /**
     * true is no more data reload
     */
    isEnd:boolean,
    /**
     * current scroll offset 
     */
    scrollTop:number,
    
    isActive:boolean
}

export{
    FixedHeightVirtualListState,
}