import React,{createContext } from 'react';
import { useLocalStore, observer} from 'mobx-react-lite';

export const MyContext = createContext(null);

export const RouteStore = observer((props)=>{
    const store = useLocalStore(()=>(
        {
            routeName: '',
            get getRouteName(){
                return store.routeName;
            },
            setRountName(value){
                store.routeName = value;
            }
        }
    ));
    return (
        <MyContext.Provider value={store}>
            {props.children}
        </MyContext.Provider>
    )
});