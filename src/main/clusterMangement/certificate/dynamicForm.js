import React, { useContext, useEffect,useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker,Radio,Icon } from 'antd';
let id = 0;
function FormFields(props){
    const remove = k => {
        const { form } = props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
    
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
    };
    
    const add = () => {
        const { form } = props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
    };
    
    const handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { keys, names } = values;
            console.log('Received values of form: ', values);
            console.log('Merged values:', keys.map(key => names[key]));
          }
        });
    };
    const {getFieldDecorator,getFieldValue} = props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '项目成员' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "请输入项目成员或移除该表单域",
            },
          ],
        })(<Input placeholder="项目成员" style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    return (
        <Form onSubmit={handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加项目成员
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
}
export default Form.create(
{
  name:'permissionForm',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  // mapPropsToFields(props) {
  //   const newFields = {
  //     username: Form.createFormField(
  //       {
  //       ...props.username,
  //       value: props.username.value,
  //     }),
  //   };
  //   console.log(newFields);
  //   return newFields;
  // },
})(FormFields);