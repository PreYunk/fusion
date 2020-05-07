import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { Context, Node } from "react-mathjax2";
import "./index.css";
import App from "./App";
import MobileApp from "./components/MobileApp/MobileApp";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import addQuestionReducer from "./store/reducers/addQuestion";
import generatePaperReducer from "./store/reducers/generatePaper";
import selectQuestionsReducer from "./store/reducers/selectQuestions";
import loginReducer from "./store/reducers/login";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

import Editor2 from "./components/Editor2/Editor2";

axios.defaults.baseURL = "http://localhost:3001/api";
// axios.defaults.baseURL = "https://polar-sea-14304.herokuapp.com/api";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
  addQuestionReducer,
  generatePaperReducer,
  selectQuestionsReducer,
  loginReducer,
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <HashRouter basename="/fusion">
      {window.innerWidth >= 700 ? <App /> : <App mobile />}
    </HashRouter>
  </Provider>
);
const math = (
  <Context input="tex">
    <Node>Hello Word</Node>
  </Context>
);
// <Editor2 width="100%" height="500px" />
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
