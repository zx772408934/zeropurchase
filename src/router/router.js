import React from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import RouteGuard from "./RouteGuard"
import Index from '../pages/index/index'
import GoodsDetails from '../pages/index/goodsDetails/goodsDetails'
import Login from "../pages/index/login/login"
import Order from "../pages/index/order/order"
import Review from "../pages/index/review/review"
import Counter from "../pages/index/count/count"
//路由动画
// import AnimatedRouter from 'react-animated-router';
import { Provider } from 'react-keep-alive';

// import {createBrowserHistory} from 'history'
// const history = createBrowserHistory();

function ZXRouter(props) {
    //Redirect一定要放在Switch的最后一个
    //Provider必须放在Router的里面，KeepAlive必须放在Provider里面，并且需要一个唯一的name值
    return (
        <HashRouter>
            {/* <Provider> */}
                <Switch>
                    <Route path="/" exact render={() => (<Redirect to="/counter"></Redirect>)}></Route>
                    {/* <Route path="/index" exact>
                        <RouteGuard component={Index} name="index"></RouteGuard>
                    </Route>
                    <Route path="/login" exact>
                        <RouteGuard component={Login} name="login"></RouteGuard>
                    </Route>
                    <Route path="/goodsDetails" exact>
                        <RouteGuard component={GoodsDetails} permissions={true} name="goodsDetails"></RouteGuard>
                    </Route> */}

                    {/* <Route path="/counter" exact>
                        <RouteGuard component={Counter} name="counter"></RouteGuard>
                    </Route> */}

                    <Route path="/counter" exact component={Counter}></Route>

                    <Redirect from="/*" to="/index" />
                </Switch>
            {/* </Provider> */}
        </HashRouter>
    );
}
export default ZXRouter;