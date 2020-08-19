import React from 'react'
import { HashRouter ,Route ,Redirect ,Switch} from 'react-router-dom'
import RouteGuard from "./RouteGuard"
import Index from '../pages/index/index'
import GoodsDetails from '../pages/index/goodsDetails/goodsDetails'
import Login from "../pages/index/login/login"
import Order from "../pages/index/order/order"
import Review from "../pages/index/review/review"
//路由动画
import AnimatedRouter from 'react-animated-router'; //我们的AnimatedRouter组件
import {CacheSwitch} from "react-router-cache-route"

// import {createBrowserHistory} from 'history'
// const history = createBrowserHistory();

function router (props){
    //Redirect一定要放在Switch的最后一个
    return(
        <HashRouter>
            <CacheSwitch>
                {/* <RouteGuard path="/" component={Home} exact={true}></RouteGuard> */}
                <Route path="/" exact render={()=>(<Redirect to="/index"></Redirect>)}></Route>
                <RouteGuard path="/index" component={Index} exact={true}></RouteGuard>
                <RouteGuard path="/goodsDetails" component={GoodsDetails} exact={true}></RouteGuard>
                <RouteGuard path="/order" component={Order} exact={true} permissions={true}></RouteGuard>
                <RouteGuard path="/review" component={Review} exact={true} permissions={true}></RouteGuard>
                <RouteGuard path="/login" component={Login} exact={true}></RouteGuard>
                <Redirect from="/*" to="/index" />
            </CacheSwitch>
        </HashRouter>
    );
}
export default router;