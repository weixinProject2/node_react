/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { Menu, Icon, Button } from 'antd';

import './index.css'
const { SubMenu } = Menu;

function msSider(props){
    const [collapsed,setCollapsed] = useState(false);
    const [menuWidth,setMenuWidth] = useState(200);
    function toggleCollapsed(){
        collapsed === true? setCollapsed(false):setCollapsed(true);
        menuWidth === 200? setMenuWidth(80):setMenuWidth(200);
    };
    return (
        <div className="main-sider" style={{width:menuWidth}}>
        <Button style={{ backgroundColor:"rgb(23,43,76)",marginBottom: 16,border:"none" }} onClick={toggleCollapsed}>
          <Icon style={{ color:"#fff",fontSize:"20px" }} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <div className="menuScroll">
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          className="menu"
          inlineCollapsed={collapsed}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="pie-chart" />
                <span>客户管理</span>
              </span>
            }
          >
            <Menu.Item key="9">销售机会</Menu.Item>
            <Menu.Item key="10">公客池</Menu.Item>
          </SubMenu>
         
          <Menu.Item key="2">
          <Link to="/houseManagement">
            <Icon type="desktop" />
            <span>房源管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
          <Link to="/transactionManagement">
            <Icon type="inbox" />
            <span>交易管理</span>
            </Link>
          </Menu.Item>
       
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="mail" />
                <span>财务管理</span>
              </span>
            }
            className="subMenu"
          >
            <Menu.Item key="5">收款管理</Menu.Item>
            <Menu.Item key="6">转款管理</Menu.Item>
            <Menu.Item key="7">退款管理</Menu.Item>
            <Menu.Item key="8">票据管理</Menu.Item>
            <SubMenu
            key="sub4"
            title={
              <span>
                <span>财务审核/传递</span>
              </span>
            }
          >
            <Menu.Item key="9">销售机会</Menu.Item>
            <Menu.Item key="10">公客池</Menu.Item>
          </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="appstore" />
                <span>售后服务</span>
              </span>
            }
          >
            <Menu.Item key="9">面积补差</Menu.Item>
            <Menu.Item key="10">代收费用</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="appstore" />
                <span>集群</span>
              </span>
            }
          >
            <Menu.Item key="11"><Link to="/clusterMangement/cluster">集群管理</Link> </Menu.Item>
            <Menu.Item key="12"><Link to="/clusterMangement/certificate">证书管理</Link></Menu.Item>
          </SubMenu>
        </Menu>
        </div>
      </div>
    )
}
export default msSider;