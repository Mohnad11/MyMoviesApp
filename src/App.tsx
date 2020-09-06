import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import AppReducer from "./Reducers/AppReducer";
import React from "react";
import Router from "./Router";
const store = createStore(AppReducer, applyMiddleware(thunk));

function App() {

    return (
        <Provider store={store}>
            <Router/>
        </Provider>

    );
}

export default App;
