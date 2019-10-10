import React,{useState,useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './header'
import Main from './main'
import Sider from './sider'
import Login from './login'

import './index.css';
function MainView(props){
    return (
        <div>
        <Header prop={props}/>
            <div className="main-content">
                <Sider/>
                <Main />
            </div>
        </div>
    )
}
function LoginView(props){
    return (
    <div className="login">
        <Login prop={props}/>
    </div>
    )
}
function App(){
    return (
            <div className="Main">
                <BrowserRouter>
                   <Route path='/manageSystem' component={MainView}></Route>
                   <Route path='/login' component={LoginView}></Route>
                </BrowserRouter>
            </div>
    )
}
export default App;