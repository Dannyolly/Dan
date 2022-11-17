import React, { useState } from 'react'
import Logo from './Logo'
import './style.scss'
import BaseIcon from '../IconButton/BaseIconButton'
import { middleStyle } from '../../constant/style'
import UserIcon from '../IconButton/UserIcon'
import { UserHandler } from '../../Handler/UserHandler'
import { userStore } from '../../store/user'

export default function Home() {
  const tabs = [  '設置' , '其它' , '登出' ,]
  const [isClickOptions, setisClickOptions] = useState(false)
  

  const clickOnOption= ( index: number) =>{
    setisClickOptions(!isClickOptions)
    if(tabs[index]==='登出'){
      UserHandler.removeCurrentUserInfo()
      userStore.setIsLogin(false)
    }
  }

  return (
    <div className='container'  >
        {/* <div className='logo' style={{...middleStyle,float:'right',position: 'absolute',left: '-60px',top:'10px'}}>
            <Logo/>
          
        </div> */}
        <div style={{
          ...middleStyle,
          float:'right',
          position: 'absolute',
          right: '20px',
          top:'10px'}}>
          
          <BaseIcon logoName='ui-message'  style={{marginLeft:'10px'}} />
          <BaseIcon logoName='notification' style={{marginLeft:'10px'}} />
          <div  style={{position:'relative'}}>
            <BaseIcon onClick={()=>setisClickOptions(!isClickOptions)} logoName='simple-down'  style={{marginLeft:'10px'}} />
            {
              isClickOptions
              &&
              <div  style={{
                width:60,
                height:120,
                borderRadius:5,
                position:'absolute',
                top: 40,
                backgroundColor:"rgba(228,230,235)",
                flexDirection:'row',
                flexWrap:'wrap',
                ...middleStyle,
                zIndex:100
              }}
                >
                {
                  tabs.map((item,index)=>{
                    return(
                      <div 
                      onClick={()=>clickOnOption(index)} 
                      className='more-option' 
                      style={{width:'100%',cursor:'pointer'}}>{item}</div>
                    )
                  })
                }
              </div>
            }
          </div>
          <UserIcon style={{marginLeft:'10px'}} />
        </div>
    </div>
  )
}
