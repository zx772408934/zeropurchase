import React from "react";
import $request from "../../../tools/request";
import "./login.scss"
import { Toast } from 'antd-mobile';
function Input(props) {
    return(
        <input type="number" onChange={props.onChange} value={props.value} placeholder={props.placeholder}></input>
    )
}

class Login extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         phone:'',
    //         phoneTips:'',
    //         code:'',
    //         codeTips:'',
    //         codeInfo:'获取验证码',
    //         isChecked:true
    //     }
    //     this.isAllowGetCode = true;
    //     this.codeInfoInterval = null;
    //     this.handlePhoneChange = this.handlePhoneChange.bind(this);
    //     this.handleCodeChange = this.handleCodeChange.bind(this);
    // }
   
    componentDidMount(){
        console.log(this)
    }
    //手机号受控
    handlePhoneChange(event){
        if(event.target.value.length>11){
            return;
        }
        if(event.target.value.length===0){
            this.setState({
                phoneTips:'手机号不能为空'
            });
        }
        else{
            this.setState({
                phoneTips:''
            });
        }
        this.setState({
            phone:event.target.value
        });
    }
    //验证码受控
    handleCodeChange(event){
        if(event.target.value.length>6){
            return;
        }
        if(event.target.value.length===0){
            this.setState({
                codeTips:'验证码不能为空'
            });
        }
        else{
            this.setState({
                codeTips:''
            });
        }
        this.setState({
            code:event.target.value
        });
    }

    //获取验证码
    getCode(){
        if (!this.isAllowGetCode) {
            return;
        }
        
        if(!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/).test(this.state.phone)){
            this.setState({
                phoneTips:'请输入正确的手机号'
            });
            return;
          }
        Toast.loading( 'Loading...' , 0 , null , true );
        const bloc = (this.state.phone.substr(1, 9) - 0).toString(8) * (1 + this.state.phone.substr(7, 10) - 0) + '';
        const rloc = bloc.substr(bloc.length - 5, bloc.length);
        $request.fetchRequest("post","scode",{
            lock:rloc,
            phone:this.state.phone,
            state:'1'
        },res=>{
            if(res.code===200){
                Toast.success( '发送成功' , 1.5 , null , false );
                let plentyTime = 60;
                this.isAllowGetCode = false;
                this.codeInfoInterval = setInterval(()=>{
                    plentyTime--;
                    this.setState({
                        codeInfo:plentyTime+"s"
                    });
                    if (plentyTime<=0){
                    clearInterval(this.codeInfoInterval);
                    this.isAllowGetCode = true;
                        this.setState({
                            codeInfo:'重新获取'
                        });
                    }
                },1000);
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
                                <Input onChange={this.handlePhoneChange} value={this.state.phone} placeholder='手机号'></Input>
                            </div>
                            <div className="tips">{this.state.phoneTips}</div>
                        </div>
                        <div className="list">
                            <div className="inputValue">
                                <Input onChange={this.handleCodeChange} value={this.state.code} placeholder='验证码'></Input>
                                <span className="getCode" onClick={this.getCode.bind(this)}>{this.state.codeInfo}</span>
                            </div>
                            <div className="tips">{this.state.codeTips}</div>
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