import TextInput from '../../components/TextInput/TextInput'
import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import { Button, Input, message } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { AiFillAccountBook } from "react-icons/ai";
import { userStore } from '../../store/user'
import { userLogin } from '../../service/user'
import Card from '../../components/Card/Card'
import { getPlatform } from '../../utils'
import InputHeights from '../../constant/InputHeight'
import { middleStyle } from '../../constant/style'
import { UserHandler } from '../../Handler/UserHandler'
import { CURRENT_USER_INFO } from '../../constant/storageKey'
import { UserInfo } from '@/Model/user'
import { base_url } from '../../api/config'

export default function Login() {
  const platForm = getPlatform()
  const [userArr, setUserArr] = useState<UserInfo[]>()

  const findoutAccount = () =>{
    const userInfo = UserHandler.getCurrentUserInfo()
    let keys = Object.keys(localStorage)
    let userInfoArr :any[] = [] 
    
    if(userInfo === null){
      for (const index in keys) {
        let result = keys[index].search(/userInfo/)
        if(result=== -1  ) continue
        const userTemp = localStorage.getItem(keys[index])
        if(keys[index] !== CURRENT_USER_INFO && userTemp !==null  ){

            userInfoArr.push(JSON.parse(userTemp))
            
        }
       }

        userStore.setIsLogin(false)
    }else{
      
      // login ! 
      userStore.setUserInfo(userInfo)
        userStore.setIsLogin(true)

    }
    setUserArr(userInfoArr)
  }

  const login=( userInfoTemp :UserInfo | undefined )=>{
    const { username , password } = userStore
    if(userInfoTemp!==undefined){
        userStore.setUserInfo(userInfoTemp )
        userStore.setIsLogin(true)
        UserHandler.saveUserInfoToLocal(userStore.userInfo?.id ,userStore.userInfo)
        UserHandler.saveCurrentUserInfo(userStore.userInfo)
        
        return
    }
    userLogin(username , password).then(res=>{
        if(res.data.msg!=='error'){
          
            //存入userStore..
            userStore.setUserInfo(res.data.userInfo.userInfo)
            userStore.setIsLogin(true)
            UserHandler.saveUserInfoToLocal(userStore.userInfo?.id ,userStore.userInfo)
            UserHandler.saveCurrentUserInfo(userStore.userInfo)
            
            message.success({
                content: ' login success ! ',
                duration: 1
            })
            
        }else{
            message.error(' error , maybe your account or paasword is wrong')
        }
    })


  }

  


  useEffect(() => {
    findoutAccount()
  }, [])
  
  

  return (
    <div className='login-container'>
        {
            platForm !== 'ios'
            &&
            <div className="users-container">
                <div style={{
                    maxHeight:50,
                    fontSize:26,
                    textAlign:'left',
                    fontWeight:'bolder',
                    color:"rgb(24,119,242)",
                    marginBottom:30
                    }}> <div>Your Account</div>
                        <div style={{fontSize:20,color:"#CDCDCD"}}>Recently logined</div>
                      </div>
                {
                    userArr
                    &&
                    <div className="login-card-container">
                    {
                        userArr.map((item,index)=>{
                            
                            return(
                                (
                                    <Card 
                                    onClick={()=>login(userArr[index])}
                                    cancelButtonOnClick={()=>console.log('cancel !')}
                                    style={{
                                        width:'30%',
                                        maxWidth:180,
                                        height:'55%',
                                        maxHeight:250,
                                        marginRight:10,
                                        marginBottom:10
                                    }}
                                    name={item.username} 
                                    pic={base_url+item.icon} 
                                    
                                />
                                )
                            )
                            }
                        )
                    }
                    
                </div>
                }
                
                
            </div>
        }
        <div className='login-real-container'>
            <div className='login-top'>
                <img src={require('../../assets/home.png')} style={{
                    width:'15%',
                    
                }} />
                <span 
                style={{
                    color:'#3672CF',
                    fontSize:'220%',
                    fontWeight:'bolder'
                    }}>
                    DanDan
                </span>
            </div>

            <TextInput 
                onChangeCallBack={v=>userStore.setUserName(v)}
                placeholder='email or username'
                isPassword={false}
                style={{
                    maxWidth:400,
                    minWidth:200,
                    minHeight:25,
                    paddingLeft:'5%',
                    width: platForm !== 'ios' ?'80%':'90%',
                    height: InputHeights[platForm],
                    maxHeight:100,
                    borderRadius:40,
                    marginBottom:'5%'}}
            />
            <TextInput
                onChangeCallBack={v=>userStore.setPassWord(v)}
                isPassword={true}
                placeholder='password'
                style={{
                    maxWidth:400,
                    minWidth:200,
                    minHeight:25,
                    paddingLeft:'5%',
                    width: platForm !=='ios'?'80%':'90%',
                    height:InputHeights[platForm],
                    borderRadius:40}} 
            />

            <div  className='login-button-container' style={{paddingTop:'5%'}}>
               <div onClick={()=>login(undefined)} className="button">
                    <LoginOutlined 
                    style={{
                        position:'absolute',
                        left:'50%',
                        top:'50%',
                        color:"#FFFFFF",
                        fontSize:'130%',
                        transform:'translateX(-50%) translateY(-50%)',
                        boxShadow:'1 1 5 5px #FFFFFF'
                    }} />
               </div>
            </div>

            <div style={{
                bottom:platForm === 'windows'?'10%':'30%'
            }} className="login-bottom-container">
                <div className='bottom-word' style={{marginRight:'15%'}}>注冊</div>
                <div className='bottom-word' style={{}}>忘記密碼</div>
            </div>
        </div>
        <div style={{
            backgroundColor:"rgb(17,154,251)",
            position: 'absolute',
            bottom:0,
            width:'100%',
            height:'7%',
            color:"#FFFFFF",
            ...middleStyle,
            justifyContent:'flex-start',
            paddingLeft:'3%'
        }} >
            Made by Danny Lei    
            <span style={{paddingLeft:'20%'}} >github : https://github.com/Dannyolly</span>
        </div>
    </div>
  )
}
