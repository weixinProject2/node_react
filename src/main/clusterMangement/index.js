import React from 'react'
import {Route } from 'react-router-dom'

import { RouteStore } from './routeStore'
import ClusterHeader from './cluterHeader'
import Cluster from './cluster'
import Certificate from './certificate'

import './index.css'

export const MyContext = React.createContext();

function  ClusterMangement(props) {
    const path = props.match.path;
    return (
        <div className="clusterMain">
            <RouteStore>
                <ClusterHeader/>
                <Route path={`${path}/cluster`} component={Cluster}  ></Route> 
                <Route path={`${path}/certificate`} component={Certificate} ></Route> 
            </RouteStore>
        </div>
    )
}
export default ClusterMangement;