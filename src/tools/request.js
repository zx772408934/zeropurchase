import { Toast } from 'antd-mobile';
const httpRequest = {
    /*
    method 请求方式 String
    url 接口名称 String
    params 参数 Object
    successCallBack Function
    failCallBack Function
    */

    fetchRequest (method,url,params,successCallBack,failCallBack){
        if(method==='post'){
            let formData = new FormData();
            for(let i in params){
                formData.append(i,params[i]);
            }
            fetch(this.httpUrl.apiUrl+url,{
                method:'post',
                body:formData
            }).then( res => {
                /*
                *第一个res返回的不是真正的数据，而是一些其他数据，比如响应状态码、请求地址之类的。
                *需要调用res的json()方法来获取真正的数据，json()方法会返回一个promise
                */ 
                return res.json();
            }, err => {
                //接口调取失败
                Toast.info('请求失败', 2 , null ,false);
                failCallBack();
            }).then( json => {
                //这个时候才拿到了真正的数据
                console.log('成功');
                successCallBack();
            }, err=> {
                //接口调取失败
                Toast.info('请求失败', 2 , null ,false);
                failCallBack();
            });
        }
        else if (method==='get'){

            // let arr = Array.from(params);    //返回一个对象的属性值组成的数组,浅拷贝
            // console.log(arr)

            let urlAdd = this.httpUrl.apiUrl+url;

            let arrKeys = Object.keys(params);    //返回一个对象的属性名称组成的数组

            let arrValues = Object.values(params);    //返回一个对象的属性值组成的数组
            
            let lengthArr = arrKeys.length;//获取一个长度
            
            for(let i = 0;i<lengthArr;i++){

                if(urlAdd.indexOf('?')==-1){
                    urlAdd += "?";
                }

                urlAdd += arrKeys[i] + '=' + arrValues[i];

                if(i<lengthArr-1){
                    urlAdd += "&";
                }

            }
            fetch(urlAdd,{
                method:'get'
            }).then( res => {
                return res.json();
            }, err => {
                failCallBack();
            }).then( json => {
                successCallBack();
            }, error=> {
               
            });
        }
    },
    apiName:{

    },
    httpUrl:{
        apiUrl :'http://api-dev.nly6.com/index.php/',
        webUrl : 'http://api-dev.nly6.com/index.php/'
    }

}
export default httpRequest;