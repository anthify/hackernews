import { combineReducers } from "redux";
import { stories } from "./stories";
import { routerReducer } from "react-router-redux";

const reducers = {
  stories,
  routing: routerReducer
};

const rootReducers = combineReducers(reducers);

export default rootReducers;
