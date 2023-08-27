import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { getDataReducer } from '../reducers/getDataReducer';

const initialState = {
    loading:true
};

// all reducers  
const reducer = combineReducers({
    getData: getDataReducer
});

//https://extension.remotedev.io/#usage
//https://redux.js.org/api/compose
//connect to chrome redux developer extension (download the extension first in Chrome)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;