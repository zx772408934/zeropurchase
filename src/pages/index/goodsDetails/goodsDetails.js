import React from "react";
import { Toast , Carousel , Picker } from "antd-mobile";
import Hidden from "../../../components/hidden/hidden";
import $request from "../../../tools/request";
import Qs from "qs";
import area from "../../../tools/location.json"
import "./goodsDetails.scss";

function Common (props){
    let elements = 
    <div className="common">
        <div className="title">
            {props.title}
        </div>
        {
            props.content
            ?
            <div className="content">
                {props.content}
            </div>
            :
            props.children
        }
    </div>
    return elements;
}
class GoodsDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShow:false,

            sourceData:[],
            pickerShow:false,

            goodsDetailsInfo:{},

            name:'',
            phone:'',
            address:'',
            details:'',
        }
        this.dealRank = this.dealRank.bind(this);
        this.getGoodsDetialsInfo = this.getGoodsDetialsInfo.bind(this);
        this.judgePrice = this.judgePrice.bind(this);
        this.goBuy = this.goBuy.bind(this);
    }
    componentDidMount(){
        Toast.loading("loading...",0,null,false);
        this.dealRank();
        this.getGoodsDetialsInfo();
    }
    //处理三级联动数据格式
    dealRank(){
        let antdDistrict =[];
        let districtData = area;
        Object.keys(districtData).forEach((index)=>{
            let itemLevel1 ={};
            let itemLevel2 ={};
            itemLevel1.value = districtData[index].code;
            itemLevel1.label = districtData[index].name;
            itemLevel1.children = [];
            let data = districtData[index].cities;
            Object.keys(data).forEach((index)=>{
                itemLevel2.value = data[index].code;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3 ={};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index)=>{
                    itemLevel3.value = index;
                    itemLevel3.label = data2[index];
                    itemLevel2.children.push(itemLevel3);
                    itemLevel3 ={};
                });
                itemLevel1.children.push(itemLevel2);
                itemLevel2 ={};
            });
            antdDistrict.push(itemLevel1)
        });

        this.setState({
            sourceData:antdDistrict
        });
    }
    //选择地区
    chooseArea(val){
        console.log(val)
    }
    //获取商品详情
    getGoodsDetialsInfo(){
        $request.fetchRequest("post","getActInfo",{
            token:localStorage.getItem('token')?localStorage.getItem('token'):'',
            id:Qs.parse(this.props.location.search.split("?")[1]).goodsId
        },res=>{
            this.setState({
                isShow:true,
                goodsDetailsInfo:res.data
            });
            Toast.hide();
        },err=>{

        });
    }
    //处理卷后价格
    judgePrice(){
        let priceMath = (this.state.goodsDetailsInfo.price*100-this.state.goodsDetailsInfo.coupon*100)/100;
        if(priceMath<=0){
          return "0.00";
        }
        else {
          return priceMath;
        }
    }
    //组件受控
    handleChange(type,event){
        switch (type){
            case 1:
                if(event.target.value.length>30){
                    return;
                }
                this.setState({
                    name:event.target.value
                });
                break;
            case 2:
                if(event.target.value.length>11){
                    return;
                }
                this.setState({
                    phone:event.target.value
                });
                break;
            case 3:
                if(event.target.value.length>50){
                    return;
                }
                this.setState({
                    details:event.target.value
                });
                break;
        }
        
    }
    //立即购买
    goBuy(){
        $request.fetchRequest("post","purchase",{
            id: this.state.goodsDetailsInfo.c_id,
            sa_id: this.state.goodsDetailsInfo.id,
            token: localStorage.getItem("token"),
            take_name: "发送到发",
            take_phone: "18485455555",
            address: "北京市 市辖区 东城区",
            detal_addr: "发送到发",
            price: 42,
            pay_way: '',
            return_url: '',

        },res=>{

        },err=>{

        })
    }
    render(){
        return (
            this.state.isShow
            ?
            <div className="goodsDetails">
                <div className="header">
                    <div className="swiper">
                        <Carousel
                        autoplay={true}
                        infinite={true}
                        >
                            {this.state.goodsDetailsInfo.banner.map((val,index)=>(
                                <img src={val} key={index} className="swiper-item" alt="banner"></img>
                            ))}
                        </Carousel>
                    </div>
                    <div className="goodsInfo">
                        <div className="name">{this.state.goodsDetailsInfo.name}</div>
                        <div className="price">
                            <div className="left">
                                <span className="symbol">￥</span>
                                <span className="money">{this.judgePrice()}</span>
                            </div>
                            <div className="right">券后价格</div>
                        </div>
                        <div className="other">
                            <span>原价：￥{this.state.goodsDetailsInfo.price}</span>
                            <span>{this.state.goodsDetailsInfo.receive_num}人已领取</span>
                            <span>仅剩{this.state.goodsDetailsInfo.true_stock}件</span>
                        </div>
                    </div>
                </div>
                <Common title="商品信息" content={this.state.goodsDetailsInfo.information}></Common>
                <Common title="收货地址">
                    <div className="form">
                        <div className="inputValue">
                            <input value={this.state.name} onChange={this.handleChange.bind(this,1)} placeholder="收货人姓名"></input>
                        </div>
                        <div className="inputValue">
                            <input value={this.state.phone} onChange={this.handleChange.bind(this,2)} placeholder="收货人联系电话"></input>
                        </div>
                        <div className="inputValue" onClick={()=>{this.setState({pickerShow:true})}}>
                            <span>所在地区</span>
                            <span>&gt;</span>
                        </div>
                        <div className="inputValue">
                            <input value={this.state.details} onChange={this.handleChange.bind(this,3)} placeholder="详细地址：如道路、门牌号、小区、楼栋号等"></input>
                        </div>
                    </div>
                </Common>
                <Common title="购前须知" content={this.state.goodsDetailsInfo.tips}></Common>
                <Picker
                visible = {this.state.pickerShow}
                data={this.state.sourceData}
                onDismiss={()=>{this.setState({pickerShow:false})}}
                onOk={()=>{this.setState({pickerShow:false})}}
                ></Picker>
                <div onClick={this.goBuy}>立即购买</div>
            </div>
            :
            null
            // <Hidden visible={this.state.isShow}>
            //     <div className="goodsDetails">
            //         <div className="swiper">
            //             <Carousel>
            //                 {this.state.goodsDetailsInfo.banner.map((val,index)=>(
            //                     <img src={val} key={index} className="swiper-item"></img>
            //                 ))}
            //             </Carousel>
            //         </div>
            //     </div>
            // </Hidden>
        );
    }
}
export default GoodsDetails;