/*  configure.js 파일
    - store를 생성하는 함수 configure를 구현함.
    - 추후 서버사이드 렌더링 할 때 store 생성 함수를 서버에서도 호출해야하기 때문에 따로 만들어둚.
*/

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import penderMiddleware from "redux-pender";
import * as modules from "./modules";

const reducers = combineReducers(modules); // modules에 있는 모든 modules들을 combineReducers로 합쳐줌.
const middlewares = [penderMiddleware()]; // penderMiddleware 적용.

// 개발 모드일 때만 Redux Devtools를 적용.
const isDev = process.env.NODE_ENV === "development";
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

// preloadedState는 추후 서버사이드 렌더링을 했을 때 전달받는 초기 상태이다.
const configure = preloadedState =>
  createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

export default configure;
