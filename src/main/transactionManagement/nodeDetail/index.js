/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table ,message ,Form ,  Row, Col,Input} from 'antd'

import './index.css'
const columns = [
    {
      title: '项目分期',
      dataIndex: 'projectNum',
      render: text => <a>{text}</a>,
    },
    {
      title: '客户名称',
      dataIndex: 'custormNames',
    },
    {
      title: '房源',
      dataIndex: 'houseSouce',
    },
    {
        title: '付款代码',
        dataIndex: 'paymentCode',
    },
    {
        title: '付款方式',
        dataIndex: 'paymentDesc',
    },
  ];

function nodeDetail(){
    const [tableData,setTableData] = useState([]);
    const [disableSave,setDisableSave] = useState(true);
    const [selectedRow,setSelectRow] = useState([]);
    const [houseSouce,setHouseSouce] = useState('');
    const [paymentMethod,setPaymentMethod] = useState('');
    const [paymentCode,setPaymentCode] = useState('');
    useEffect(()=>{
        getData()
    },[]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectRow(selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
    function addNewData(){
        const random1 = Math.floor(Math.random()*3+1);
        const random2 = Math.floor(Math.random()*3+1);
        let paymentDesc,paymentCode;
        let houseSouce;
        if (random1 === 1)
        {
             paymentDesc = '支付宝';
             paymentCode = 'zhifubao'
        } else if (random1 === 2)
        {
             paymentDesc = '微信';
             paymentCode = 'weixin';
        } else {
             paymentDesc = 'pos转账';
             paymentCode = 'POS';
        }
        if (random2 === 1)
        {
            houseSouce = '蒙古大草原';
        } else if (random2 === 2)
        {
            houseSouce = '呼伦贝尔';
        } else {
            houseSouce = '俄罗斯美女';
        }
        const oneData = {
            'projectNum':'0A110B',
            'custormNames':'新增用户名称',
            'houseSouce':houseSouce,
            'paymentCode':paymentCode,
            'paymentDesc':paymentDesc,
        }
        tableData.unshift(oneData);
        const newTableData = [...tableData];
        setDisableSave(false);
        setTableData(newTableData);
    }
    function saveData(){
        const tablelist = tableData[0];
        axios.post('http://localhost:3000/createTableList',tablelist).then((res) => {
            message.success('保存成功',3);   
            getData();
        })
    }
    function deleteData(){
        if (selectedRow.length === 0) {
            message.error('请选择需要删除的数据',3);   
            return;
        }
        const deleteData = selectedRow[0]
        axios.post('http://localhost:3000/deleteTableList',deleteData).then((res) => {
            message.success('删除成功',3);   
            getData();
            setSelectRow([]);
        })
    }
    function handleSearch(){
        getData();
    }
    function changeHouseSource(e){
       setHouseSouce(e.target.value);
    }
    function changePaymentMethod(e){
        setPaymentMethod(e.target.value);
    }
    function changePaymentCode(e){
        setPaymentCode(e.target.value);
    }
    function getData(){
        const data = {
            houseSouce,
            paymentCode,
            paymentMethod
        }
        axios.post('http://localhost:3000/getPaymentList',{...data}).then((res) => {
            setTableData(res.data.list);
        })
    }
    return (
        <div className="mainBox">
            <Form style={{marginBottom:20}} className="ant-advanced-search-form">
                <Row gutter={24}>
                    <Col span={8} key="4" style={{ display:'block' }}>
                        <Form.Item label="房源">
                        <Input  value={houseSouce} onChange={changeHouseSource}/>
                        </Form.Item>
                    </Col>
                    <Col span={8} key="6" style={{ display:'block' }}>
                        <Form.Item label="付款代码">
                        <Input value={paymentCode} onChange={changePaymentCode} />
                        </Form.Item>
                    </Col>
                    <Col span={8} key="5" style={{ display:'block' }}>
                        <Form.Item label="付款方式">
                        <Input value={paymentMethod} onChange={changePaymentMethod} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button  type="primary"  onClick={handleSearch}>
                    查询
                    </Button>
                </Col>
                </Row>
            </Form>
            <Button type="primary"  onClick={addNewData} style={{marginLeft:30,marginRight:30}}>新增</Button>
            <Button type="primary" disabled={disableSave} onClick={saveData} style={{marginRight:30}}>保存</Button>
            <Button type="primary" onClick={deleteData} style={{marginRight:30}}>删除</Button>
            <div className="table">
                 <Table style={{marginTop:10}} rowKey={record =>record.id } scroll={{y: 350 }} rowSelection={rowSelection} columns={columns} dataSource={tableData} />
            </div>
        </div>
    )
}
export default nodeDetail;