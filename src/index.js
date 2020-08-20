import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore ,combineReducers } from 'redux'
import { Provider ,connect} from 'react-redux'
// import {counter} from "./store/store"


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

let Container = connect(mapStateToProps,mapDispatchToProps)(App)

const counter = (state = { count: 0 }, action)=> {
  console.log(action)
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// const rootReducers = combineReducers({counter});
const store = createStore(counter);

// const INCREMENT = 'INCREMENT'
// const incrementAction = {"type": INCREMENT, "count": 12121}
// store.dispatch(incrementAction);

ReactDOM.render(
  <Provider store={store}>
      <Container />
  </Provider>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
