import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'


import { MyContext } from '../routeStore'


function Certicate(props){
    const path = props.match.path;
    const store = toJS(useContext(MyContext));
    useEffect(()=>{
        store.setRountName(path);
    },[path, store])
    return (
        <div>
        </div>
    )
}
export default observer(Certicate)