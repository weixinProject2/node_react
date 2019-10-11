
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Table,Icon,Drawer } from 'antd'
import axios from 'axios';
import './index.css'
const ClusterNodeList = (props)=>{
    const columns = [
        {
          title: '节点',
          dataIndex: 'title',
          width:200,
          render:(text,{isReady})=>{
              let content = '';
              let color = '';
              if(isReady === 'Y') {
                content = 'Ready';
                color = '#57AAF8';
              } else {
                  content = 'Unready';
                  color = 'rgba(0,0,0,0.20)';
              }
              const style = {
                marginTop:-50,
                display:'table-cell',
                width:60,height:20,
                backgroundColor:`${color}`,
                textAlign:'center'
              }
              return(
                  <span> 
                    <span style={style}>
                        {content}
                    </span>
                    <span style={{display:'table-cell',verticalAlign:'center'}}>{text}</span>
                    <span style={{float:'right'}}>
                    <Icon onClick={handleAllocate} style={{cursor: 'pointer'}} type="more" />
                    </span>
                  </span>
              )
          }
        },
        {
          title: '类型',
          dataIndex: 'nodeType',
          width:200,
        },
        {
          title: 'CPU分配',
          width:200,
          dataIndex: 'CPUAllocate',
        },
        {
            title: '内存分配',
            width:200,
            dataIndex: 'memoryAllocation',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
      ];
      const [tableList,setTableList] = useState([]);
      const [visible,setVisiable] = useState(false);
      useEffect(()=>{
        const clusterName = props.clustername; // cluster3
        getData(clusterName);
      },[props])
      function getData(data){
        const clusterName = {
          'name':data
        }
        axios.post('http://122.51.41.28:3000/cluster/getNodeDetail',clusterName).then(res=>{
            setTableList(res.data.list)
        })  
      }
      const onClose = () => {
        setVisiable(false);
      };
      function handleAllocate(){
        setVisiable(true);
      }
    return (
        <div>
            <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
              </Drawer>
            <Table
            columns={columns}
            dataSource={tableList}
            scroll={{y: 290 }} 
            align='center'
            >

            </Table>
        </div>
    )
}
export default ClusterNodeList;