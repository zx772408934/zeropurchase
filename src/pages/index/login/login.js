import React from "react";
import $request from "../../../tools/request";
import "./login.scss"
import { Toast } from 'antd-mobile';
function Input(props) {
    return(
        <input type="number" onChange={props.onChange} value={props.value} placeholder={props.placeholder} maxLength={props.maxLength}></input>
    )
}

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            code:'',
            isChecked:true
        }
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    handlePhoneChange(event){
        this.setState({
            phone:event.target.value
        });
    }

    //获取验证码
    getCode(){
        Toast.loading( 'Loading...' , 0 , null , true );
        const bloc = (this.state.phone.substr(1, 9) - 0).toString(8) * (1 + this.state.phone.substr(7, 10) - 0) + '';
        const rloc = bloc.substr(bloc.length - 5, bloc.length);
        $request.fetchRequest("post","scode",{
            lock:rloc,
            phone:this.state.phone,
            state:'1'
        },res=>{
            if(res.code==200){
                Toast.success( '发送成功' , 1.5 , null , false );
            }
        },err=>{

        });
    }
    render(){
        return(
            <div className="login">
                <img src={require('../../../static/images/login/bg.png')} className="bg" alt='bg'></img>
                <div className="content">
                    <div className="form">
                        <div className="list">
                            <div className="inputValue">
                                <Input onChange={this.handlePhoneChange} value={this.state.phone} placeholder='手机号' maxLength='11'></Input>
                            </div>
                            <div className="tips">请输入手机号</div>
                        </div>
                        <div className="list">
                            <div className="inputValue">
                                <Input onChange={this.handlePhoneChange} value={this.state.phone} placeholder='手机号' maxLength='11'></Input>
                                <span className="getCode" onClick={this.getCode.bind(this)}>获取验证码</span>
                            </div>
                            <div className="tips">请输入手机号</div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="deal">
                    <i className={`iconfont left ${ this.state.isChecked ?"active":"uActive"}`} onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}>&#xe613;</i>
                    <div className="right">我已阅读并同意<span>《注册协议》</span></div>
                    </div>
                    <div className="sub">注册登录</div>
                </div>
            </div>
        )
    }
}
export default Login;