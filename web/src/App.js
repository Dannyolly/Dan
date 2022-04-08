
import { Route,Routes,Link ,useNavigate,useRoutes } from 'react-router-dom';
import './App.scss';
import routes from './routes';
import HomeHeader from './components/Header/home'
import MainContent from './pages/MainContent/MainContent';
import { useEffect, useState } from 'react';
import { UserHandler } from './Handler/UserHandler';
import { CURRENT_USER_INFO } from './constant/storageKey';
import Splash from './pages/Splash/Splash';
import Login from './pages/Login/Login';
import { Modal } from 'antd';
import { fullStyle } from './constant/style';
import { observer } from 'mobx-react';
import { userStore } from './store/user';

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [userArr, setUserArr] = useState([]);
  
  const checkOutUserInformation = () =>{
    

    setTimeout(()=>{
      setIsChecked(()=>true)
    },1000)
  }

  useEffect(() => {
    checkOutUserInformation()
  }, []);


  return (
    <div className="App">
      {
        !isChecked?
        <Splash/>
        :
        <div style={{...fullStyle}} >
            {
              userStore.isLogin === true?
              <div style={{...fullStyle}}>
                <HomeHeader />
                <MainContent />
              </div>
              :
              <Login />
            }
        </div>
      }
    </div>
  );
}

export default observer(App);
