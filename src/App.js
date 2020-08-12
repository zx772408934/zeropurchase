import React from 'react';
//引入路由配置
// import Router from './router/router'
//引入antd-mobile CSS
import 'antd-mobile/dist/antd-mobile.css'

import Home from './Home/Home'
import About from './About/About'
import { HashRouter ,Route ,Redirect ,Switch} from 'react-router-dom'

// import {HashRouter , Route , Link , NavLink} from 'react-router-dom'
class App extends React.Component{


  componentDidMount(){
     //自适应
     document.getElementsByTagName('html')[0].style.fontSize = document.getElementsByTagName('html')[0].offsetWidth /
     7.50 + 'px';
  }
  render(){
    return(
      // <div className='App'>
        <HashRouter>
           {/* <Switch> */}
                <Route path="/" exact render={()=>(<Redirect to="/home"></Redirect>)}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/about" component={About}></Route>
                <Redirect from="/*" to="/home" />
           {/* </Switch> */}
        </HashRouter>
      // </div>
    );
  }
}

export default App;
