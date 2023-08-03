import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk'
import rootReducer from './reducer';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // Esta app nos sirve para conectarnos con la extension redux del navegador 

export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunkMiddleWare))); // esta linea nos permite hacer peticiones a una api (servidor)


// import {createStore, applyMiddleware} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducer'

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
   