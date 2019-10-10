/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Tabs } from 'antd';

import  globalDictionary from '../../../globalDictionary';
import ClusterAllocate from './clusterAllocate';
import ClusterNodeList from './clusterNodelist';

 
import './index.css'

const { TabPane } = Tabs;
const ClusterDeatil = (props)=>{
    const routeClusterName = props.location.pathname.split('/');
    const clusterName = routeClusterName[routeClusterName.length - 1];
    function callback(key) {
        console.log(key);
      }
    return (
        <div className="clusterDetailMain">
            <div className="clusterDetailHead">
                react-antd-project-cluster-{globalDictionary[clusterName]}
            </div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="节点列表" key="1">
                <ClusterNodeList clustername={clusterName}/>
                </TabPane>
                <TabPane tab="权限分配" key="2">
                   <ClusterAllocate></ClusterAllocate>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default ClusterDeatil;