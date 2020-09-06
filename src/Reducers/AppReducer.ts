
import {combineReducers} from "redux";
import {Alert} from "react-native";
import IAppState from "../Models/IAppState";
import MoviesReducer from "./MoviesReducer";


const defualtState:IAppState={

    movie:{favMovies:[]}

}
function createReducer(initialState:any, handlers:any) {
    return function reducer(state = initialState, action:any) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

const movie = createReducer(defualtState.movie, MoviesReducer)

const AppReducer = combineReducers({
    movie
})

export default AppReducer
