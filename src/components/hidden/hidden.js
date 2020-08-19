import React from "react";
function Hidden(props){
    //element主要是为路由缓存
    let element = <div></div>;

    const visible = props.visible || false;
    return visible ? props.children : element;
}
export default Hidden;