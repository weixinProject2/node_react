/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState,useEffect} from 'react';
import { Form, Row, Col,Tree, Input, Button, Icon,DatePicker,Popover } from 'antd';
import './index.css'
import  treeData from './Tree.json';

const  { RangePicker } = DatePicker;
const { TreeNode } = Tree;

function nodeIssued(props){

    const [expand,setExpand] = useState(false);
    const [visiable,setVisiale] = useState(false);
    const [placeholder,setPlaceholder] = useState('请选择项目分期');
    const[staing,setStaing] = useState('');
    const [realTreeData,setRealTreeData] = useState([]);
    const [treeParentData,setTreeParentData] = useState([]);
    const content = (
        <div className="popStyle">
            <Tree
                switcherIcon={<Icon type="down" />}
                onSelect={TreeSelect}
            >
                {
                    treeData.map(item => {
                        return(
                            <TreeNode title={item.name} key={item.id} type={item.type}>
                            {
                                item.children.map(item2 =>{
                                    return (
                                        <TreeNode title={item2.name} key={item2.id} type={item2.type}>
                                            {
                                                item2.children.map(item3 => {
                                                    return (
                                                        <TreeNode  title={item3.name} key={item3.num} type={item3.type}>
                                                            {
                                                                item3.children.map((item4)=>{
                                                                    return (
                                                                        <TreeNode  title={item4.name} name={item3.name} key={item4.num} type={item4.type}/>
                                                                    )
                                                                })
                                                            }
                                                        </TreeNode>
                                                    )
                                                })
                                            }
                                        </TreeNode>
                                    )
                                })
                            }
                            </TreeNode>
                        )
                    })
                }
            </Tree>
        </div>
    );
    useEffect(()=>{
        getAllData(treeData);
    })
    function  handleSearch (e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
          console.log('Received values of form: ', values);
        });
      };
      function handleReset () {
          console.log(props.form.getFieldsValue());
        props.form.resetFields();
      };
      function toggle (){
        setExpand(!expand);
      };
    function stagingClick(){
        visiable ? setVisiale(false) :setVisiale(true);
    }
    function TreeSelect(selectedKeys, { selectedNodes}){
        const data = selectedNodes[0].props;
        const type = data.type;
        if(type === 'STAGE')
        {
            setStaing(`${data.name}/${data.title}`);
            setPlaceholder(`${data.name}/${data.title}`);
        }

    }
    function getAllData(treeData){
        setTreeParentData(treeData);
    }
    function stagingChange(event){
        // setRealTreeData()
        const value = event.target.value;
        setStaing(value);
        // treeData.map()
    }
    return (
        <div>
            <div>
            <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
                <Row gutter={24}>
                    <Col span={8} key="1" style={{ display:'block' }}>
                    <Popover placement="bottom"  content={content} visible={visiable}>
                        <Form.Item label="项目分期">
                        <Input
                         placeholder={placeholder}
                         onClick={stagingClick}
                         onChange={stagingChange}
                         value={staing}
                        />
                        </Form.Item>
                    </Popover>
                    </Col>
                    <Col span={8} key="2" style={{ display:'block' }}>
                        <Form.Item label="关键信息" style={{marginLeft:15}}>
                        <Input placeholder="客户或房源" />
                        </Form.Item>
                    </Col>
                    <Col span={8} key="3" style={{ display:'block' }}>
                        <Form.Item label="单据类型">
                        <Input placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} style={{display: expand?'block':'none'}}>
                    <Col span={8} key="4" style={{ display:'block' }}>
                        <Form.Item label="票据编号">
                        <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={8} key="5" style={{ display:'block' }}>
                        <Form.Item label="业务单据号">
                        <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={8} key="6" style={{ display:'block' }}>
                        <Form.Item label="到账日期">
                        <RangePicker separator="至"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button  type="primary" htmlType="submit">
                    查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                    重置
                    </Button>
                    <a style={{ marginLeft: 8, fontSize: 12, WebkitUserSelect: 'none', }} onClick={toggle}>
                    {!expand?'更多':'收起'} <Icon type={expand ? 'up' : 'down'} />
                    </a>
                </Col>
                </Row>
            </Form>
            </div>
        </div>
    )
}
const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(nodeIssued);
export default WrappedAdvancedSearchForm;