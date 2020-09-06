import React from "react";
import {Image, TouchableOpacity} from "react-native";
import AppText from "./AppText";
interface IProps{
    navigation:any
}
export default class HeaderBackButton extends React.Component<IProps>{
    render() {
        return(
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:5}} onPress={()=>this.props.navigation.goBack()}>
                <Image source={require('../assets/back.png')} style={{width:20,height:20}}/>
                <AppText style={{fontSize:16,fontWeight:'700',color:'white',marginLeft:5}}>back</AppText>
            </TouchableOpacity>
        )
    }
}
