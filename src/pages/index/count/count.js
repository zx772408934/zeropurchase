import React from "react";

import { connect } from 'react-redux'

import { bindLifecycle } from 'react-keep-alive';

import store from "../../../store/store"

function Test(props) {
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
    onIncreaseClick: () => dispatch({ type: 'increase' })
  }
}


// console.log(Container)
@bindLifecycle
// @connect(mapStateToProps, mapDispatchToProps)
class Counter extends React.Component {

  componentDidActivate() {
   
    
    console.log('TestClass: componentDidActivate')
  }
  componentWillUnactivate() {
    console.log('TestClass: componentWillUnactivate')
  }
  testdis(){
    store.dispatch({ type: 'increase' });
    console.log(store.getState().count)
  }
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={this.testdis}>Increase</button>
      </div>
    )
  }
}

export default Counter;
// export default connect(

//   mapStateToProps, mapDispatchToProps, null, { forwardRef: true }

// )(Counter);
// export default Counter;