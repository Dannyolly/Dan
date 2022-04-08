import LeftIconButton from '../LeftIconButton/LeftIconButton'
import React, { useState } from 'react'
import './style.scss'
import {
  MessageOutlined,
  NotificationOutlined,
  HomeOutlined ,
  FileMarkdownOutlined ,
  ProfileOutlined,
  MoreOutlined ,
  SettingOutlined, 
  SendOutlined
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import Logo from '../Header/Logo';
import { fullStyle, middleStyle } from '../../constant/style';
import { pagesStore } from '../../store/pages';
import { options } from '../../constant/table';
import { useNavigate } from 'react-router';
import { getDimension, getPlatform } from '../../utils';
import { GrSend } from 'react-icons/gr'
import Publish from '../Publish/Publish';
import { modalHeight } from '../../constant/publish';
const LeftTable = (  )=>{
  
  const navigate = useNavigate()
  const platForm = getPlatform()
  
  const [isVisible, setIsVisible] = useState(false)

  const onClick = (number)=> {
    pagesStore.setCurrentPage(options[number])
    navigate(options[number],{
      
    })
  }
  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };
  console.log(getDimension().height * 0.7);
  return (
    <div className="left-real-container">
          
          <Logo />
          <LeftIconButton 
            text='Home' 
            onClick={()=>onClick(0)}
            IconRender={<HomeOutlined  style={{
              fontSize:'180%',
              marginRight:'0px',
              width:'80%',
              height:'80%'
            }} />}
            />
            <LeftIconButton 
          text='Message' 
          onClick={()=>onClick(1)}
          IconRender={<MessageOutlined style={{
            fontSize:'180%',
              marginRight:'0px',
              width:'80%',
              height:'80%'
          }} />}
          />
          <LeftIconButton 
          onClick={()=>onClick(2)}
            text='Notification' 
            iconName='notification'
            IconRender={<NotificationOutlined  
              style={{
                fontSize:'180%',
              marginRight:'0px',
              width:'80%',
              height:'80%'
              }}/>
            }
          />
          
          
          <LeftIconButton 
          onClick={()=>onClick(3)}
          text='Mark' 
          IconRender={<FileMarkdownOutlined  style={{
            fontSize:'180%',
              marginRight:'0px',
              width:'80%',
              height:'80%'
          }} />}
          />
          <LeftIconButton 
          onClick={()=>onClick(4)}
          text='Profile' 
          IconRender={<ProfileOutlined   style={{
            fontSize:'180%',
              marginRight:'0px',
              width:'80%',
              height:'80%'
          }} />}
          />
          <LeftIconButton 
          onClick={()=>onClick(5)}
          text='More' 
          IconRender={<MoreOutlined   style={{
              fontSize:'180%',
              marginRight:'0px',
              width:'80%',
              height:'80%'
          }} />}
          />
          <LeftIconButton 
         onClick={()=>onClick(6)}
            text='Setting' 
            IconRender={<SettingOutlined   style={{
                fontSize:'180%',
                marginRight:'0px',
                width:'80%',
                height:'80%'
            }} />}
            />
           
          <div  className='other-icon' style={{width:'100%',alignItems:'center',justifyContent:'flex-start',paddingLeft:'15px'}}>
              <Button onClick={()=>setIsVisible(()=>true)} style={{width:'80%'}} type="primary" shape="round"  size={'large'}>
                Dan !
              </Button>
          </div>

          <div className='ipad-icon' style={{alignItems:'center',justifyContent:'center'}}>
              <Button onClick={()=>setIsVisible(()=>true)} style={{width:'40%'}} type="primary" shape="round"  
              size={'large'} 
              >
                <div style={{...fullStyle,position:'absolute',left:0,top:0,...middleStyle,color:'white'}}>
                  <SendOutlined />
                </div>
              </Button>
          </div>
          
          <Modal  bodyStyle={{borderRadius:20,height:modalHeight[getPlatform()].height }} visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
              <Publish minRows={2} onUploadNewPost={p=>null} />
          </Modal>

            

        </div>
  )
}

export default function index() {
  return (
    <div className='left-container'>
        <div className='mobile-logo'>
              <Logo />
        </div>
        <LeftTable />
        <div className="left-container-border"/>
        
    </div>
  )
}
