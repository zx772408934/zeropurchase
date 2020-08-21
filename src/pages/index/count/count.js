import React from "react";

import { connect } from 'react-redux'


function Test(props){
    console.log(props);
    return (
        <div>11111</div>
    )
}
function mapStateToProps(state) {
    return {
      value: state.count
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      onIncreaseClick: () => dispatch()
    }
  }
  

  // console.log(Container)

class Counter extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    render() {
        console.log(this.props)
        const { value, onIncreaseClick } = this.props
        return (
            <div>
                <Test></Test>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        )
    }
}
connect(mapStateToProps, mapDispatchToProps)(Counter)



export default Counter;