import React, { CSSProperties } from 'react'
import {} from '@ant-design/icons'
import './button.scss'

interface IconButtonProps {
    containerStyle?:CSSProperties
    logoName?:string
    logoStyle?:CSSProperties,
    onClick?:()=>void
}

export default function index(props:IconButtonProps) {
    const { containerStyle , logoStyle ,logoName ,onClick}  = props
  
    return (
    <div onClick={onClick} className='button-container' style={{...containerStyle}}>
        <i className={'icofont-'+logoName} 
        style={{...logoStyle}} ></i>
    </div>
  )
}
