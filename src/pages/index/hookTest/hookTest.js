import React,{ useState ,useContext ,useEffect,useReducer } from "react";

function TestDiv(props){

    useEffect(()=>{
        console.log(props)
        return () => {
            
        };
    });

    return <div>424234</div>
}

function HookTest(){
    // console.log(this)
    const [count,setCount] = useState(0);
    const [name,setName] = useState("zx");

    // const locale = useContext(LocaleContext);

    useEffect(()=>{
        console.log(99999999)
        return () => {
            
        };
    });

    return <div>
        {count}
        <TestDiv zx={123}></TestDiv>
        <button onClick={()=>{setCount(count+1)}}>点击</button>
        <button onClick={()=>{setName(name=='zx'?'zx1':'zx')}}>{name}</button>
    </div>
}
export default HookTest;