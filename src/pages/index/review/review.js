import React from "react";
import { ImagePicker ,Toast } from "antd-mobile";
import $common from "../../../tools/common";
import $request from "../../../tools/request";


class Review extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            files:[]
        }
    }
    onChange = (files, type, index) => {
        console.log(files);
        console.log(type);
        console.log(index);
        // return;
        //处理图片
        Toast.loading('loading...',0,null,true);
        $common.dealImg(files[0].file,res=>{
            $request.fetchRequest("post","putImage",{
                token:localStorage.getItem('token'),
                image:res
            },res=>{
                let obj = {};
                obj.url = res.url;
                obj.id = Math.floor(Math.random()*(1000-1)+1);
                this.setState({
                    files:this.state.files.concat(obj)
                });
                Toast.hide();
            },err=>{

            })
        });
      };
    onAddImageClick = (e)=>{
       
        // console.log(e);
        // e.preventDefault();
    }

    render(){
        return(
            <div>
                <input type="file"></input>
                {/* <ImagePicker
                length="6"
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 7}
                onAddImageClick={this.onAddImageClick}
                disableDelete
                >

                </ImagePicker> */}
            </div>
        )
    }
}
export default Review;