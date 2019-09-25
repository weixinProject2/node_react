import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header'
import Main from './main'
import Sider from './sider'

import './index.css';
function App(){
    return (
       
            <div className="Main">
                <Header/>
                <div className="main-content">
                    <BrowserRouter>
                          <Sider/>
                         <Route path='/' component={Main}></Route>
                    </BrowserRouter>
                </div>
            </div>
    )
}
export default App;