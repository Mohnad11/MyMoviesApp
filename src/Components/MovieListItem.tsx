import React from "react";
import IMovie from "../Models/IMovie";
import {Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import AppText from "./AppText";
import Consts from "../Utilities/Consts";
import AppButton from "./AppButton";
import IAppState from "../Models/IAppState";
import {connect} from "react-redux";
import {addMovieToFav, removeMovieFromFav} from "../Reducers/MoviesActions";
import {AnyAction} from "redux";
import HideableView from "./HideableView";
import AlertModal from "./AlertModal";
interface IProps{
    item:IMovie;
    navigation:any;
    isFavList?:boolean;
    favMovies:IMovie[]
    addMovieToFav:(movie:IMovie)=>AnyAction;
    removeMovieFromFav:(movieId:number)=>AnyAction;
}
interface IState{
    isOnFavList:boolean;
    isAlertShowing:boolean;
    alertText:string;
}
class MovieListItem extends React.Component<IProps>{
    state:IState={
        isOnFavList:false,
        isAlertShowing:false,
        alertText:'',
    }
    componentDidMount() {
        if(this.props.isFavList){
            this.setState({isOnFavList:true})
            return;
        }
        let temp=this.props.favMovies;
        if(temp.find(m=>m.id==this.props.item.id)){
            this.setState({isOnFavList:true})
        }
    }
    addMovieToFavorites(){
        this.props.addMovieToFav(this.props.item)
        this.setState({isOnFavList:true})
        this.setState({isAlertShowing:true,alertText:'Movie added to favorite successfully'})
    }
    removeMovieFromFavorites(){
        this.props.removeMovieFromFav(this.props.item.id)
        this.setState({isOnFavList:false})
        this.setState({isAlertShowing:true,alertText:'Movie removed from favorite successfully'})
    }
    render() {
        return(
            <View style={{marginLeft:15,marginRight:15,paddingLeft:5,paddingRight:5,flexDirection:'row',height:110,paddingBottom:10,marginTop:10,borderBottomWidth:1,borderBottomColor:'#356BE5'}}>
                <View style={{flex:0.3}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MovieScreen',{movie:this.props.item})}>
                        <Image style={{width:'100%',height:'100%'}} source={{uri:Consts.IMAGES_PATH+this.props.item.poster_path}}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.7,paddingLeft:5}}>
                    <AppText numberOfLines={1} style={{fontSize:16,fontWeight:'600'}}>{this.props.item.title}</AppText>
                    <AppText numberOfLines={2} style={{fontSize:15,fontWeight:'400',marginTop:3}}>{this.props.item.overview}</AppText>
                    <HideableView hidden={this.state.isOnFavList} style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                        <AppButton width={'49%'} text={'read more..'} onPress={()=>this.props.navigation.navigate('MovieScreen',{movie:this.props.item})}/>
                        <AppButton  width={'49%'} onPress={()=>this.addMovieToFavorites()} text={'add to favorite'}/>
                    </HideableView>

                    <HideableView hidden={!this.state.isOnFavList} style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                        <AppButton  width={'100%'} onPress={()=>this.removeMovieFromFavorites()} text={'remove from favorite'}/>
                    </HideableView>

                </View>
                <AlertModal show={this.state.isAlertShowing} text={this.state.alertText} closeCallBack={()=>this.setState({isAlertShowing:false})} isError={false}/>
            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieListItem);
