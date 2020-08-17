import React from "react"
import $request from "../../tools/request"
import {Toast} from "antd-mobile"
class Index extends React.Component{
    constructor(props){
        super(props);
        this.getIndexInfo = this.getIndexInfo.bind(this);
    }
    componentDidMount(){
        Toast.loading("loading...",0,null,false);
        this.getIndexInfo();
    }
    getIndexInfo(){
        $request.fetchRequest("post","getIndexInfo",{
            token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            id: localStorage.getItem('actId')
        },res=>{
            Toast.hide();
        },err=>{

        })
    }
    render(){
        return(
            <div className="index">
               {/* <img alt='bg' src={require}></img> */}
            </div>
        );
    }
}
export default Index;