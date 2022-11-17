import { createApp , App as AppType } from "vue";
import 'core-js/stable'
import 'regenerator-runtime/runtime';
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
/* import store from './store' */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import VirtualList from '@/components/VirtualList'
/* import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'  */
import './var.less'
import { createPinia } from 'pinia'
/* const options:Partial<ManagerOptions & SocketOptions> = {
    transports:['websocket'],
    forceNew:true,
   
}
const socket = io('http://localhost:6007',options);
const install= ({ app }) => {
    app.config.globalProperties.$socket = socket;
    app.provide('socket', socket);
} */

const pinia = createPinia()
const app = createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(pinia)
    .mount('#app')


    
    



