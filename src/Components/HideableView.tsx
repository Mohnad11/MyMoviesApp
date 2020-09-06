import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    FlatList,
    Image,
    ImageBackground,
    TextProps, ViewProps
} from 'react-native';
import { connect } from 'react-redux';

import {AnyAction} from "redux";


import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';


type ProjectsScreenNavigationProp = StackNavigationProp< any, 'Projects'>;
interface IProps {
    hidden?:boolean;
}
interface IState {

}

export default class HideableView extends React.Component<IProps & ViewProps> {

    state:IState={

    }
    componentDidMount() {

    }

    render() {
        return(
            <View style={[this.props.style,{display:this.props.hidden?'none':'flex'}]} >
                {this.props.children}
            </View>
        );
    }
}

