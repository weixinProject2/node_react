/* eslint-disable react-hooks/rules-of-hooks */
import React,{ useEffect, useState } from 'react'
import { Avatar,Popover,Button } from 'antd'

import './index.css'

function msHeader(props){
    const [username,setUserName] = useState('');
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUserName(userInfo.userName);
    },[])
    function exitLogin(){
        localStorage.clear();
        props.prop.history.replace('/login');
    }
    const content = (
        <div>
            <p>当前登录用户:{username}</p>
            <Button onClick={exitLogin}>退出登录</Button>
        </div>
    )
    return (
        <div className="header-main">
            <Popover content={content} trigger="hover">
                <Avatar className="headerAvatar" src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'></Avatar>
            </Popover>
        </div>
    )
}
export default msHeader;