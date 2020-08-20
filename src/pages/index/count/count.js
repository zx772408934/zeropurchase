import React from "react";

function Test(props){
    console.log(props);
    return (
        <div>11111</div>
    )
}


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




export default Counter;