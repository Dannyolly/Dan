<script setup lang="ts">
import {defineProps, toRefs} from "vue";
import {useState} from "@/hooks/useState";
import { User ,Postcard } from '@element-plus/icons-vue'
import axios from 'axios'
import {ElNotification} from "element-plus";
import {LocalStorageManager} from "@/utils/localStorage";
import router from "@/router";
import { useStore } from "vuex";
import { verify , register  } from '@/service/user'
/*interface registerProps {

}
const props = defineProps<registerProps>()
const {

} = toRefs(props)*/
const {
  password,
  username,
  email,
  validateCode
} = useState({
  username:'',
  password:'',
  email:'',
  validateCode:""
})
const store = useStore()

const submit=async ()=>{
    const { data } =  await register(username.value,password.value,validateCode.value,email.value);
    const {  user, res } = data.data
    if(res){
        ElNotification({
            title:'OK',
            message:' register  sucuessfully ',
            type:'success'
        })
    }
    router.replace('/login');
    
}

const sendCodeRequest = async ()=>{
    const { data } = await verify(email.value)
    ElNotification({
        title:'OK',
        message:' send ValidateCode  sucuessfully ',
        type:'success'
    })
}


</script>
<template>
  <div class="register-container">
    <div class="register-card-container">
      <div class="register-card-container-left">
        <img style="width: 100%;height: 100%;object-fit: cover;border-top-left-radius: 20px;border-bottom-left-radius: 20px;"
             src="https://doc.paperpass.com/statics/images/ppLogin.png"
        />
      </div>
      <div class="register-card-container-right" >
        <h1 style="color: #43546a;font-size: 30px;margin: 0;margin-bottom: 10px">Register</h1>
        <div style="flex-direction: column;display: flex;justify-content: center;align-items: center;flex: 1;">
          <el-input
              :input-style="{
                      border:'0'
                }"
              v-model="username"
              type="username"
              :suffix-icon="User"
              placeholder="Please input username"
              style="width: 100%;height: 40px;margin-bottom: 15px;border-radius: 40px"
          />
          <el-input
              v-model="password"
              type="password"
              :suffix-icon="Postcard"
              placeholder="Please input password"
              show-password
              style="margin-bottom: 20px;width: 100%;height: 40px"
          />
          <el-input
              v-model="email"
              placeholder="Please input email"
              style="margin-bottom: 20px;width: 100%;height: 40px"
          />
          <div style="width: 100%;display: flex;justify-content: space-between;" >
            <el-input
              v-model="validateCode"
              placeholder="code"
              style="margin-bottom: 20px;width: 70%;height: 40px;margin-right: 0px;"
            />
            <el-button
                type="primary"
                style="width: 80px;height: 40px"
                round
                @click="sendCodeRequest"
            >
                發送
            </el-button>
          </div>
            
          <div style="position: relative ;width: 100%;display: flex;flex: 1;justify-content: space-around;align-items: flex-end;">
            <div style="position: absolute;bottom: 60px;">
                <span>已有帳號?</span>
                <span @click="router.replace('/login')" style="padding-left: 5px;font-size: 12px;color: rgb(64,158,255);cursor: pointer;" >馬上登錄</span>
            </div>
            <el-button
                type="primary"
                style="width: 60%;height: 40px;"
                round
                @click="submit"
            >
                注冊
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-content" >
            Made by Danny Lei    
            <span style="padding-left:20%" >
            github : https://github.com/Dannyolly
            </span>
        </div>
  </div>

</template>


<style scoped lang="less">
:deep(.el-input__wrapper){
  border-radius: 20px;
  border:0;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #FFFFFF;
}
.bottom-content{
        position: absolute;
        bottom: 0px;
        display: flex;
        flex: 1;
        
        background-color: rgb(17,154,251);
        color:"#FFFFFF";
        width: calc(100% - 40px);
        height: calc(7% - 40px);
        color: #FFFFFF;
        font-family: @font-style;
        font-size: 16px;
        /* justify-content: center; */
        padding: 20px;
        align-items: center;
    }


@media screen and (min-width:701px) {
    .register-container{
    border-radius: 20px;
  background-color: rgb(245,246,250);
  box-shadow:0 0 10px #CDCDCD; 
  width: 90%;
  max-width: 920px;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 60px;
  .register-card-container{
    display: flex;
    width: 90%;
    height: 100%;
    .register-card-container-left{
      display: flex;
      flex: 1;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      overflow: hidden;
    }
    .register-card-container-right{
      display: flex;
      flex-direction: column;
      flex: 1;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
      background-color: #FFFFFF;
      padding: 30px;
      padding-bottom: 0px;
    }
  }
}
}

@media screen and (max-width:700px)  {
    .register-container{
    border-radius: 20px;
  background-color: rgb(245,246,250);
  box-shadow:0 0 10px #CDCDCD; 
  width: 90%;
  max-width: 920px;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 60px;
  .register-card-container{
    display: flex;
    width: 90%;
    height: 100%;
    .register-card-container-left{
      display: none;
      img{
        display: none;
      }
    }
    .register-card-container-right{
      display: flex;
      flex-direction: column;
      flex: 1;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
      background-color: #FFFFFF;
      padding: 30px;
      padding-bottom: 0px;
    }
  }
}
}
</style>