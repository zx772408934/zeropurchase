import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import { CacheRoute, CacheSwitch } from "react-router-cache-route"

function RouteGuard(props) {

    console.log(props)

    //初始化参数
    const path = props.path;
    const Component = props.component;
    const exact = props.exact || false;
    const strict = props.strict || false;
    const permissions = props.permissions || false;

    //鉴权
    let status = false;
    let userInfo = Boolean(localStorage.getItem("token"));
    if (permissions) {
        if (userInfo) {
            status = true;
        }
        else {
            status = false;
        }
    }
    else {
        status = true;
    }

    return (
        <CacheSwitch>
            <CacheRoute
                path={path}
                exact={exact}
                strict={strict}
                render={props => {
                    return (
                        status ?
                            (
                                <Component {...props} />
                            ) :
                            (
                                <Redirect to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }} />
                            )

                    )
                }
                }
            />
        </CacheSwitch>

    )


}
export default withRouter(RouteGuard);