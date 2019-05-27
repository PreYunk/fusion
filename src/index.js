import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import addQuestionReducer from './store/reducers/addQuestion';
import generatePaperReducer from './store/reducers/generatePaper';
import selectQuestionsReducer from './store/reducers/selectQuestions';
import loginReducer from './store/reducers/login';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.baseURL = 'https://polar-sea-14304.herokuapp.com/api';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
   addQuestionReducer,
   generatePaperReducer,
    selectQuestionsReducer,
    loginReducer
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const app = window.innerWidth >= 500 ?
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>: <h1 style={{color: '#52E5AA'}}>THIS APP IS NOT SUPPORTED FOR MOBILE DEVICES YET </h1>;

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
