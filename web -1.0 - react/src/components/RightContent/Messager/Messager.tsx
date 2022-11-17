import { middleStyle } from '../../../constant/style'
import React from 'react'
import './Messager.scss'
export default function Messager() {
  return (
    <div style={{height:40}} className='messager-container'>
        
        <div style={{width:'auto',height:'100%',...middleStyle}} 
        className="messager-real-container">
          <img 
          src={require('../../../assets/icon.png')} 
          alt="" 
          />
          <div className='online'>

          </div>
          <div className="name">Danny</div>
        </div>
    </div>
  )
}
