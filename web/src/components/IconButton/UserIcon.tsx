import { middleStyle } from '../../constant/style'
import React, { CSSProperties } from 'react'

interface UserIconProps{
    url?:string
    style?:CSSProperties
}

export default function UserIcon(props:UserIconProps) {
  
  const { url , style } = props
    return (
    <div style={{
            ...middleStyle,
            width:'35px',
            height:'35px',
            cursor:'pointer',
            ...style,
            position:'relative'
        }}>
            {
                url!==undefined?
                <img src={url} 
                    style={{width:'100%',height:'100%',borderRadius:'20px'}}
                />
                : 
                <img src={require('../../assets/icon.png')} 
                    style={{width:'100%',height:'100%',borderRadius:'20px'}}
                />
            }
        
    </div>
  )
}
