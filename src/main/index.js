import React,{ Fragment } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import HouseManagement from './houseManegement';
import TransactionManagement from './transactionManagement';
function mainIndex(){

    return (
     <Fragment>
         <Switch>
            <Route  path="/houseManageMent" component={HouseManagement} />
            <Route  path="/transactionManagement" component={TransactionManagement} />
         </Switch>
     </Fragment>
    )
}
export default withRouter(mainIndex);