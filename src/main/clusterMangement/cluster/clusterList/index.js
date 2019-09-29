/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Menu,Input, Icon } from 'antd';

import './index.css';
const { SubMenu }  = Menu;
const ClusterList= (props) =>{
    const [rootSubmenuKeys,setRootSubmenuKeys] = useState([]);
    const [openkeys,setOpenKeys] = useState(['1']);
    const [nodeList,setNodeList] = useState([]);
    useEffect(()=>{
        clusterNodeList();
    },[])
    function clusterNodeList(){
        axios.post('http://localhost:3000/cluster/getNodeList').then(res=>{
            const data = res.data.data
            setNodeList(data);
            setrootSubmenuKeys(data);
        })
    }
    function setrootSubmenuKeys(data){
        const newData = [];
        data.map(item=>{
            newData.push(String(item.key))
        })
        setRootSubmenuKeys(newData);
    }
    const onOpenChange = (openkey) =>{
        const lastOpenKey = openkey.find(key => openkeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(lastOpenKey) === -1) {
            setOpenKeys(openkey);
        } else {
            setOpenKeys(lastOpenKey ? [lastOpenKey] : []);
        }
    }
    return (
        <div className="clusterList">
           <Input
              placeholder="请输入搜索条件"
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
           />
           <Menu
                mode="inline"
                openKeys={openkeys}
                onOpenChange={onOpenChange}
                style={{ width: "100%" }}
            >
              {
                  nodeList.map(item=>{
                      return (
                        <SubMenu
                        key={item.key}
                            title={
                                <span>
                                <span>{item.title}</span>
                                </span>
                            }
                        >
                            {
                                item.children.map(items=>{
                                    return(
                                    <Menu.Item key={items.key}> <Icon type="smile" /> {items.title}</Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                      )
                  })
              }
            </Menu>
        </div>
    )
}
export default ClusterList;