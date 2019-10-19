/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Input, Table, DatePicker  ,Modal , Radio,Form, Button, Upload, Icon, message } from 'antd';
import moment from 'moment';

import './index.css'

const { TextArea } = Input;
const columns = [
    {
      title: '公司/项目',
      dataIndex: 'companyProject',
      key: 'companyProject',
    },
    {
      title: '在职/参职时间',
      dataIndex: 'onWorkTime',
      key: 'onWorkTime',
      render: (text, record) => (
        <span>
            {record.startTime} - {record.endTime}
        </span>
      ),
    },
    {
      title: '职位/角色',
      dataIndex: 'positionRole',
      key: 'positionRole',
    },
    {
      title: '工作/项目描述',
      key: 'workDesc',
      dataIndex: 'workDesc',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <span>
            <a style={{ textDecoration:'none', marginRight:10 }}>编辑</a>
            <a style={{ textDecoration:'none' }}>删除</a>
        </span>
      )
    },
  ];
  const prjectData = [];
  
const resumenMan = (props)=>{
    
    const [loading,setLoading] = useState(false);
    const [imageUrl,setImageUrl] = useState('');
    const [sex,setSex] = useState('男');
    const [visiable,setVisiavle] = useState(false);

    const { form } = props;
    const { getFieldDecorator } = form;
    const onChange = e => {
        setSex(e.target.value);
      };
    const showModal = () => {
        setVisiavle(true);
      };
    const handleOk = e => {
      e.preventDefault();
      form.validateFields((err,values) => {
        if(!err) {
          setVisiavle(false);
          let data = values.startTime._d;
          const startTime = moment(data).format('YYYY-MM-DD');
          data = values.endTime._d;
          const endTime = moment(data).format('YYYY-MM-DD');
          const id = prjectData.length+1;
          const newProjectData = {
            id,
            companyProject : values.companyProject,
            positionRole: values.positionRole,
            startTime,
            endTime,
            workDesc: values.workDesc
          }
          prjectData.unshift(newProjectData);
          console.log(startTime);
          form.resetFields();
        }
      })
    }
      const  handleCancel = e => {
        setVisiavle(false);
      };
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }   
     const handleChange = info => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            setImageUrl(imageUrl),
            setLoading(true),
          );
        }
      };   
      const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传头像</div>
        </div>
      );
    return (
        <div className="resumenMain">
            <div style={{ marginBottom:20}}>创建简历</div>
            <div className="objective">
                <div className="objective_head">
                    <div>求职意向</div>
                    <div>
                    <span className="resumeCompletion">简历完成度 </span>
                    <Button type="primary" style={{ marginBottom:3}}>预览</Button>
                    </div>
                </div>
                <ul>
                    <li>  <p><span>*</span>期望行业</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span>期望职业</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span>期望分类</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span>期望城市</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span>期望薪资</p> <Input className="objective_input"></Input></li>
                </ul>
            </div>
            <div className="objective">
                <div className="objective_head">
                    <div>基本信息</div>
                </div>
                <ul>
                    <li className="uploadHead"> 
                     <p style={{ marginRight:44 }}><span>*</span>头像</p>  
                     <div>
                     <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                           >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                           </Upload>
                     </div>
                    </li>
                    <li>  <p><span>*</span>姓名</p> <Input className="objective_input"></Input></li>
                    <li className="choiceSex"> 
                        <p style={{ marginRight:44 }}><span>*</span>性别</p>
                        <Radio.Group onChange={onChange} value={sex}>
                            <Radio value={'男'}>男</Radio>
                            <Radio value={'女'}>女</Radio>
                        </Radio.Group>
                     </li>
                    <li>  <p><span>*</span>籍贯</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span>学校</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span>所学专业</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span> 学历</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span>手机</p> <Input className="objective_input"></Input></li>
                    <li>  <p><span>*</span> 邮箱</p> <Input className="objective_input"></Input></li>
                </ul>
            </div>
            <div className="objective">
                <div className="objective_head">
                    <div>自我介绍</div>
                </div>
                <ul>
                    <li>  <p><span>*</span>一句话介绍</p> <Input style={{ width:'90%' }} className="objective_input"></Input></li>
                    <li>  <p><span>*</span>专业技能</p> <Input placeholder="多个专业技能用空格分开" style={{ width:'90%' }} className="objective_input"></Input></li>
                    <li className="detailInstructions">  <p><span>*</span>个人详细说明</p> <TextArea style={{ width:'90%' }} rows={2} ></TextArea></li>
                </ul>
            </div>
            <div className="project">
                <div className="objective_head">
                    <div><span style={{ color:'red' }}>*</span>工作或项目经历</div>
                    <div>
                    <Button onClick={showModal} type="primary" style={{ marginBottom:3}}>+新增</Button>
                    </div>
                </div>
                <div className="projectExperience">
                      <Table columns={columns} rowKey={(record)=>record.id} pagination={false} dataSource={prjectData}></Table>
                </div>
                <Modal
                    title="新增-工作或项目经历"
                    visible={visiable}
                    footer={null}
                    closable={false}
                    destroyOnClose
                    >
                    <Form layout="vertical" onSubmit={handleOk}>
                        <Form.Item className="projectForm" label="公司项目">
                        {getFieldDecorator('companyProject', {
                            // rules: [{ required: true, message: '公司项目不能为空' }],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item className="projectForm" label="职位角色">
                        {getFieldDecorator('positionRole', {
                            // rules: [{ required: true, message: '职位角色不能为空' }],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item className="projectForm" label="开始时间">
                        {getFieldDecorator('startTime', {
                          rules: [{ required: true, message:'开始时间不能为空' }]
                        })(
                            <DatePicker  
                             showTime
                             format='YYYY-MM-DD'
                             />,
                        )}
                        </Form.Item>
                        <Form.Item className="projectForm" label="结束时间">
                        {getFieldDecorator('endTime', {
                          // rules: [{ required: true,message:'结束时间不能为空' }]
                        })(
                            <DatePicker  
                             showTime
                             format='YYYY-MM-DD'
                             />,
                        )}
                        </Form.Item>
                        <Form.Item className="projectForm" label="工作描述">
                        {getFieldDecorator('workDesc', {
                          // rules: [{ required: true, message:"工作描述不能为空" }]
                        })(
                          <TextArea ></TextArea>
                        )}
                        </Form.Item>
                        <Button type="primary" style={{ marginRight:10 }} htmlType='submit'>确定</Button>
                        <Button onClick={handleCancel}>取消</Button>
                    </Form>
                </Modal>
            </div>
            <div className="resumeSave">
                  <Button type="primary" size='large'>保存</Button>
            </div>
        </div>
    )
}
export default Form.create({ name: 'form_in_modal' })(resumenMan);