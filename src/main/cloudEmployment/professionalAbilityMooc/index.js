/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect,useState } from 'react';
import { Input, List,Card } from 'antd';
import axios from 'axios';

import './index.css';
import { async } from 'q';
const { Search } = Input;
const { Meta } = Card;
const data = [
    'IT·互联网 互联网产品',
    '设计·创作 绘画创作',
    '语言·留学 实用英语 出国留学',
    '职业·考证 公考求职 财会金融',
    '升学·考研 考研 大学',
    '兴趣·生活 投资理财 生活百科',
  ];
  const gridStyle = {
    width: '33.3%',
    textAlign: 'center',
  };
const professionAbilityMooc = (props)=>{
    const randomData =(max)=>{
        return  Math.floor(Math.random() * max) ;
    }
    let randomData1 = 0;
    const [showCourseData1,setShowCourseData] = useState([]);
    const [showCourseData2,setShowCourseData2] = useState([]);
    useEffect(()=>{
        getData('IT');
    },[])
    function getData(param = ''){
        axios.post('http://localhost:3000/cloud/cloudGetMoocCourseDetail',{
            category:param
        }).then(res=>{
            randomData1 = randomData(res.data.list.length -6);
            setShowCourseData(res.data.list.slice(randomData1,randomData1+6));
        })
    }
    return (
        <div className="moocMain">
            <div>
            <div className="moccHeadTitle">
                云就业职业能力慕课
                <Search className="moocHeadSearch" placeholder="请输入课程名称" onSearch={value => console.log(value)} enterButton />
            </div>
            <div className="moocHeadList">
                <div className="moocKindList">
                   <List
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                          {item}
                        </List.Item>
                      )}
                   >
                   </List>
                </div>
                <div className="moocCourseDatail">
                <Card size="small" className="moocCourseCrad">
                    {
                        showCourseData1.map(item=>{
                            return (
                             <Card.Grid 
                              style={gridStyle} 
                               >
                                   <a href={item.courseAddress}>
                                   <Card
                                   style={{ width:220 }}
                                      cover={<img alt="example" src={item.moocImage} />}
                                   >
                                    <Meta title={item.courseName} />
                                   </Card>
                                   </a>
                            </Card.Grid>
                            )
                        })
                    }
                </Card>
                </div>
            <div className="moocFooter">
                IT·互联网
            </div>
            </div>
            </div>
            <div>
            <div className="moccHeadTitle">
                云就业职业能力慕课
                <Search className="moocHeadSearch" placeholder="请输入课程名称" onSearch={value => console.log(value)} enterButton />
            </div>
            <div className="moocHeadList">
                {/* <div className="moocKindList">
                   <List
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                          {item}
                        </List.Item>
                      )}
                   >
                   </List>
                </div> */}
                <div className="moocCourseDatail">
                <Card size="small" className="moocCourseCrad">
                    {
                        showCourseData1.map(item=>{
                            return (
                             <Card.Grid 
                              style={gridStyle} 
                               >
                                   <a href={item.courseAddress}>
                                   <Card
                                   style={{ width:220 }}
                                      cover={<img alt="example" src={item.moocImage} />}
                                   >
                                    <Meta title={item.courseName} />
                                   </Card>
                                   </a>
                            </Card.Grid>
                            )
                        })
                    }
                </Card>,
                </div>
            <div className="moocFooter">
                IT·互联网
            </div>
            </div>
            </div>
        </div>
    )
}
export default professionAbilityMooc;