import React from 'react'
import Home from '../Home/Home'
import About from '../About/About'
import Other from '../About/Other/Other'
import { BrowserRouter as Router ,Route } from 'react-router-dom'

function router (){
    return(
        <Router>
            <Route path="/home" component={Home}></Route>
            <Route path="/about" render={()=>(
                <About>
                    <Route path="/about/other" component={Other}></Route>
                </About>
            )}></Route>
        </Router>
    );
}
export default router;