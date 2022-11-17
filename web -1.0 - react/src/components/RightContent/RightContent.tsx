import { middleStyle } from '../../constant/style'
import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import './style.scss'
import Message from '../../pages/Message/Message'
import Messager from './Messager/Messager'
import Advertisement from './Advertisement/Advertisement'
import { getPlatform } from '../../utils'
export default function RightContent() {
  /* const platform = getPlatform()
  const [isWindows, setIsWindows] = useState<boolean>(false)
  useEffect(()=>{ 
    console.log(platform);
    if(platform === 'windows'){
      setIsWindows(()=>true)
    }

  },[]) */

  return (
    <div /* style={{display:isWindows?'flex':'none'}} */ className='right-content-container'>
        <div className='messager-header'>
            <span style={{
              display:'flex',
              textAlign:'right',
              alignItems:'center'

            }}>
              Messager
            </span>
            <SearchOutlined 
            style={{
              display:'flex',
              textAlign:'right',
              alignItems:'center'
              }} />
        </div>
        
        <Messager/>
        <Messager/>
        <Messager/>
        <Messager/>
        
        <div style={{
          width:'100%',
          height:1,
          backgroundColor:"rgb(244, 244, 244)",
          marginBottom:'10px'
        }}/>
        <div className='advertisement-header' style={{paddingTop:0}}>
            <span style={{marginRight:'0%'}}>Advertisement</span>
             
        </div>

        <Advertisement/>
        <Advertisement/>
        <Advertisement/>
        <Advertisement/>
        <Advertisement/>
    </div>
  )
}
