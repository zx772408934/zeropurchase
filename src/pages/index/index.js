import React from "react"
import $request from "../../tools/request"
import {Toast} from "antd-mobile"
// import Loading from "../../components/loading/loading"
import Hidden from "../../components/hidden/hidden";
import "./index.scss"


function TestContent(props) {
    if(props.indexInfo.type===1){
        return <span onClick={props.onClick}>立即领取</span>;
    }
    else if(props.indexInfo.type===2){
        return <span onClick={props.onClick}>去抢购</span>;
    }
    else if(props.indexInfo.type===4){
        return <span onClick={props.onClick}>亲，该商品仅限抢购一次哦！</span>;
    }
}


class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShow:false,
            status:1,
            indexInfo:{}
        }
        this.getIndexInfo = this.getIndexInfo.bind(this);
        this.doReprate = this.doReprate.bind(this);
        this.getCoupon = this.getCoupon.bind(this);
        // this.judgeContent = this.judgeContent.bind(this);
    }
    componentDidMount(){
        Toast.loading("loading...",0,null,false);
        this.getIndexInfo();
    }
    //获取首页信息
    getIndexInfo(){
        $request.fetchRequest("post","getIndexInfo",{
            token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            id: localStorage.getItem('actId')
        },res=>{
            switch(res.code){
                case 200:
                    this.setState({
                        isShow:true,
                        state:1,
                        indexInfo:res.data
                    });
                    break;
                case 1005104101 || 1005104100:
                    this.setState({
                        state:1
                    });
                    break;
                case 1005104110:
                    this.setState({
                        state:2
                    });
                    break;
                case 1005104121:
                    this.setState({
                        state:3,
                        indexInfo:res.data
                    });
                    break;
                 default:
                    this.setState({
                        state:4,
                    });
                    break;
            }
            this.setState({
                isShow:true,
            });
            Toast.hide();
            
        },err=>{
            
        })
    }
    //点击优惠卷后面的按钮（不是审核）
    doReprate(){
        switch(this.state.status){
            case 1:
                switch(this.state.indexInfo.type){
                    case 1:
                        localStorage.getItem("token")?this.getCoupon():this.props.history.push("./login");
                        break;
                    case 2:
                        this.props.history.push("./order");
                        break;
                    case 4:
                        Toast.info("该优惠卷已使用",1.5,null,false);
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                Toast.info("您好，该活动已结束",1.5,null,false);
                break;
            case 3:
                Toast.info("您好，该活动还未开始",1.5,null,false);
                break;
            default:
                break;
        }
    }
    //领取优惠卷
    getCoupon(){
        Toast.loading('loading...',0,null,true);
        $request.fetchRequest("post","coupon",{
            token: localStorage.getItem('token'),
            id: localStorage.getItem('actId')
        },res=>{
            if(res.code===200){
                Toast.success('领取成功',1,null,false);
                this.getIndexInfo();
            }
        },err=>{

        })
    }
    
    //判断内容
    // judgeContent() {
    //     if(this.state.indexInfo.type===1){
    //         return "立即领取";
    //     }
    //     else if(this.state.indexInfo.type===2){
    //         return "去抢购";
    //     }
    //     else if(this.state.indexInfo.type===4){
    //         return "亲，该商品仅限抢购一次哦！";
    //     }
    // } 
    render(){
        return (
            // this.state.isShow
            // ?
            <Hidden visible={this.state.isShow}>
                <div className="index">
                <img alt='bg' src={this.state.indexInfo.home_img} className="bg"></img>
                <div className="main">
                    <img alt="lqyhj" src={require("../../static/images/index/lqyhj.png")} style={{margin:'auto 0'}} className="title"></img>
                    <div className="content">
                        <div className="left">
                            <div className="center">
                                <span className="symbol">￥</span>
                                <span className="num">20</span>
                            </div>
                        </div>
                        <div className="right">
                            <Hidden visible={Boolean(this.state.indexInfo.type===1||this.state.indexInfo.type===2||this.state.indexInfo.type===4)}>
                                <div className="lijiqiang">
                                    <TestContent indexInfo={this.state.indexInfo} onClick={this.doReprate}></TestContent>
                                </div>
                            </Hidden>
                            <Hidden visible={Boolean(this.state.indexInfo.type===5||this.state.indexInfo.is_verify===1)}>
                                <div className="tijiaoshenhe">
                                    <div className="chooseImg">+</div>
                                    <div className="tijiao">
                                        <span className="maxNum">最多上传3张图片</span>
                                        <span className="sub">提交审核</span>
                                    </div>
                                </div>
                            </Hidden>
                            <Hidden visible={Boolean(this.state.indexInfo.type===3||this.state.indexInfo.is_verify===1)}>
                                <div className="shenhezhong">
                                    <div className="showImg"></div>
                                    <div className="status">审核中，请稍后…</div>
                                </div>
                            </Hidden>
                            <Hidden visible={Boolean(this.state.indexInfo.type===0&&this.state.indexInfo.is_verify===1)}>
                                <div className="weitonguo">
                                    <div className="showImg"></div>
                                    <div className="chongxintijiao">
                                        <span className="fali">审核未通过，点击</span>
                                        <span className="resub">重新提交审核</span>
                                    </div>
                                </div>
                            </Hidden>
                        </div>
                    </div>
                </div>
                <div className="direction">
                    <div className="title">活动说明</div>
                    <div className="content">
                        {this.state.indexInfo.describe}
                    </div>
                </div>
            </div>
            </Hidden>
            
            // :
            // <Loading></Loading>
        );
    }
}
export default Index;