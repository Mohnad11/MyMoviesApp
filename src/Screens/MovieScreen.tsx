import React from "react";
import {
    ActivityIndicator,
    Alert, BackHandler,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
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
import Consts from "../Utilities/Consts";
import AppText from "../Components/AppText";
import IAppState from "../Models/IAppState";
import {connect} from "react-redux";
import {addMovieToFav, removeMovieFromFav} from "../Reducers/MoviesActions";
import {AnyAction} from "redux";
import AlertModal from "../Components/AlertModal";
type RootStackParamList = { MovieScreen: { movie:IMovie } };
type routeProp = RouteProp<RootStackParamList, 'MovieScreen'>;
type navigationProp = StackNavigationProp<RootStackParamList, 'MovieScreen'>;
interface IProps{
    navigation:navigationProp
    route:routeProp
    favMovies:IMovie[]
    addMovieToFav:(movie:IMovie)=>AnyAction;
    removeMovieFromFav:(movieId:number)=>AnyAction;
}
interface IState{
    isAlertShowing:boolean;
    alertText:string;
    isOnFavList:boolean;
}
const deviceWidth=Dimensions.get('window').width;
class MovieScreen extends React.Component<IProps>{
    state:IState={
        isAlertShowing:false,
        alertText:'',
        isOnFavList:false
    }
    componentDidMount() {
        let movieTitle=this.props.route.params.movie.title;
        this.props.navigation.setOptions({ headerTitle: movieTitle, });
        BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler)
        let temp=this.props.favMovies;
        if(temp.find(m=>m.id==this.props.route.params.movie.id)){
            this.setState({isOnFavList:true})
        }
    }
    backButtonHandler=()=>{
        this.props.navigation.pop();
        return true;
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',this.backButtonHandler)
    }
    addMovieToFavorites(){
        this.props.addMovieToFav(this.props.route.params.movie)
        this.setState({isOnFavList:true})
        this.setState({isAlertShowing:true,alertText:'Movie added to favorite successfully'})
    }
    removeMovieFromFavorites(){
        this.props.removeMovieFromFav(this.props.route.params.movie.id)
        this.setState({isOnFavList:false})
        this.setState({isAlertShowing:true,alertText:'Movie removed from favorite successfully'})
    }
    render() {
        const movie=this.props.route.params.movie;
        return (
            <SafeAreaView style={{flex:1}}>
                <StatusBar barStyle={"light-content"}/>
              <ScrollView>
                  <View style={{flex:1,paddingLeft:15,paddingRight:15,paddingTop:15,marginBottom:15}}>
                      <AppText style={{fontSize:22,fontWeight:'700'}}>{movie.title}</AppText>
                      <AppText style={{fontSize:16,fontWeight:'700'}}>{"released at "+movie.release_date}</AppText>

                      <Image source={{uri:Consts.IMAGES_PATH+movie.poster_path}} resizeMode={'cover'} style={{marginTop:15,marginBottom:15,width:deviceWidth-25,height:deviceWidth-25,alignSelf:'center'}}/>

                      <AppText style={{fontSize:17,fontWeight:'500'}}>{movie.overview}</AppText>

                      <AppText style={{fontSize:17,fontWeight:'500',marginTop:15}}>{"popularity: "+movie.popularity.toFixed(2)}</AppText>
                      <AppText style={{fontSize:17,fontWeight:'500',marginTop:0,marginBottom:15}}>{"vote: "+movie.vote_average}</AppText>

                      <AppButton width={'100%'} onPress={()=>this.state.isOnFavList ? this.removeMovieFromFavorites() : this.addMovieToFavorites()} text={this.state.isOnFavList?'remove from favorite':'add to favorite'}/>
                      <AlertModal show={this.state.isAlertShowing} text={this.state.alertText} closeCallBack={()=>this.setState({isAlertShowing:false})} isError={false}/>

                  </View>
              </ScrollView>
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
    addMovieToFav:addMovieToFav,
    removeMovieFromFav:removeMovieFromFav
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieScreen);
