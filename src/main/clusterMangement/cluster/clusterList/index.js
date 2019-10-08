/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useContext } from 'react';
import {  } from 'react-router-dom'
import { toJS } from 'mobx'
import axios from 'axios'
import { Menu,Input, Icon } from 'antd';

import { MyContext } from '../clusterStore'
import './index.css';
const { SubMenu }  = Menu;
const ClusterList= (props) =>{
    const store = toJS(useContext(MyContext));
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
            store.setCluster(data[0]);
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
    function subMenuClick(item){
        const title = item.title;
        store.setCluster(item);
    //     props.props.history.push({
    //         pathname:'/clusterMangement/cluster/clusterDeatil/',
    //         query:{
    //         title:title,
    //     },
    // });
        props.props.history.push('/clusterMangement/cluster/clusterDeatil/'+`${title}`)
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
                        onTitleClick={()=>subMenuClick({...item})}
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