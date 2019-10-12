import React,{ Fragment } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';


import HouseManagement from './houseManegement';
import TransactionManagement from './transactionManagement';
import ClusterMangement from './clusterMangement';
import CloudEmployment from './cloudEmployment';
function mainIndex(){

    return (
     <Fragment>
         <Switch>
            <Route  path="/manageSystem/houseManageMent"  component={HouseManagement} />
            <Route  path="/manageSystem/transactionManagement" component={TransactionManagement} />
            <Route  path="/manageSystem/clusterMangement" component={ClusterMangement} />
            <Route  path="/manageSystem/cloudManagement" component={CloudEmployment} />
         </Switch>
     </Fragment>
    )
}
export default withRouter(mainIndex);