import React, { useContext, useEffect,useState } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { MyContext } from '../routeStore'
import { Tabs,Table,Icon,Drawer, Form, Button, Col, Row, Input, Select, DatePicker,Radio  } from 'antd'
import axios from 'axios';

import PermissionForm from './dynamicForm'
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

function Certificate(props){
    const [certificateData,setcertificateData] = useState([]);
    const [permissionData,setpermissionData] = useState([]);
    const [visible,setVisible] = useState(false);
    const [content,setContent] = useState("");
    const [certificatePermission,setCertificatePermission] = useState([]);
    const [formFields,setFormFields] = useState([]);
    const path = props.match.path;
    const store = toJS(useContext(MyContext));
    const time = +new Date();
    useEffect(()=>{
        store.setRountName(path);
        getData();
    },[]);
    function openDrawer(record){
        setVisible(true);
        const content = (
            <div>
            { JSON.stringify(record) }
            </div>
        );
        setContent(content);
    }
    function onClose(){
        setVisible(false)
    }
    function getData(){
        axios.get("http://localhost:3000/cluster/getCertificateList").then((res)=>{
            setcertificateData(res.data.list);
        });
        axios.get("http://122.51.41.28:3000/cluster/permissionAllocationList").then((res)=>{
            setpermissionData(res.data.list);
        });
    }
    function getRestDays(expiryDate){
        return Math.floor((new Date(expiryDate).getTime() - time )/86400000)
    }
    function handleFormChange(changedFields){
        setFormFields(
          { ...formFields, ...changedFields },
        );
      };
    return (
        <div className="Certificate">
            <div className="tabs">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="证书列表" key="1">
                        <Table dataSource={certificateData}>
                            <Column 
                                title="证书名称" 
                                dataIndex="certificateName" 
                                render={(text,record)=>{
                                    return (
                                        <div 
                                            style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}
                                        >
                                            <span>{text}</span> 
                                            <Icon 
                                                type="more" 
                                                onClick={()=>{
                                                    //打开详情
                                                    setCertificatePermission(record);
                                                    openDrawer(record);
                                                }}
                                            >
                                            </Icon>
                                        </div>
                                    );
                                }}
                            >
                            </Column>
                            <Column title="域名地址" dataIndex="domainNameAddress"></Column>
                            <Column 
                                title="有效期" 
                                dataIndex="expiryDate" 
                                render={(text,record)=>{
                                    return '还剩'+getRestDays(text,record)+'天'
                                }}
                            >
                            </Column>
                        </Table>
                    </TabPane>
                    <TabPane tab="权限分配" key="2">
                        <Table dataSource={permissionData}>
                            <Column 
                                title="用户名" 
                                dataIndex="userName" 
                                render={(text,record)=>{
                                    return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>{text}</span> <Icon type="more" onClick={openDrawer}></Icon></div>
                                }}
                            >
                            </Column>
                            <Column title="登录名" dataIndex="loginName"></Column>
                            <Column title="项目角色" dataIndex="projectRoles"></Column>
                            <Column 
                                title="添加时间" 
                                dataIndex="timeAdded" 
                                render={(text,record)=>{
                                    return <div>{text.slice(0,10)}</div>
                                }}
                            >
                            </Column>
                        </Table>
                    </TabPane>
                </Tabs>
            </div>
            <div className="drawer">
                <Drawer
                    title="权限管理"
                    width={380}
                    onClose={onClose}
                    visible={visible}
                >
                    <PermissionForm onChange={handleFormChange}></PermissionForm>
                    <div>{JSON.stringify(formFields,null,2)}</div>
                </Drawer>
            </div>
        </div>
    )
}
export default observer(Certificate)