import React,{Component} from 'react'
import $request from '../tools/request'
export default class Home extends Component{
    // constructor(props){
    //     super(props);
    // }

    componentDidMount(){
       
        $request.fetchRequest('post','putView',{
            token:'1223',
            id:'3333'
        },res=>{

        },err=>{

        })
    }

    render(){
        return(
            <div>hello,zx</div>
        );
    }
}