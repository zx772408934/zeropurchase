import React from 'react';
export default class About extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        // console.log(this.props)
        return(
           <div>
                <div>helll,周鑫</div>
                {this.props.children}
           </div>
        );
    }
}