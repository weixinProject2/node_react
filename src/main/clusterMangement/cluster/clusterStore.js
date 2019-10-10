import React,{createContext } from 'react';
import { useLocalStore, observer} from 'mobx-react-lite';

export const MyContext = createContext(null);

export const ClusterStore = observer((props)=>{
    const store = useLocalStore(()=>(
        {
            clusterId: {},
            getCluster(){
                return store.clusterId;
            },
            setCluster(value){
                store.clusterId = value;
            }
        }
    ));
    return (
        <MyContext.Provider value={store}>
            {props.children}
        </MyContext.Provider>
    )
});