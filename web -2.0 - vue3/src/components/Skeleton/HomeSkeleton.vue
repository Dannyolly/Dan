<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
import { middleStyle } from '@/utils/Style';
/* interface HomeProps {}
const props = defineProps<HomeProps>()
const { } = toRefs(props) */
const {} = useState({})
</script>
<template>
  <div style="width:100%">
    <el-skeleton style="width:100%" animated>
      <template #template>
        <div class="post-container">
          <div class='post-header '>
              <el-skeleton-item  variant="circle" style="width: 60px; height: 60px"   />
              <div class='post-name'>
                  <div :style="{...middleStyle,fontSize:'14px',justifyContent:'flex-start',marginBottom:'10px'}">
                    <el-skeleton-item   style="width: 100px; height: 15px;border-radius: 10px;"   />
                  </div>
                  <div :style="{...middleStyle,fontSize:'14px',justifyContent:'flex-start',marginBottom:3}">
                    <el-skeleton-item   style="width: 50px; height: 15px;border-radius: 10px;"   />
                  </div>
              </div>
          </div>
          <div :style="{height:'65%',paddingLeft:'60px'}">
            <div class="post-introduction" :style="{
                fontSize:'15px',textAlign:'left',
                paddingTop:'20px',
                paddingRight:'20px'
                }">
            
                <span :style="{paddingLeft:'0px'}">
                   <el-skeleton-item   style="width: 90%; height: 15px;border-radius: 10px;margin-bottom: 10px;"   />
                   <el-skeleton-item   style="width: 70%; height: 15px;border-radius: 10px;"   />
                </span>

            </div>
            <div class="post-picture">
                <el-skeleton-item  style="width: 90%; height: 200px;border-radius: 10px;"     />
            </div>
            <div class='interaction-container'>
              <el-skeleton-item   style="width: 30%; height: 20px;border-radius: 10px;"   />
              <el-skeleton-item   style="width: 30%; height: 20px;border-radius: 10px;"   />
              <el-skeleton-item   style="width: 30%; height: 20px;border-radius: 10px"   />
            </div>
        </div>
        </div>
      </template>
  </el-skeleton>
  </div>
</template>


<style scoped lang="less" >


:deep(.el-input__wrapper){
    border-radius: 20px;
    border: 0px;
}
.post-container{
    border-bottom-width: 1px;
    transition: all 0.3s;
    cursor: pointer;
    width: 100%;
    height: auto;
    padding-bottom: 20px;
    position: relative;
  .post-header{
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;
      height: 50px;
      display: flex;
      flex: 1;
      position: relative;
      align-items: center;
      .img{
          position: absolute;
          left: 20px;
          width: 40px;
          height: 40px;
          border-radius: 24px;
      }
      .post-name{
          color: @title;
          font-family: @font-style;
          position: absolute;
          left: 70px;
          height: 40px;
          padding: 4px;
          padding-left: 10px;
          font-weight: 500;
      }
      .more{
          height: 30px;
          position: absolute;
          right: 20px;
          font-weight: bolder;
          font-size: 16px;
          cursor: pointer;
      }
  }
  .post-introduction{
      font-family:TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: @text-color;
      padding-left: 20px;
      /* font-weight: 500; */
  }
  .post-picture{
      width: 90%;
      height: 90%;
      padding: 10px;
      padding-top: 5px;
      padding-bottom:5px;
      padding-left: 20px;
      img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          border-color: rgb(207, 217, 222);
          border-width: 1px;
          border-style: solid;
      }
  }

  .interaction-container{
      color: rgb(83, 100, 113);
      width: 80%;
      padding-left: 20px;
      padding-right: 5%;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
  }
}

@media screen and (min-width: 600px){
  .post-container{
    width: 100%;
  }
} 

@media screen and (max-width: 599px){
  .post-container{
    width: 100%;
  }
} 


</style>