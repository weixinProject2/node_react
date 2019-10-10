import React from 'react'
import { Form, Input, Button, Icon,message } from 'antd';
import axios from 'axios'

function Login(props){
  const {getFieldDecorator} = props.form;
  const myLogin = function(e){
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://122.51.41.28:3000/getUser',{
          values:values
        }).then((res)=>{
          if(res.data.length===0){
            message.warning("用户名或密码不正确");
            return;
          }
          const {userName,password,role} = res.data[0];
          const userInfo = {
            userName,
            password,
            role,
          }
          localStorage.setItem('userInfo',JSON.stringify(userInfo));
          props.prop.history.replace('/manageSystem');
        })
        
      }
    });
  }


  return (
    <Form onSubmit={myLogin} className="login-form">
    <Form.Item>
    {getFieldDecorator('username', {
        rules: [{ required: true, message: 'Please input your username!' }],
    })(
        <Input
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Username"
        />,
    )}
    </Form.Item>
    <Form.Item>
    {getFieldDecorator('password', {
        rules: [{ required: true, message: 'Please input your Password!' }],
    })(
        <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="Password"
        />,
    )}
    </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
            登录
        </Button>
    </Form.Item>
  </Form>
  )
}
export default Form.create({ name: 'normal_login' })(Login)
