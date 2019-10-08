import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import { ClusterStore } from './clusterStore'
import ClusterList from './clusterList'
import ClusterDeatil from './clusterDetail'

import { MyContext } from '../routeStore'
import './index.css'
function Clutser(props){
    const path = props.match.path;
    const store = toJS(useContext(MyContext));
    useEffect(()=>{
        store.setRountName(path);
    },[])
    return (
        <div className="clusterDeatil">
            <ClusterStore>
                <ClusterList props={props}/>
                <Route path={`${path}/clusterDeatil`} component={ClusterDeatil}></Route>
            </ClusterStore>
        </div>
    )
}
export default observer(Clutser)