import React from 'react'
import { HashRouter ,Route ,Redirect ,Switch} from 'react-router-dom'
import RouteGuard from "./RouteGuard"
import Index from '../pages/index/index'
import Login from "../pages/index/login/login"
import Order from "../pages/index/order/order"
// import {createBrowserHistory} from 'history'
// const history = createBrowserHistory();

function router (props){
    //Redirect一定要放在Switch的最后一个
    return(
        <HashRouter>
           <Switch>
                {/* <RouteGuard path="/" component={Home} exact={true}></RouteGuard> */}
                <Route path="/" exact render={()=>(<Redirect to="/index"></Redirect>)}></Route>
                <RouteGuard path="/index" component={Index} exact={true}></RouteGuard>
                <RouteGuard path="/order" component={Order} exact={true} permissions={true}></RouteGuard>
                <RouteGuard path="/login" component={Login} exact={true}></RouteGuard>
                <Redirect from="/*" to="/index" />
           </Switch>
        </HashRouter>
    );
}
export default router;