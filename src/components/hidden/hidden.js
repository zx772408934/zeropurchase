function Hidden(props){
    const visible = props.visible || false;
    return visible ? props.children : null;
}
export default Hidden;