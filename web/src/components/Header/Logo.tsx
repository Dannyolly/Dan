import { middleStyle } from '../../constant/style'
import React from 'react'
import IconButton from '../IconButton/index'
import './logo.scss'
export default function Logo() {
  return (
    <div className='logo-container' >
        <div className='logo-real-container' >
          <img  src={require('../../assets/home.png')} />
          <div className="name" style={{
              
          }} >DanDan</div>
          
          {/* <div style={{...middleStyle}}>
            <IconButton 
                containerStyle={{
                  width:'35px',
                  height:'35px',
                  justifyContent:'center',
                  alignItems:'center',
                  display:'flex',
                  borderRadius:'25px',
                  backgroundColor:"rgba(228,230,235)"
                }} 
                logoStyle={{fontSize:'10px',color:'black'}} 
                logoName={'notification'} 
            />
          </div> */}
      </div>
    </div>
  )
}
