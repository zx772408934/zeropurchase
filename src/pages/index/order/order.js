import React from "react";
import ReactDOM from 'react-dom'
import { PullToRefresh , ListView } from "antd-mobile"
class Order extends React.Component{
    constructor(props){
        super(props);
        //这个dataSource有cloneWithRows方法
        const dataSource = new ListView.DataSource({  
            rowHasChanged: (row1, row2) => row1 !== row2,
        });   
        this.state = {
            dataSource:dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,

            refreshStatus:true
        }
    }
    componentDidMount(){

        //根据不同的useBodyScroll模式调整高度
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        //接口获取到的数据
        this.arr = Array(8).fill(1);
        //初始化this.state.dataSource
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.arr),
            height: hei,
            refreshing: false,
            isLoading: false,
        });
    }
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
          document.body.style.overflow = 'auto';
        } else {
          document.body.style.overflow = 'hidden';
        }
      }
    //下拉刷新
    refresh = ()=>{
        setTimeout(()=>{
            this.setState({
                refreshStatus:false
            });
        },500);
    }
    //上拉加载
    onEndReached = ()=>{
        //如果this.state.hasMore为false，说明没数据了，直接返回
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        
        //这里是请求接口
        this.setState({ isLoading: true });
        let arr = Array(8).fill(1) 

        //每次下拉之后将接口获取到的新数据装填过来
        this.arr = [...this.arr, ...arr];  

        //修改源数据
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.arr),
            isLoading: false,
        });
    }
    render(){
        //这里就是个渲染数据，rowData就是每次过来的那一批数据，已经自动给你遍历好了，rouID可以作为key值使用，直接渲染数据即可
        const row = (rowData, sectionID, rowID) => {
            return (
            <div key={rowID} style={{"height":"100px"}}>{rowData}</div>
            );
        };
        return(
            <div className="order">
                <div>2222222</div>
                <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                useBodyScroll={this.state.useBodyScroll}
                renderRow={row}   //渲染你上边写好的那个row
                style={this.state.useBodyScroll ? {} : {
                    height: this.state.height
                }}
                renderFooter={    //renderFooter就是下拉时候的loading效果，这里的内容可以自己随需求更改
                    () => (
                        <div style={{ padding: 10, textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>
                        )
                }
                onEndReached={this.onEndReached}
                onEndReachedThreshold={20}

                pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshStatus}
                    onRefresh={this.refresh}
                  />}
                ></ListView>
                {/* <PullToRefresh
                    distanceToRefresh="50"
                    refreshing = {this.state.refreshStatus}
                    onRefresh = {this.refresh}
                >
                    {elements}
                </PullToRefresh> */}
            </div>
        )
    }
}
export default Order;