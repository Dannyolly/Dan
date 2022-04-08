import { middleStyle } from '../../../constant/style'
import React from 'react'
import './Advertisement.scss'
export default function Advertisement() {
  return (
    <div className='advertisement-container' style={{display:'flex',paddingLeft:10}}>
      <img  
        style={{
          width:'40%',
          maxWidth:80,
          height:'100%',
          borderRadius:5,
          marginRight:10,
          objectFit:'cover'
        }}
      
      
      src={require('../../../assets/post.png')} />
      <div style={{...middleStyle,flexDirection:'column'}}>
        <div style={{fontSize:'14px',fontWeight:500}}>Dead by Daylight</div>
        <div style={{fontSize:'5px'}}>DeadbyDaylight.com</div>
      </div>
    
    </div>
  )
}
