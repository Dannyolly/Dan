<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style'
import { Faker, faker } from '@faker-js/faker';
import { UserInfo } from '@/types/user';
import { normalUrl } from '@/api/config';
 interface MessagerProps {
    info:UserInfo
 }
const props = defineProps<MessagerProps>()
const { info } = toRefs(props)
const {} = useState({}) 
const image = ''
</script>
<template>
  <div :style="{height:40}" class='messager-container'>
        
        <div :style="{width:'auto',height:'100%',...middleStyle}"
        class="messager-real-container">
          <img 
          :src="info.avatar===''? normalUrl + 'postImage/3E0YqDNuCdMfzoF67pGqqBD8d6uRxcfauCW92Gb7.jpg':normalUrl + info.avatar"
          alt="" 
          />
          <div class='online'>

          </div>
          <div class="name">{{info.name}}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>

.messager-real-container:hover{
    background-color: rgb(228,230,232);
    border-radius: 20px;
}
.messager-container{
    width:100%;
    height:40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    cursor: pointer;
    position: relative;
    margin-bottom: 4%;
    .messager-real-container{
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;
        .online{
            width: 10px;
            height: 10px;
            border-radius: 20px;
            background-color: rgb(46,154,72);
            position:absolute;
            left: 30px;
            bottom: 15%;
        }
    
        img{
            width:30px;
            height: 30px;
            border-radius: 20px;
            margin-right: 10px;
        }
        .name{
            font-size: 14px;
            font-weight: 500;
        }
    }
}
</style>