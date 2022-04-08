import { Input ,InputProps } from 'antd'
import React, { CSSProperties, useState } from 'react'
interface TextInput extends InputProps {
  onChangeCallBack?:(value :string ) =>void,
  isPassword?:boolean
}
export default function TextInput(props:TextInput) {
  const [value, setvalue] = useState("")
  const { onChangeCallBack , isPassword } = props
 
    return (
      <>
      {
        !isPassword?
        <Input
          value={value} 
          onChange={v=>{
            setvalue(v.target.value)
            if(onChangeCallBack !== undefined){
              onChangeCallBack(v.target.value)
            }

          }} 
          {...props}
        />
        :
        <Input.Password
          value={value} 
          onChange={v=>{
            setvalue(v.target.value)
            if(onChangeCallBack !== undefined){
              onChangeCallBack(v.target.value)
            }

          }} 
          {...props}
        
        
        />
      }
      </>
    )
  
  
}
