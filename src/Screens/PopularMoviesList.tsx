import React from "react";
import {
    ActivityIndicator,
    Alert,
    BackHandler,
    FlatList,
    Image,
    RefreshControl,
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
import {connect} from "react-redux";

type RootStackParamList = { PopularMoviesList:undefined };
type routeProp = RouteProp<RootStackParamList, 'PopularMoviesList'>;
type navigationProp = StackNavigationProp<RootStackParamList, 'PopularMoviesList'>;
interface IProps{
    navigation:navigationProp
    route:routeProp
}
interface IState{
    movies:IMovie[];
    page:number;
    fetching:boolean;
    refreshing:boolean;
}
class PopularMoviesList extends React.Component<IProps>{
    state:IState={
        movies:[],
        page:1,
        fetching:false,
        refreshing:false
    }
    componentDidMount() {
        this.fetchData();
        BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler)
    }
    backButtonHandler=()=>{
        this.props.navigation.pop();
        return true;
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',this.backButtonHandler)
    }
    fetchData(){

        if(this.state.fetching)
            return;
        let page=this.state.page;
        this.setState({fetching:true})
        HttpRequest('discover/movie?sort_by=popularity.desc&page='+page,'GET').then((result)=>{
            if(this.state.refreshing){
                this.setState({movies:result.data.results})
            }else{
                let movies=[...this.state.movies,...result.data.results];
                this.setState({movies:movies})
            }

        }).catch(e=>{

        }).finally(()=>{
            this.setState({fetching:false,refreshing:false})
        })
        this.setState({page:page+1})
    }
    refresh(){
        this.setState({page:1,refreshing:true},()=>{
            this.fetchData();
        })
    }
    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
                <StatusBar barStyle={"light-content"}/>
                <View style={{flex:1}}>
                    <HideableView hidden={this.state.movies.length==0 ? true : false} style={{height:'100%'}}>
                        <FlatList
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.refresh()} />}
                            onEndReached={()=>this.fetchData()}
                            onEndReachedThreshold={0.9}
                            data={this.state.movies}
                            renderItem={({item})=><MovieListItem item={item} navigation={this.props.navigation}/>}
                            keyExtractor={(index:IMovie)=>index.id.toString()}
                        />
                    </HideableView>

                    {/* small loader showing when load more movies ( lazy load ) */}
                    <HideableView hidden={this.state.fetching && this.state.movies.length>0 ? false : true }>
                        <ActivityIndicator color={'#356BE5'} size={'small'}></ActivityIndicator>
                    </HideableView>

                    {/* bug loader showing only at first load */}
                    <HideableView style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}} hidden={this.state.fetching && !this.state.refreshing &&  this.state.movies.length==0  ? false : true }>
                        <ActivityIndicator color={'#356BE5'} size={'large'}></ActivityIndicator>
                    </HideableView>

                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PopularMoviesList);
