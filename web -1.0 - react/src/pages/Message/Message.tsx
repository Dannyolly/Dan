import React, { useEffect, useState } from 'react'
import  MiddleTopHeader from '../../components/MiddleTopHeader/Top'

import Publish from '../../components/Publish/Publish'
import { getAllUserPost } from '../../service/post'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { middleStyle } from '../../constant/style'
import { Post } from '../../Model/post'
import { userStore } from '../../store/user'
import { useRef } from 'react'
import UserPost from '../../components/Post/Post'
import InfiniteScroll  from 'react-infinite-scroll-component'
import MiddleContent from '../../components/MiddleContent/MiddleContent' 

export default function Message() {
  
  
  


  useEffect(()=>{ 
    
  },[])

  return (
    
    <MiddleContent
      title='Message'
      Content={
        ()=><div></div>
      }
    
    />
  )
}
