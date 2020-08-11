import React from 'react';
import Router from './router/router'

// import {HashRouter , Route , Link , NavLink} from 'react-router-dom'
function App(props){

  return(
    <div className='App'>
      <div className="nav">这是导航</div>
      <Router></Router>
      <div className="footer">这是结尾</div>
    </div>
  );
}
export default App;
