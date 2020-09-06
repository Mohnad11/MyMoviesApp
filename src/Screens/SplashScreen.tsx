import React from "react";
import {Image, View, Animated, Easing, StatusBar} from "react-native";
import LottieView from 'lottie-react-native';
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import IAppState from "../Models/IAppState";
import {saveMovies} from "../Reducers/MoviesActions";
import {connect} from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import IMovie from "../Models/IMovie";
import {AnyAction} from "redux";

type RootStackParamList = { Splash:undefined };
type routeProp = RouteProp<RootStackParamList, 'Splash'>;
type navigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
interface IProps{
    navigation:navigationProp
    route:routeProp
    saveMovies:(movies:IMovie[])=>AnyAction
}
interface IState{
    loading:boolean;
    progress:any
}
class SplashScreen extends React.Component<IProps>{
    state:IState={
        loading:false,
        progress:new Animated.Value(0),
    }

    componentDidMount() {
        this.getSavedFavoriteMovies();
        Animated.loop(
            Animated.timing(this.state.progress, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver:true,
            }),
            {
                iterations:5
            }
        ).start()

        setTimeout(()=>{
            this.props.navigation.navigate('Welcome')
        },2000)
    }
    async getSavedFavoriteMovies(){
        let moviesJson=await AsyncStorage.getItem('favMovies')

        if(moviesJson){
            let movies=JSON.parse(moviesJson)
            this.props.saveMovies(movies)
        }
    }
    render() {
        return (
            <View style={{flex:1,width:'100%',height:'100%',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                <StatusBar barStyle={"light-content"}/>
                <Image source={require('../assets/logo.png')}  resizeMode={'cover'}/>
                <LottieView source={require('../assets/loader.json')} progress={this.state.progress} style={{width:100,height:100,alignSelf:'center',marginTop:50}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
