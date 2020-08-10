import React from 'react';
export default class About extends React.Component{
    render(){
        return(
           <div>
                <div>helll,周鑫</div>
                {this.props.children}
           </div>
        );
    }
}