import React, { useEffect, useState } from 'react'
import  MiddleTopHeader from '../../components/MiddleTopHeader/Top'
import './style.scss'
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


export default function Home() {
  
  const [postArr, setpostArr] = useState<Array<Post> | undefined >(undefined)
  const page = useRef<number>(0)
  const pageSize = 5 
  const getPost= async ()=>{
    /* console.log('getPost?'); */
    const {  data } = await getAllUserPost(userStore.userInfo?.id,page.current, pageSize )
    setpostArr(data)
  }

  const getMorePost = async () =>{
    page.current = page.current + 1
    //console.log('getMorePost',`pageSize${page.current}`);
    const {  data } = await getAllUserPost(userStore.userInfo?.id, page.current * pageSize, pageSize )
    if(postArr !== undefined){
      setpostArr([...postArr,...data])
    }
  }

  /**
   * @callback
   */
  const onUploadNewPost = ( post:Post )=>{
    if(postArr!==undefined){
      setpostArr([post,...postArr])
    }

  }

  useEffect(()=>{ 
    getPost()
  },[])

  const antIcon = <LoadingOutlined style={{ fontSize: 36  }} spin />;

  return (
    <div className='home-container'> 
          <div className='home-post-container' id='scrollableDiv'
          style={{width:'100%',height:'100%',display:'flex',overflow:'scroll',flexDirection:'column'}}
          > 
              <div>
                <MiddleTopHeader/>
                <Publish onUploadNewPost={onUploadNewPost} />
                <div style={{width:'100%',height:1,backgroundColor:"#F4F4F4"}}/>
              </div>
              {
                postArr===undefined?
                <div style={{...middleStyle,width:'100%',height:'40%'}}>
                  <Spin size='large' indicator={antIcon} />
                </div>
                :
                <InfiniteScroll
                  hasMore={true}
                  dataLength={postArr.length}
                  next={getMorePost}
                  
                  loader={<Spin size='large' indicator={antIcon} />}
                  scrollableTarget='scrollableDiv'
                  /* scrollThreshold={0.5} */
                >
                  {
                    postArr.map((item,index)=>{
                      /* console.log(`postId${ item.id}`); */
                      return(
                        <UserPost key={item.id} postInfo={item} />
                      )
                    })
                  }
                </InfiniteScroll>
              }
          </div>
        
       
    </div>
  )
}
