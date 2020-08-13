import React from 'react';
import "./App.css"
//引入路由配置
import Router from './router/router'
//引入antd-mobile CSS
import 'antd-mobile/dist/antd-mobile.css'

class App extends React.Component{
  componentDidMount(){
     //自适应
     document.getElementsByTagName('html')[0].style.fontSize = document.getElementsByTagName('html')[0].offsetWidth /
     7.50 + 'px';
  }
  render(){
    return(
      <div className='App'>
          <Router></Router>
      </div>
    );
  }
}

export default App;
