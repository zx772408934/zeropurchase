import React from 'react';
// import {withRouter} from 'react-router-dom'
class About extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.location)
    }
    render(){
        // console.log(this.props)
        return(
           <div>
                <div>helll,周鑫</div>
                {/* {this.props.children} */}
           </div>
        );
    }
}
export default About;