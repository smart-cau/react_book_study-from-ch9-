// 5. 스토어 생성.
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";

// 리덕스 관련 불러오기
import { createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";

// 스토어 생성
const store = createStore(reducers);

ReactDOM.render(
  // 6. 스토어를 리액트 컴포넌트에 전달.
  // - Provider 컴포넌트로 리액트 앱에 store 연동.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
