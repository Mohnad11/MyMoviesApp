import React from "react";
import {StyleProp, Text, TextProps, TextStyle,} from "react-native";


export default class AppText extends React.Component<TextProps>{
    render() {
        return(
           <Text numberOfLines={this.props.numberOfLines} style={[this.props.style,{fontFamily:'Grandstander-SemiBold'}]}>{this.props.children}</Text>
        )
    }
}
