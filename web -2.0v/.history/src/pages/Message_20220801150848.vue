<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/MiddleTopHeader.vue';
import MessageItem from '@/components/MessageItem.vue';
import { Search } from '@element-plus/icons-vue'
import RightBar from './Home/RightBar.vue';
interface MessageProps {}
const props = defineProps<MessageProps>()
const { } = toRefs(props)
const {
  input
} = useState({
  input:''
})
</script>
<template>
  <div class="message-container">
    <MiddleTopHeader name="Message" />
    <div class="search-container">
      <el-input
        v-model="input"
        style="height: 10%;"
        placeholder="Search Person"
        :suffix-icon="Search"
        round
      />
    </div>
    <MessageItem/>
    <MessageItem/>
    <MessageItem/>
    <MessageItem/>
    <MessageItem/>
    <MessageItem/>
    <MessageItem/>
    <MessageItem/>
  </div>
  <RightBar />
</template>

<style lang="less" scoped>


:deep(.el-input__inner){
  height:40px 
}
:deep(.el-input__wrapper){
  border-radius: 20px;
}
.message-container{
  /* display: flex;
  flex-direction: column; */
  width: 70%;
  overflow: scroll;
  height: 100%;
  .search-container{
    padding: 20px;
    padding-left: 5%;
    padding-right: 5%;
  }
}  
::-webkit-scrollbar{
  display: none;
}

@media screen and (min-width:820px){
  .message-container{
    width:70%
  }
}
@media screen and (max-width:820px){
  .message-container{
    width:70%
  }
}

</style>