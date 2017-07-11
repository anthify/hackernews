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
  routerMiddleware,
  push
} from "react-router-redux";

import stories from "./reducers/stories";

import Stories from "./containers/Stories";
import Comments from "./containers/Comments";
import Header from "./containers/Header";

import { Colors } from "./constants";

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
  background: ${Colors.background};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppViewPort = styled.div`
  background: ${Colors.light};
  width: 100vw;
  height: 100vh;
  box-shadow: 5px 21px 31px 0px rgba(46, 61, 73, 0.2);
  position: relative;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
    max-width: 400px;
    height: 667px;
    border-radius: 5px;
  }
`;

const Content = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  margin-top: 70px;
  @media only screen and (min-width: 768px) {
    max-width: 400px;
    height: calc(667px - 70px);
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppWrapper>
        <AppViewPort>
          <Route exact path="/*" component={Header} />
          <Content>
            <Route exact path="/" component={Stories} />
            <Route exact path="/comments/:id" component={Comments} />
            <Route exact path="/comments/:id/:comment" component={Comments} />
          </Content>
      </AppViewPort>
      </AppWrapper>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
