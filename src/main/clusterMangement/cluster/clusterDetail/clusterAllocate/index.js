import React, { useEffect, useState } from 'react';
import { Table, Icon } from 'antd';
import axios from 'axios';

import './index.css'

const ClusterAllocate = (props) =>{
    const columns = [
        {
          title: '用户名',
          dataIndex: 'userName',
          width:200,
          render:(text,record)=>{
              const role = record.projectRole;
              return (
                  <div>
                        {text}
                      {role === 'M'?<Icon onClick={handleAllocate} style={{cursor: 'pointer',float:'right'}} type="more" />:null} 
                  </div>
              )
          }
        },
        {
          title: '登录名',
          dataIndex: 'loginName',
          width:200,
        },
        {
          title: '项目角色',
          width:200,
          dataIndex: 'projectRoleDesc',
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
        },
      ];
    useEffect(()=>{
        getData();
    },[])
    const [tableList,setTableList] = useState([]);
    function handleAllocate(){
        
    }
    function getData(){
        axios.post('http://localhost:3000/cluster/getAllocationInfo').then(res=>{
            const list = res.data.list;
            setTableList(list);
    })
    }
    return (
        <div>
             <Table
            columns={columns}
            dataSource={tableList}
            scroll={{y: 290 }} 
            rowKey="id"
            align='center'
            >

            </Table>
        </div>
    )
}
export default ClusterAllocate;