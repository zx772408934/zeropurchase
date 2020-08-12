import React from 'react'
import Home from '../Home/Home'
import About from '../About/About'
import { BrowserRouter ,Route ,Redirect ,Switch} from 'react-router-dom'
import RouteGuard from "./RouteGuard"
// import {createBrowserHistory} from 'history'
// const history = createBrowserHistory();

function router (props){
    //Redirect一定要放在Switch的最后一个
    return(
        <BrowserRouter>
           <Switch>
                <Route path="/" exact render={()=>(<Redirect to="/home"></Redirect>)}></Route>
                {/* <RouteGuard path="/" component={Home} exact={true}></RouteGuard> */}
                <RouteGuard path="/home" component={Home}></RouteGuard>
                <RouteGuard path="/about" component={About}></RouteGuard>
                {/* <RouteGuard path="/*" component={Home}></RouteGuard> */}
                <Redirect from="/*" to="/home" />
           </Switch>
        </BrowserRouter>
    );
}
export default router;