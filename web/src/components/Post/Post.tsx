import { middleStyle } from '../../constant/style'
import { CommentOutlined, LikeOutlined, MoreOutlined, RetweetOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useEffect } from 'react'
import TextInput from '../TextInput/TextInput'
import './post.scss'
import { calculateDate, getPlatform, objTOParams } from '../../utils'
import { Post } from '../../Model/post'
import { base_url } from '../../api/config'
import { getUserIcon } from '../../service/user'
import { useState } from 'react'
import { searchUser } from '../../service/friend'
import { UserInfo } from '@/Model/user'
import { getAllCommentCount } from '../../service/comment'
interface PostProps {
    postInfo : Post | undefined,

}
export default function UserPost(props:PostProps) {
  const [icon, setIcon] = useState<string | undefined >(undefined)
  const [userInfo, setUserInfo] = useState<UserInfo | undefined > (undefined)
  const [commentCount, setCommentCount] = useState<number | undefined>(undefined)
  const [post, setPost] = useState<Post | undefined>(undefined)

  const getPostUser = () =>{
      if(post===undefined) return
      searchUser(objTOParams({id:post?.userId})).then(res=>{
        setUserInfo(()=>res.data[0])
      })
      

      // 獲取評論分目
      getAllCommentCount(post?.id).then(res=>{
          const count = res.data
          setCommentCount(()=>count)
      })
  }


  const processPostImage = () =>{
      
      let { postInfo } = props
      // @ts-ignore
      let imageTemp :String[] = postInfo?.postImage.split(',')
      if(postInfo !== undefined){
        postInfo.postImage = imageTemp
      }
      setPost(()=>postInfo)
  }

  useEffect(()=>{
    processPostImage()
  },[])

  useEffect(()=>{
    getPostUser()
  },[post])

  if(post === undefined){
      return <></>
  }

  //console.log(post);

  return (
    <div className='post-container'>
        <div  className='post-header '>
            <img  src={ base_url + userInfo?.icon } />
            <div className='post-name'>
                <div style={{...middleStyle,height:15,fontSize:'14px',textAlign:'left',marginBottom:3}}>{userInfo?.username}</div>
                <div style={{...middleStyle,justifyContent:'flex-start',height:15,fontSize:'10px',paddingLeft:2}}>{calculateDate(post?.postDate)}</div>
            </div>
            <div className='more'>
                <MoreOutlined />
            </div>
            
        </div>
        <div style={{height:'65%',paddingLeft:'10%'}}>
            <div style={{
                fontSize:14,textAlign:'left',
                paddingTop:'0',
                paddingLeft:'25px',
                paddingRight:'20px'
                }}>
            
                <span style={{fontWeight:500}}>
                    {post?.introduction}
                </span>

            </div>
            <div className="post-picture">
                <img src={base_url + post?.postImage[0]}  />
            </div>

            
            <div style={{marginBottom:0,flexDirection:'row',display:'flex',padding:10,paddingBottom:0,paddingLeft:20,paddingRight:20}} >
                
            </div> 
            

            <div className='post-bottom' style={{paddingLeft:20,paddingRight:20,marginBottom:0,display:'flex',alignItems:'center'}}>
                
                <img  style={{width:32,height:32,borderRadius:'20px',marginRight:10}} 
                src={require('../../assets/icon.png')} />
                <TextInput 
                    style={{borderRadius:20,width:'60%',marginRight:10}} 
                    placeholder={'say somthing...'} 
                />
                <div className='interaction-container' style={{display:'flex',justifyContent:'space-between',flex:1,paddingLeft:'5%'}}>
                    <div className='post-like' style={{display:'flex',flexDirection:'column',marginRight:0,cursor:'pointer'}}>
                        <LikeOutlined style={{fontSize:16}} />
                        <span /* style={{fontSize:'12px'}} */>  {post?.likeCount} </span>
                    </div>
                    <div className='post-comment' style={{display:'flex',flexDirection:'column',cursor:'pointer',marginRight:0}}>
                        <CommentOutlined  style={{fontSize:16}} />
                        <span /* style={{fontSize:'12px'}} */>  {commentCount} </span>
                    </div>
                    <div className='post-share' style={{display:'flex',flexDirection:'column',cursor:'pointer',marginRight:0}}>
                        <RetweetOutlined  style={{fontSize:16}} />
                        <span /* style={{fontSize:'12px'}} */>  43 </span>
                    </div>
                </div>
            </div>
        </div>

        <div style={{width:'100%',position:'absolute',bottom:0,paddingLeft:0,paddingRight:0,marginBottom:5}}>
            <div style={{height:1,width:'100%',backgroundColor:"#F4F4F4"}}></div>
        </div>


    </div>
  )
}
