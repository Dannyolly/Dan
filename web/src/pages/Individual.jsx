import { message } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { userStore } from '../store/user';

const Individual = (props) => {
  const { state } = useLocation()
  const messsages = message.useMessage()
  
  console.log(userStore.userInfo);
  return (
    <div  onClick={()=>{
      userStore.setUserInfo({
        name:'danny'
      })
    }} >
      {state.mystate}
      <div>
        { userStore.userInfo!==undefined?userStore.userInfo.name:'undefined'}
      </div>
    </div>
  );
}

export default observer(Individual);

