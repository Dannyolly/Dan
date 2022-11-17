import ItemVue from "@/components/vlist2/Item.vue";
import { VueEl } from "@/types/Element";
import { DefineComponent } from "vue";

interface DynamicHeightCachedPosition {
    index :number,
    top:number,
    bottom:number,
    height:number,
    info?:string,
    uuid:string
}
interface FixedHeightCachedPosition{
    index:number,
    uuid:string
}

type VirtualListMethod=(
    appendData:(item:any)=>void,
    deleteData:(index:number)=>void ,
    noMoreData:()=>void
)=>void

interface ListBaseProps {
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

interface DynamicHeightVirtualListProps extends ListBaseProps{
    /**
      * @description estimateSize 
      * @default 100
      */
    estimateSize ?:number,
}

interface FixedHeightVirtualListProps extends ListBaseProps{
    /**
      * @description if you set this props ,this component will transform to fixed-height virtual-list.
      */
    fixedHeight?:number,
}

interface VirtualList extends DynamicHeightVirtualListProps,FixedHeightVirtualListProps{
    
}


export {
    DynamicHeightVirtualListProps,
    FixedHeightVirtualListProps,
    DynamicHeightCachedPosition,
    FixedHeightCachedPosition,
    VirtualListMethod,
    VirtualList
}