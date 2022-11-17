<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import MiddleTopHeader from '@/components/MiddleTopHeader.vue';
import {middleStyle} from '@/utils/Style'
import NotificationContent from '../components/NotificationContent.vue'
import TabBar from '@/components/TabBar.vue';

interface NotificationProps {}
const props = defineProps<NotificationProps>()
const { } = toRefs(props)
const {
  activeIndex
} = useState({ 
  activeIndex:0
})

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="notification-container">
      <MiddleTopHeader name="Notification" />
      <div class="top">
        <TabBar :title="['All','UnRead']" />
      </div>
      <NotificationContent/>
      <NotificationContent/>
      <NotificationContent/>
      <NotificationContent/>
      <NotificationContent/>
      <NotificationContent/>
      <NotificationContent/>
      <NotificationContent/>
  </div>
  <RightBar />
</template>

<style lang="less" scoped>

@media screen and (min-width:821px){
  .notification-container{
    width:70%
  }
}
@media screen and (max-width:820px){
  .notification-container{
    width:100%
  }
}

</style>