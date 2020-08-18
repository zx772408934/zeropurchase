import React from "react";
import { Toast } from "antd-mobile";
class Loading extends React.Component{
    componentDidMount(){
        Toast.loading("loading...",0,null,false);
    }
    render(){
        return(
            <div className="loading"></div>
        )
    }
}
export default Loading;