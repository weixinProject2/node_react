
/* eslint-disable default-case */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useContext,useReducer } from 'react';
import {  } from 'react-router-dom'
import { toJS } from 'mobx'
import axios from 'axios'
import { Menu,Input, Icon,Popover,Button,Drawer,Popconfirm, message,List } from 'antd';


import { MyContext } from '../clusterStore'
import './index.css';
const { SubMenu }  = Menu;
const ClusterList= (props) =>{
    const store = toJS(useContext(MyContext));
    const [rootSubmenuKeys,setRootSubmenuKeys] = useState([]);
    const [openkeys,setOpenKeys] = useState(['1']);
    const [nodeList,setNodeList] = useState([]);

    const [stateDrawer,setStateDrawer] = useState(false);
    const [clusterId,setclusterId] = useState('');
    const init = {
            title:'',
            clusterId:'',
            nodeList:[],
    }
    const [state, dispatch] = useReducer(reducer, init);
    function reducer(state, action) {
        switch (action.type){
            case 'SETDATA':
                return {
                    ...action.payload
                }
            default:
                return state;
        }
    }
    const content = (
        <div>
          <Button onClick={modifyCluster}>修改集群</Button>
          <br></br>
          <Popconfirm
            title="是否确定删除该集群?"
            onConfirm={confirm}
            okText="是"
            cancelText="否"
          >
          <Button onClick={deleteCluster}>删除集群</Button>
          </Popconfirm>
        </div>
      );
    useEffect(()=>{
        clusterNodeList();
    },[])
    const showDrawer = () => {
        setStateDrawer(true);
      };
    const onClose = () => {
        setStateDrawer(false);
      };
      function confirm(e) {
        message.success('删除成功');
      }
      
    function modifyCluster(){
        showDrawer();
    }
    function deleteCluster(){
        // showModal();
        console.log(state);
    }
    function clusterNodeList(){
        axios.post('http://localhost:3000/cluster/getNodeList').then(res=>{
            const data = res.data.data
            console.log(data);
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

        store.setCluster(item);
        const path = props.props.match.path;
        const title = item.children[0].sub
        const reducerState = { title: item.title, clusterId:item.clusterId,nodeList:item.children }
        setclusterId(item.clusterId);
        dispatch({ type:'SETDATA',payload:reducerState })
        props.props.history.push(`${path}/clusterDeatil/`+`${title}`)
    }
    function hanldeDeleteNode(id){
        axios.post('http://localhost:3000/cluster/clusterDeleteNode',{nodeId:id}).then(() => {
                clusterNodeList();
                console.log(nodeList);
                nodeList.map(item=>{
                    if (item.clusterId === clusterId) {
                        const reducerState = { title: item.title, clusterId:item.clusterId,nodeList:item.children }
                        console.log(reducerState);
                        dispatch({ type:'SETDATA',payload:reducerState })
                    }
                })
                message.success('删除成功');
        })
       
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

                             <Popover placement="bottom" content={content} trigger='click'>
                                 <Icon style={{cursor: 'pointer', position: 'absolute',top: '30%',right:'10px'}} type="more" />
                            </Popover>,

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

            <Drawer
                title={`修改集群 ------------ ${state.title}`}
                placement="right"
                width='500'
                onClose={onClose}
                closable={false}
                visible={stateDrawer}
                >
                <List
                    header={<div>该集群下的所有节点</div>}
                    bordered
                     dataSource={state.nodeList}
                    renderItem={item => 
                    <List.Item>
                        <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                            <span>节点名：{item.title}</span>
                            <Icon onClick={()=>hanldeDeleteNode(item.nodeId)} type="close" style={{cursor:'pointer'}}/>
                        </div>
                    </List.Item>}
                />
                <div style={{color:'rgb(255,142,0)',cursor:'pointer',marginTop:'20px'}}>
                <Icon type="plus" />
                添加节点</div>
                <Button style={{ position:'absolute',bottom:'10px',left:'30px'}} type='primary'>确定</Button>
                <Button style={{ position:'absolute',bottom:'10px',left:'100px' }}>取消</Button>
            </Drawer>
        

        </div>
    )
}
export default ClusterList;