import React,{useState,useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Form, Row, Col,Tree, Input, Button, Icon,DatePicker,Popover } from 'antd';

import Header from './header'
import Main from './main'
import Sider from './sider'
import Login from './login'
import axios from 'axios'

import './index.css';
function App(props){
    const [loginState,setLoginState]=useState(false);
    function login(){
        setLoginState(true);
    }
    return (
            
            <div className="Main">
                {loginState?
                <div>
                    <Header/>
                    <div className="main-content">
                        <BrowserRouter>
                            <Sider/>
                            <Route path='/' component={Main}></Route>
                        </BrowserRouter>
                    </div>
                </div>:
                    <div className="login">
                        <Login login={login} />
                    </div>
                }
            </div>
    )
}
export default App;