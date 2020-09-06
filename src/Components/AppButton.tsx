import React from "react";
import {StyleProp, Text, TouchableOpacity, ViewStyle} from "react-native";
import AppText from "./AppText";

interface IProps{
    style?:StyleProp<ViewStyle>;
    text:string;
    width?:number | string;
    height?:number | string;
    backgroundColor?:string;
    color?:string;
    onPress?:Function;
}
export default class AppButton extends React.Component<IProps>{
    render() {
        return(
            <TouchableOpacity onPress={()=>this.props.onPress ? this.props.onPress() : null} style={{width:this.props.width ? this.props.width : 120,height:this.props.height ? this.props.height : 35,justifyContent:'center',alignItems:'center',backgroundColor:this.props.backgroundColor ? this.props.backgroundColor : '#356BE5',borderRadius:5}} >
                <AppText style={{fontSize:14,fontWeight:'600',color:this.props.color ? this.props.color : '#fff'}}>{ this.props.text }</AppText>
            </TouchableOpacity>
        )
    }
}
