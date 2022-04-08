import About from '../pages/About';
import Base from '../pages/Base';
import MainContent from '../pages/MainContent/MainContent'
import Individual from '../pages/Individual';
import Home from '../pages/Home/Home';
import Message from '../pages/Message/Message';
import App from '../App';
import Notification from '..//pages/Notification/Notification';
import Mark from '..//pages/Mark/Mark';
import More from '..//pages/More/More';
import Setting from '..//pages/Setting/Setting';
import Profile from '../pages/Profile/Profile';
/* const routes = [
    {
        path:'/',
        element:<Base/>
    },
    {
        path:'/home',
        element:<Home/>,
        children:[
            {
                path:'individual',
                element:<Individual/>
            }
        ]
    },
    {
        path:'/about',
        element:<About/>
    }
    
] */

const routes = [
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'Home',
        element:<Home/>,
    },
    {
        path:'Message',
        element:<Message/>
    },
    {
        path:'Notification',
        element:<Notification/>
    },
    {
        path:"Profile",
        element:<Profile/>
    },
    {
        path:'Mark',
        element:<Mark/>
    },
    {
        path:'More',
        element:<More/>
    },
    {
        path:'Setting',
        element:<Setting/>
    }
    
    
]


export default routes