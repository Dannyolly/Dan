import React, { useEffect, useState } from 'react'
import  MiddleTopHeader from '../MiddleTopHeader/Top'
import './style.scss'
import Publish from '../Publish/Publish'
import { getAllUserPost } from '../../service/post'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { middleStyle } from '../../constant/style'
import { Post } from '../../Model/post'
import { userStore } from '../../store/user'
import { useRef } from 'react'
import UserPost from '../Post/Post'
import InfiniteScroll  from 'react-infinite-scroll-component'

interface MiddleProps {
    title : string ,
    Content : ()=>JSX.Element
}

export default function MiddleContent(props : MiddleProps) {
  


  useEffect(()=>{ 
    
  },[])

  const antIcon = <LoadingOutlined style={{ fontSize: 36  }} spin />;

  return (
    <div className='middle-content-container'> 
          <div className='middle-content-container' id='scrollableDiv'
          style={{width:'100%',height:'100%',display:'flex',overflow:'scroll',flexDirection:'column'}}
          > 
              <div>
                <MiddleTopHeader/>
              </div>
              
                
                <div style={{...middleStyle,flexDirection:'column',width:'100%',height:'60%'}}>
                  <img src={require('../../assets/home.png')} style={{width:100,height:100}} />
                  <div>開發中 ..... 敬請期待 LOL </div>
                  <Spin size='large' indicator={antIcon} />
                </div>
                
                
              
          </div>
        
       
    </div>
  )
}
