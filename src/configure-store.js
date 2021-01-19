import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './store';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

export const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument({ 
        API_URI: process.env.REACT_APP_API_URI,
        AUTH_URI: process.env.REACT_APP_AUTH_URI 
    }))),
);
