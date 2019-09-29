import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import ClusterList from './clusterList'

import { MyContext } from '../routeStore'
import './index.css'
function Clutser(props){
    const path = props.match.path;
    const store = toJS(useContext(MyContext));
    useEffect(()=>{
        store.setRountName(path);
    },[path,store])
    return (
        <div className="clusterDeatil">
            <ClusterList />
            
        </div>
    )
}
export default observer(Clutser)