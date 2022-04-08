import React, { CSSProperties, useEffect, useState } from 'react'
import { Button, Input, message, Upload } from 'antd'


import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


import './style.scss'
import {
  PictureOutlined,
  SmileOutlined ,
  LinkOutlined 
} from '@ant-design/icons';
import { getPlatform } from '../../utils';
import { uploadIcon } from '../../service/user';
import axios from 'axios';
import { uploadPost } from '../../service/post';
import { userStore } from '../../store/user';
import { Post } from '@/Model/post';

interface PublishProps {
  textAreaStyle?: CSSProperties | undefined,
  minRows?:number,
  onUploadNewPost:(post:Post)=>void;
}
const baseTextAreaStyle = {
    border:0,
    fontSize:'18px',
    height:'90%',
    fontWeight:500,
    marginBottom:40
}

export default function Publish( props : PublishProps ) {
  const { textAreaStyle , minRows , onUploadNewPost } = props
  const { TextArea } = Input
  const [value, setValue] = useState('')
  const [isWindows, setIsWindows] = useState<boolean>(getPlatform()==='windows')
  const [fileList, setFileList] = useState<File[] >([])
  const [imageUrl, setimageUrl] = useState<string[] | undefined   >()

  
  
  const cancelPic = (index) =>{
    
    if(imageUrl!==undefined) {
      let imageTemp = [...imageUrl]
      imageTemp  = imageTemp.filter((value,i, arr)=> i !== index)
      setimageUrl(()=>imageTemp)

      let fileListTemp = [...fileList];
      fileListTemp = fileListTemp.filter((value,i,arr)=>i !== index)
      setFileList(()=>fileListTemp)

      console.log(imageTemp);
    }
    
  }

  const onDownload = (e) =>{
    let file = e.target.files[0]
    console.log(file,e.target.files);
   
    if (window.FileReader) {    
      var reader = new FileReader();    
      if(file){
        setFileList(()=>[...fileList,file])
        console.log(fileList);

        
          reader.readAsDataURL(file);    
          //监听文件读取结束后事件    
            reader.onloadend = function (e) {

              
              imageUrl!==undefined ?
              // @ts-ignore
                    setimageUrl(()=>[...imageUrl , e.target?.result])
                    :
              // @ts-ignore
                    setimageUrl(()=>[e.target?.result])
              
              
              /* axios({
                  method: 'POST',
                  url: '/upLoadIcon',
                  baseURL: 'http://dandan.ihk.vipnps.vip/',
                  data: param,
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  }
              }).then(res=>{
                console.log(res.data);
              }) */
          }
      };    
   } 
  }

  const onSubmit = (e) =>{
    console.log(fileList,userStore.userInfo?.id,value);
    uploadPost(fileList,String(userStore.userInfo?.id),value).then(res=>{
        if( res.data.msg === '文章上傳成功' ){
            message.info(`${res.data.msg} !`);
            const { msg , postId , postImage } = res.data
            onUploadNewPost( {
              id:postId,
              postImage:postImage,
              introduction:value,
              likeCount:0,
              postDate:new Date(),
              userId:userStore.userInfo?.id
            } );

            setValue('')
            setFileList([])
            setimageUrl([])
            
        }
    })
  }

  return (
    <div className='publish-container' 
    style={{display:'flex',position: 'relative',}}>
        <img 
            style={{width:'40px',height:'40px',borderRadius:'20px'}} 
            src={require('../../assets/icon.png')} 
        />
        <div className='publish-right-container' >
         
          <TextArea 
              value={value}
              onChange={v=>setValue(v.target.value)}
              placeholder="What's happening?" 
              autoSize={{ minRows: minRows!==undefined?minRows:1, maxRows: 10 }}
              bordered={false}
              
              style={{
                ...baseTextAreaStyle
              }}
          />
          <div  style={{width:'100%',height:1,background:"#F4F4F4",marginBottom:15}} />
          
          <div style={{display:imageUrl !== undefined ? 'flex':'none' ,position:'relative',justifyContent:'flex-start',flexDirection:'row',marginBottom:10}}>
              
              
              {
                  /*  上傳的圖片 */
                  imageUrl?.map((item,index)=>{
                    return (
                      <div className='post-pic-container' style={{position:'relative' , width:'auto', height:'auto'}}>
                        <div onClick={()=>cancelPic(index)} style={{position:'absolute',right:0,top:-5,
                        cursor:'pointer',width:20,height:20,borderRadius:10,backgroundColor:"rgb(93,160,241)",color:"#FFFFFF",fontSize:8}} >
                          x
                        </div>
                        <img  src={item} alt="" style={{width:80,height:80,borderRadius:5,objectFit:'cover',marginRight:10}} />
                      </div>
                    )
                  })
              }
          </div>  

          <div className='publish-bottom-container' >
              <label htmlFor="icon-button-file">
                <Input 
                style={{display:'none'}} 
                 accept="image/*" 
                 id="icon-button-file" 
                type="file" 
                onChange={onDownload} />
                <IconButton  
                style={{width:32,height:32,backgroundColor:"rgb(244, 244, 244)",marginRight:10}} 
                color="primary" 
                aria-label="upload picture" 
                component="span">
                  <PhotoCamera />
                </IconButton>

                
              </label>
               
       
            <div style={{display:isWindows?'flex':'none'}}>
              <Button 
              type='default'
              icon={<SmileOutlined />} 
              style={{border:0,backgroundColor:"#F4F4F4",borderRadius:20,marginRight:10}}>
                  emjio
              </Button>
            </div>
            <Button 
            type='default'
            icon={<LinkOutlined />} 
            style={{border:0,backgroundColor:"#F4F4F4",borderRadius:20,marginRight:10}}>
                Link
            </Button>
            <div style={{flex:1,display:'flex',justifyContent: 'flex-end',}}>
              <Button onClick={onSubmit} type='primary' style={{borderRadius:20}} >
                submit
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}
