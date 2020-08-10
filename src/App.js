import React from 'react';
// import logo from './logo.svg';
// import './App.css';

class TestL extends React.Component{
  constructor(props){
    super(props);

    console.log(this.props.value)
  }
  componentWillMount(){
    console.log(11111)
    setTimeout(() => {
      console.log(2222222)
    }, 2000);
  }
  componentDidMount(){
    console.log(3333333333)
  }
  render(){
    return false;
  }
}

function App() {
  return (
    <div className="App">
      <TestL value='11111'></TestL>
    </div>
  );
}

export default App;
