import React from "react"
import $request from "../../tools/request"
import Loading from "../../components/loading/loading"
import { Toast } from "antd-mobile"
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShow:false,
            indexInfo:{}
        };
        this.getIndexInfo = this.getIndexInfo.bind(this);
    }
    componentDidMount(){
        this.getIndexInfo();
    }
    getIndexInfo(){
        Toast.loading('loading...',0,null,false);
        $request.fetchRequest("post","getIndexInfo",{
            token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            id: 208
        },res=>{
            Toast.hide();
            this.setState({
                isShow:true,
                indexInfo:res.data
            });
        },err=>{

        });
    }
    render(){
        return
            (
                {
                this.state.isShow
                ?
                <Loading></Loading>
                :
                <Loading></Loading>
                }
            );
    }
}
export default Index;