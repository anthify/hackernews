import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";

import thunkMiddleware from "redux-thunk";

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";

import stories from "./reducers/stories";

import Stories from "./containers/Stories";

import "./index.css";

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    stories,
    router: routerReducer
  }),
  applyMiddleware(middleware, thunkMiddleware)
);

const AppWrapper = styled.div`
  background-image: linear-gradient(to bottom right, #02b3e4, #02ccba);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppViewPort = styled.div`
  width: 400px;
  height: 670px;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
  border-radius: 5px;
  box-shadow: 5px 5px 25px 0px rgba(46,61,73,0.2);
`;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppWrapper>
        <AppViewPort>
          <Route exact path="/" component={Stories} />
        </AppViewPort>
      </AppWrapper>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
