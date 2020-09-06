import React from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    BackHandler,
    Easing,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    View
} from "react-native";
import AppButton from "../Components/AppButton";
import HttpRequest from "../Utilities/HttpRequest";
import IMovie from "../Models/IMovie";
import MovieListItem from "../Components/MovieListItem";
import HideableView from "../Components/HideableView";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import IAppState from "../Models/IAppState";
import { connect } from "react-redux";
import LottieView from "lottie-react-native";
import AppText from "../Components/AppText";

type RootStackParamList = { FavoriteMoviesList:undefined };
type routeProp = RouteProp<RootStackParamList, 'FavoriteMoviesList'>;
type navigationProp = StackNavigationProp<RootStackParamList, 'FavoriteMoviesList'>;
interface IProps{
    navigation:navigationProp
    route:routeProp;
    favMovies:IMovie[]
}
interface IState{
    progress:any;
}
class FavoriteMoviesList extends React.Component<IProps>{
    state:IState={
        progress:new Animated.Value(0),
    }
    componentDidMount() {
        if(this.props.favMovies.length==0){
            this.startEmptyFavListAnimation()
        }
        BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler)
    }
    backButtonHandler=()=>{
        this.props.navigation.pop();
        return true;
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',this.backButtonHandler)
    }
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.props.favMovies.length!=prevProps.favMovies.length && this.props.favMovies.length==0){
            this.startEmptyFavListAnimation()
        }
    }
    startEmptyFavListAnimation(){
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver:true,
        }).start();
    }
    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
                <StatusBar barStyle={"light-content"}/>
                <HideableView hidden={this.props.favMovies.length==0} style={{flex:1}} >
                    <FlatList
                        data={this.props.favMovies}
                        renderItem={({item})=><MovieListItem item={item} navigation={this.props.navigation} isFavList={true}/>}
                        keyExtractor={(index:IMovie)=>index.id.toString()}
                    />
                </HideableView>
                <HideableView hidden={this.props.favMovies.length>0} style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
                    <LottieView source={require('../assets/empty-animation.json')} progress={this.state.progress} resizeMode={'cover'} style={{width:250,height:250,alignSelf:'center'}}/>
                    <AppText style={{fontSize:22,fontWeight:'500',}}>Your Favorite List Is Empty,</AppText>
                </HideableView>
            </SafeAreaView>

        );
    }
}
const mapStateToProps = (state:IAppState) => {
    return {
        favMovies:state.movie.favMovies
    };
};

const mapDispatchToProps ={

};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMoviesList);
