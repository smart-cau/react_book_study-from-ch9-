import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";

// 리덕스 관련 불러오기
import { createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";

const store = createStore(
  reducers,
  // 0. redux dev tool을 쓰기 위한 설정.
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
