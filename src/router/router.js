import React from 'react'
import { BrowserRouter ,Route ,Redirect ,Switch} from 'react-router-dom'
import RouteGuard from "./RouteGuard"
import Index from '../pages/index/index'
import Login from "../pages/index/login/login"
// import {createBrowserHistory} from 'history'
// const history = createBrowserHistory();

function router (props){
    //Redirect一定要放在Switch的最后一个
    return(
        <BrowserRouter>
           <Switch>
                {/* <RouteGuard path="/" component={Home} exact={true}></RouteGuard> */}
                <Route path="/" exact render={()=>(<Redirect to="/Index"></Redirect>)}></Route>
                <RouteGuard path="/Index" component={Index}></RouteGuard>
                <RouteGuard path="/Login" component={Login}></RouteGuard>
                <Redirect from="/*" to="/Index" />
           </Switch>
        </BrowserRouter>
    );
}
export default router;