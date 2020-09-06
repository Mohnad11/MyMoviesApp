import React from "react";
import {Alert, BackHandler, Image, StatusBar, View} from "react-native";
import AppButton from "../Components/AppButton";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import IAppState from "../Models/IAppState";
import {addMovieToFav, removeMovieFromFav, saveMovies} from "../Reducers/MoviesActions";
import {connect} from "react-redux";
import IMovie from "../Models/IMovie";
import {AnyAction} from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import AppText from "../Components/AppText";

type RootStackParamList = { Splash:undefined };
type routeProp = RouteProp<RootStackParamList, 'Splash'>;
type navigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
interface IProps{
    navigation:navigationProp
    route:routeProp
    saveMovies:(movies:IMovie[])=>AnyAction
}

class WelcomeScreen extends React.Component<IProps>{

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler)
    }
    backButtonHandler=()=>{
        return true;
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',this.backButtonHandler)
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar barStyle={"dark-content"}/>
                <View style={{flex:0.3333,width:'100%',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../assets/logo.png')}/>
                </View>
                <View style={{flex:0.3333,backgroundColor:'white',justifyContent:'center',alignItems:'center',paddingLeft:15,paddingRight:15}}>
                    <AppText style={{fontSize:28,fontWeight:'600',textAlign:'center'}}>Hi, nice to see you here,</AppText>
                    <AppText style={{fontSize:22,fontWeight:'500',textAlign:'center',lineHeight:20,marginTop:5}}>let's start watching the most popular movies in the world</AppText>
                </View>
                <View style={{flex:0.3333,width:'100%',flexDirection:'row',backgroundColor:'white',alignItems:'center',justifyContent:'space-around'}}>
                    <AppButton width={'44%'} onPress={()=>this.props.navigation.navigate('PopularMoviesList')} height={45} text={'Popular Movies'}></AppButton>
                    <AppButton width={'44%'} onPress={()=>this.props.navigation.navigate('FavoriteMoviesList')} height={45} text={'My Favorite Movies'}></AppButton>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state:IAppState) => {

    return {
        favMovies:state.movie.favMovies
    };
};

const mapDispatchToProps ={
    saveMovies:saveMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
