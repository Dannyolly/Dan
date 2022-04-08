import React from 'react';
import { Outlet,Link,NavLink,useRoutes} from 'react-router-dom';
import './style.scss'
import LeftContent from '../../components/LeftContent/index'
import routes from '../../routes';
import RightContent from '../../components/RightContent/RightContent';
const MainContent = () => {
    const route = useRoutes(routes)
    return (
        <div className='main-content-container'>
                <LeftContent  />
            {
                route
            }
            <div style={{width:0.5,height:'100%',backgroundColor:"#F4F4F4"}}>

            </div>
                <RightContent />
        </div>
    );
}

export default MainContent;
