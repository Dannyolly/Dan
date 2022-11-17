import React, { CSSProperties } from 'react'
import IconButton from '../IconButton/index'
interface BaseIconProps{
  logoName?:string,
  style?:CSSProperties,
  onClick?:()=>void
}
export default function Logo(props:BaseIconProps) {
  return (
          <IconButton 
              onClick={props.onClick}
              containerStyle={{
                width:'35px',
                height:'35px',
                justifyContent:'center',
                alignItems:'center',
                display:'flex',
                borderRadius:'25px',
                backgroundColor:"rgba(228,230,235)",
                ...props.style,
                cursor:'pointer'
              }} 
              logoStyle={{fontSize:'15px',color:'black'}} 
              logoName={props.logoName} 
          />
  )
}
