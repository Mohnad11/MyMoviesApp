import IMovieState from "../Models/IMovieState";
import AsyncStorage from '@react-native-community/async-storage';
const MoviesReducer =  {
    SAVE_MOVIES:saveMovies,
    ADD_MOVIE_TO_FAV:addMovieToFav,
    REMOVE_MOVIE_FROM_FAV:removeMovieFromFav
}

function removeMovieFromFav(state:IMovieState, action:any){
    let movieId=action.movieId;
    let movies=state.favMovies;
    movies=movies.filter(m=>m.id!=movieId);
    AsyncStorage.setItem('favMovies',JSON.stringify(movies))
    return { ...state, ...{favMovies:movies} };
}
function addMovieToFav(state:IMovieState, action:any){
    let movies=state.favMovies;
    movies.push(action.movie);
    AsyncStorage.setItem('favMovies',JSON.stringify(movies))
    return { ...state, ...{favMovies:movies} };
}
function saveMovies(state:IMovieState, action:any) {
    return { ...state, ...{favMovies:action.movies} };

}

export default MoviesReducer
