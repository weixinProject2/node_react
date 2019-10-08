import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Icon, Breadcrumb  } from 'antd'
import { toJS } from 'mobx'

import globalDictionary from '../../globalDictionary';
import { MyContext } from '../routeStore'
import './index.css'
const ClusterHeader = (props) =>{
    const store = toJS(useContext(MyContext));
    const data  = store.routeName.split('/');

    return (
        <div className="clutserHeader">
            <span className="custerSpan"></span>
            <span className="custerSpan"> <Icon type="hdd" /> 创建集群</span>
            <span className="custerSpan"> <Icon type="p`roperty-safety" /> 权限管理</span>
            <span className="custerSpan"> <Icon type="reload" /> 刷新</span>
            <div className="breadcrumb">
                <Breadcrumb separator=">">
                    {
                       data.map((item)=>{
                        return <Breadcrumb.Item key={item}>{globalDictionary[item]}</Breadcrumb.Item>
                       })
                    }
                </Breadcrumb>
            </div>
        </div>
    )
}
export default observer(ClusterHeader); 