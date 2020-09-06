import {Dispatch} from "redux";
import IMovie from "../Models/IMovie";


export function addMovieToFav(movie:IMovie){
    return (dispatch: Dispatch) => {
        return dispatch({
            type: 'ADD_MOVIE_TO_FAV',
            movie
        });
    };
}
export function removeMovieFromFav(movieId:number){
    return (dispatch: Dispatch) => {
        return dispatch({
            type: 'REMOVE_MOVIE_FROM_FAV',
            movieId
        });
    };
}
export function  saveMovies(movies:IMovie[]){
    return (dispatch: Dispatch) => {

        return dispatch({
            type: 'SAVE_MOVIES',
            movies
        });
    };
}
