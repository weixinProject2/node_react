/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import {Table,Button,message} from 'antd'
import Axios from 'axios';
function invoiceIssued(){
    const [dataSource,setDataSource]=useState([]);
    const [addedData,setAddedData] = useState([]);
    const [selectedRows,setSelectedRows] = useState([]);
    useEffect(()=>{
        getData();
    },[]);
    function getData(){
        Axios.get('http://localhost:3000/getOrderList').then((res)=>{
            setDataSource(res.data.list)
        })
    }
    
    /*表格列 */
    const columns = [
        {
            title:'项目编码',
            dataIndex:'projectNum'
        },
        {
          title: '客户名',
          dataIndex: 'custormName',
        },
        {
          title: '房源名称',
          dataIndex: 'houseSouce',
        },
        {
          title: '支付方式',
          dataIndex: 'paymentDesc',
        }
      ];
    function addRow(){
        const id =dataSource.length + 1;
        const random1 = Math.floor(Math.random()*3+1);
        const random2 = Math.floor(Math.random()*3+1);
        let paymentDesc,paymentCode;
        let houseSouce;
        if (random1 === 1)
        {
             paymentDesc = '支付宝';
             paymentCode = 'zhifubao'
        } else if (random1 === 2)
        {
             paymentDesc = '微信';
             paymentCode = 'weixin';
        } else {
             paymentDesc = 'pos转账';
             paymentCode = 'POS';
        }
        if (random2 === 1)
        {
            houseSouce = '蒙古大草原';
        } else if (random2 === 2)
        {
            houseSouce = '呼伦贝尔';
        } else {
            houseSouce = '俄罗斯美女';
        }
        const oneData = {
            'id': id,
            'projectNum':'0A110B',
            'custormName':'新增用户名称',
            'houseSouce':houseSouce,
            'paymentCode':paymentCode,
            'paymentDesc':paymentDesc,
        }
        dataSource.unshift(oneData);
        addedData.push(oneData);
        setDataSource([...dataSource]);
        setAddedData([...addedData]);
    }
    function saveRow(){
        console.log(addedData);
        Axios.post(
            'http://localhost:3000/createOrderList',{
                params:addedData
            }
        ).then((res)=>{
            setDataSource([...res.data.list]);
            message.success("保存成功");
            setAddedData([]);
        })
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows([...selectedRows]);
        },
        // getCheckboxProps: record => ({
        //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //   name: record.name,
        // }),
    };
    function deleteRows(){
       const deleteRows =selectedRows; 
       if(deleteRows.length===0){
           message.warning("请勾选数据");
           return;
       }
       Axios.post(
           'http://localhost:3000/deleteOrderList',{
            params:deleteRows
           }
       ).then((res)=>{
            setDataSource(res.data.list)
            message.success("删除成功");
       })
    }
    return (
        <div>
            <div className="table-operations">
                <Button type="primary" onClick={addRow}>新增</Button>
                <Button type="primary" onClick={saveRow}>保存</Button>
                <Button type="primary" onClick={deleteRows}>删除</Button>
                <Button type="primary">修改</Button>
            </div>
            <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} rowKey={record=>record.id} scroll={{y:350}}/>;
        </div>
    )
}
export default invoiceIssued;