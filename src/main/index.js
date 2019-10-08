import React,{ Fragment } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';


import HouseManagement from './houseManegement';
import TransactionManagement from './transactionManagement';
import ClusterMangement from './clusterMangement';

function mainIndex(){

    return (
     <Fragment>
         <Switch>
            <Route  path="/manageSystem/houseManageMent"  component={HouseManagement} />
            <Route  path="/manageSystem/transactionManagement" component={TransactionManagement} />
            <Route  path="/manageSystem/clusterMangement" component={ClusterMangement} />
         </Switch>
     </Fragment>
    )
}
export default withRouter(mainIndex);