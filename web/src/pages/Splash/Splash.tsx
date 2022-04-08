import { middleStyle } from '../../constant/style'
import React from 'react'
import { Spin, Space } from 'antd';

export default function Splash() {
  return (
    <div style={{...middleStyle,width:'100%',height:'100%',flexDirection:'column'}}>
        <img className='splash-icon' width={'7%'} height={'auto'} 
        src={require('../../assets/home.png')} />
        {/* <div style={{paddingTop:'2%'}}>
          <Spin size='large' tip="Loading..." />
        </div> */}
    </div>
  )
}
