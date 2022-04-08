import React from 'react'
import './style.scss'
import Icon from '../Icon/Icon'
import {
  MessageOutlined,
  NotificationOutlined 
} from '@ant-design/icons';
import { middleStyle } from '../../constant/style';
interface LeftIconButtonProps {
    text?:string,
    iconName?:string,
    IconRender?:JSX.Element
    onClick?:()=>void
}


export default function LeftIconButton(props:LeftIconButtonProps) {

  const { text , iconName ,IconRender , onClick} = props

  return (
    <div onClick={onClick} className='left-icon-container' >
        <div className='hover-container'>
          <div className='left-icon-real-container' 
          style={{...middleStyle}}>
            
            {IconRender}
          </div>
          <div className='icon-text' style={{
            fontSize:'130%',
            fontWeight:'500',
            paddingBottom:'1px'
          }}>{ text }</div>
        </div>
    </div>
  )
}
