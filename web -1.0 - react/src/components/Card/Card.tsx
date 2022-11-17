
import { middleStyle } from '../../constant/style'
import React, { CSSProperties } from 'react'
import './style.scss'
interface Card {
    style?:CSSProperties,
    pic?:string ,
    name?:string,
    onClick?:()=>void
    cancelButtonOnClick?:()=>void
}
export default function Card(props:Card) {
  const { style ,pic ,name ,onClick, cancelButtonOnClick} = props
  return (
    <div onClick={onClick} style={style!==undefined?{...style}:undefined} className='card-container'>
        <div
        onClick={e=>{
            e.stopPropagation()
            if(cancelButtonOnClick!==undefined){
                cancelButtonOnClick()
            }
        }}
        className='cancel'
         style={{
             width:20,
             height:20,
             borderRadius:'50%',
             backgroundColor:"#FFFFFF",
             position: "absolute",
             left:5,
             top:5,
             fontSize:12,
             color:"#CDCDCD",
             ...middleStyle,
             fontWeight:'bolder',
             paddingBottom:1
         }}
         
        >  x    </div>
        <img style={{
            width:'100%',
            height:'80%',
            objectFit:'cover',
            borderTopLeftRadius:10,
            borderTopRightRadius:10
        }} src={pic} />
        <div 
         style={{fontSize:'140%',fontWeight:400,width:'100%',height:'20%',...middleStyle}}
        className="name">
            {name}
        </div>
        
    </div>
  )
}
