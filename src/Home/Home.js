import React,{Component} from 'react'
export default class Home extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let formData = new FormData();
        formData.append('token','login');
        formData.append('c','login');
        formData.append('username', 1);
        formData.append('password', 2);
        formData.append('client', 'android');
        fetch('http://api-dev.nly6.com/index.php/putView',{
            method:'post',
            body:formData
        }).then(function (res) {
            console.log(res);
            return res.json();
        }).then(function (json) {
            console.log(json);
        })
    }

    render(){
        return(
            <div>hello,zx</div>
        );
    }
}