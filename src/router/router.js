import React from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import RouteGuard from "./RouteGuard"
import Index from '../pages/index/index'
import GoodsDetails from '../pages/index/goodsDetails/goodsDetails'
import Login from "../pages/index/login/login"
import Order from "../pages/index/order/order"
import Review from "../pages/index/review/review"
//路由动画
import AnimatedRouter from 'react-animated-router';
import { CacheSwitch, CacheRoute } from "react-router-cache-route"
// import { AliveScope, KeepAlive } from 'react-activation'
import {
    Provider,
    KeepAlive,
} from 'react-keep-alive';

// import {createBrowserHistory} from 'history'
// const history = createBrowserHistory();

function ZxRouter(props) {
    //Redirect一定要放在Switch的最后一个
    //Provider必须放在Router的里面，KeepAlive必须放在Provider里面，并且需要一个唯一的name值
    return (

        <HashRouter>
            <Provider>
                <Switch>
                    {/* <RouteGuard path="/" component={Home} exact={true}></RouteGuard> */}
                    <Route path="/" exact render={() => (<Redirect to="/index"></Redirect>)}></Route>
                    
                    <Route path="/index" exact>
                        <KeepAlive name="index">
                            {/* <RouteGuard component={Index}></RouteGuard> */}
                            <Index {...props}></Index>
                        </KeepAlive>
                    </Route>
                    <Route path="/login" exact>
                        <KeepAlive name="login">
                            <RouteGuard component={Login}></RouteGuard>
                        </KeepAlive>
                    </Route>
                    
                    {/* <Route path="/index" exact render={(props) => (<KeepAlive id={1}><Index {...props}></Index></KeepAlive>)}></Route>
                    <Route path="/login" exact render={(props) => (<KeepAlive id={2}><Login {...props}></Login></KeepAlive>)}></Route> */}


                    {/* <RouteGuard path="/index" component={Index} exact={true}></RouteGuard> */}
                    <RouteGuard path="/goodsDetails" component={GoodsDetails} exact={true}></RouteGuard>
                    <RouteGuard path="/order" component={Order} exact={true} permissions={true}></RouteGuard>
                    <RouteGuard path="/review" component={Review} exact={true} permissions={true}></RouteGuard>
                    {/* <RouteGuard path="/login" component={Login} exact={true}></RouteGuard> */}
                    <Redirect from="/*" to="/index" />
                </Switch>
            </Provider>

        </HashRouter>
    );
}
export default ZxRouter;