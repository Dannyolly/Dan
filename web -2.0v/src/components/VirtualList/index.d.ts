import { ComponentPublicInstance, CreateComponentPublicInstance, defineComponent,DefineComponent} from 'vue'
import { VirtualList as VirtualListProps, ListBaseProps} from '@/types/virtualList'
/* import { DynamicSizeList } from 'element-plus/lib/components/virtual-list'
 */
declare const VirtualList:DefineComponent<VirtualListProps>

/* declare const VirtualList:typeof DynamicSizeList */

export default VirtualList