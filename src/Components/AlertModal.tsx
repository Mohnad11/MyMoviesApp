import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    View,
    AsyncStorage,
    I18nManager,
    StatusBar,
    Text,
    StyleSheet,
    AppState,
    TouchableOpacity, Modal, TextInput, TouchableWithoutFeedbackComponent, TouchableWithoutFeedback
} from 'react-native';
import {connect} from "react-redux";

// @ts-ignore

import AppButton from "./AppButton";
import AppText from "./AppText";


interface IProps {
    show:boolean;
    text:string;
    closeCallBack:Function;
    isError:boolean;
}
interface IState {

}
const width=Dimensions.get('window').width;
export default class AlertModal extends Component< IProps > {
    state:IState={
        show:this.props.show
    }
    componentDidMount(): void {
        if(this.props.show){
            this.startTimer()
        }
    }
    timer:any;
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.show != this.props.show ){
            this.setState({show:this.props.show})
            if(this.props.show){

                this.startTimer()
            }
        }
    }
    startTimer(){

        this.timer = setTimeout(() => {
            this.props.closeCallBack();
        }, 1500);
    }
    close(){
        this.props.closeCallBack();
    }

    render() {

        return(
            <Modal
                animationType="fade"
                transparent={true }
                visible={ this.props.show ? true : false}

                onRequestClose={() => {

                }}
            >
                <TouchableWithoutFeedback onPress={()=>this.close()}>
                    <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}} >
                        <View style={{paddingLeft:15,paddingRight:15,justifyContent:'center',width:width/1.4,minHeight:100,backgroundColor:this.props.isError?'red':'#356BE5',alignItems:'center',borderRadius:15,shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#D5D3D3', shadowOpacity: 0.8,elevation: 3}}>
                            <AppText style={{color:'#fff',fontSize:17,fontWeight:'700',textAlign:'center'}}>{this.props.text}</AppText>
                        </View>
                    </View>
                </TouchableWithoutFeedback>


            </Modal>
        )
    }
}
