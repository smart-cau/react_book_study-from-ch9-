// Root.js에서 우리의 App에 BrowserRouter를 적용. 이것은 새로고침하지 않고도 페이지 주소를 교체할 수 있게 해줌.
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default Root;
