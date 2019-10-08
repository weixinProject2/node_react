/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { toJS } from 'mobx'
import { Tabs } from 'antd';


import { MyContext } from  '../clusterStore'
import ClusterAllocate from './clusterAllocate'
import ClusterNodeList from './clusterNodelist'

 
import './index.css'

const { TabPane } = Tabs;
const ClusterDeatil = (props)=>{
    const store = toJS(useContext(MyContext));
    const routeClusterName = props.location.query;
    console.log(routeClusterName);
    const clusterName = toJS(store.getCluster()).title;
    useEffect(()=>{
    },[])
    function callback(key) {
        console.log(key);
      }
    return (
        <div className="clusterDetailMain">
            <div className="clusterDetailHead">
                react-antd-project-cluster-{clusterName}
            </div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="节点列表" key="1">
                <ClusterNodeList />
                </TabPane>
                <TabPane tab="权限分配" key="2">
                   <ClusterAllocate></ClusterAllocate>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default ClusterDeatil;