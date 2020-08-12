import React from 'react';
//引入路由配置
import Router from './router/router'
//引入antd-mobile CSS
import 'antd-mobile/dist/antd-mobile.css'

// import {HashRouter , Route , Link , NavLink} from 'react-router-dom'
class App extends React.Component{


  componentDidMount(){
     //自适应
     document.getElementsByTagName('html')[0].style.fontSize = document.getElementsByTagName('html')[0].offsetWidth /
     7.50 + 'px';
  }
  render(){
    return(
      <div className='App'>
        <div className="nav">这是导航</div>
        <Router></Router>
        <div className="footer">这是结尾</div>
      </div>
    );
  }
}

export default App;
