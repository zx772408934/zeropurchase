import React from 'react';
import "./App.css"
//引入路由配置
import ZXRouter from './router/router'
//引入antd-mobile CSS
import 'antd-mobile/dist/antd-mobile.css'

import 'react-animated-router/animate.css'; //引入默认的动画样式定义

//处理url参数
function getRequest() {
  var url = decodeURIComponent(window.location.href);
  var theRequest = new Object();
  if (url.indexOf("?") !== -1) {
    var str = url.split('?')[1];
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

class App extends React.Component{
  componentDidMount(){
    //判断是否为微信环境
    //判断微信环境 1表示微信环境2表示非微信环境
    let ua = navigator.userAgent.toLowerCase();
    //链接只能在微信环境中打开
    // if(!(ua.match(/MicroMessenger\/[0-9]/i))){
    //   MessageBox({
    //     title: '提示',
    //     message: '请在微信中打开该链接',
    //     confirmButtonClass: 'actionOverConfirm'
    //   });
    //   return;
    // }
    ua.match(/MicroMessenger\/[0-9]/i) ? localStorage.setItem('isWechat', 1) : localStorage.setItem('isWechat', 0);
     //自适应单位rem
     document.getElementsByTagName('html')[0].style.fontSize = document.getElementsByTagName('html')[0].offsetWidth /
     7.50 + 'px';

     if (getRequest().actId) {
      localStorage.setItem('actId', getRequest().actId);
    }
  }
  render(){
    return(
      <div className='App'>
          <ZXRouter></ZXRouter>
      </div>
    );
  }
}

export default App;
