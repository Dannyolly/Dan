<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted, CSSProperties} from 'vue';
import {useState} from '@/hooks/useState';
import { Post } from '@/types/post';
import  { ElMessage, ElMessageBox, UploadProps, UploadUserFile  } from 'element-plus'
import  { Picture } from '@element-plus/icons-vue'
interface PublishProps {
    textAreaStyle?: CSSProperties | undefined,
    minRows?:number,
    onUploadNewPost?:(post:Post)=>void;
}
const props = defineProps<PublishProps>()
const { textAreaStyle , minRows , onUploadNewPost } = toRefs(props)
const { textArea,imageUrl , isWindows, fileList } = useState({
    textArea :'',
    imageUrl:'',
    isWindows:true,
    fileList:[] as UploadUserFile[]
})

const baseTextAreaStyle = {
    border:0,
    fontSize:'18px',
    height:'90%',
    fontWeight:500,
    marginBottom:40
}

const onSubmit=()=>{

}

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}


</script>
<template>
  <div class='publish-container' style="display:flex">
        <img 
         style="width:40px;height:40px;borderRadius:20px" 
            :src="require('../assets/icon.png')"
        />
        <div class='publish-right-container' >
         
          <el-input
                v-model="textArea"
                :rows="3"
                type="textarea"
                placeholder="What's happening?" 
                style="margin-bottom: 10px;font-size: 16px;font-weight: bold;border: none;"
                :input-style="{
                  border:'none',
                  display:'flex'
                }"
                
            />
          <!-- <div  style="width:100%;height:1px;background:#F4F4F4;margin-bottom:15px" />
           -->
         <!--  <div :style="{
                    display:imageUrl !== undefined ? 'flex':'none' ,
                    position:'relative',
                    justifyContent:'flex-start',
                    flexDirection:'row',
                    marginBottom:10
            }">
           
          </div>   -->


          <div class='publish-bottom-container' >
            <div :style="{display:isWindows?'flex':'none'}">
              <el-upload
                v-model:file-list="fileList"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :limit="3"
                :on-exceed="handleExceed"
              >
                <el-button type='primary' size="medium" :icon="Picture" circle style="font-size: 14px;margin-right: 10px;" />
              </el-upload>
              <el-button 
              type='default'
              round
              style="border:0;backgroundColor:#F4F4F4;border-radius:20;margin-right:10px">
                  emjio
              </el-button>
            </div>
            <el-button 
            round
            type='default'
            style="border:0;backgroundColor:#F4F4F4;border-radius:20;margin-right:10px">
                Link
            </el-button >
            <div :style="{flex:1,display:'flex',justifyContent: 'flex-end'}">
              <el-button  type='primary' :style="{borderRadius:20}" round >
                submit
              </el-button>
            </div>
          </div>
        </div>
    </div>
    <div  style="width:100%;border: 0px solid rgb(244, 244, 244);border-bottom-width: 0.5px;margin-bottom:0px" />
</template>

<style lang="less" scoped>
.publish-container{
        :deep(.el-textarea__inner){
          border: none;
          display: flex;
        }
        padding: 20px;
        padding-top: 10px;
        width: calc(100%-40px);
    img{
        margin-right: 7px;
    }    .publish-right-container{
        flex:1
    }
    .publish-bottom-container{
        flex:1;
        display:flex
    }
}
</style>