// App.js에서 웹 브라우저의 주소에 따라 어떤 컴포넌트를 보여 줄지 정의할 것임.
import React from "react";
import { Route } from "react-router-dom";
import { Home, About } from "./pages";

const App = () => {
  return (
    <div>
      {/* Route 컴포넌트 안에서,
          - path 값으로 경로 설정.
          - component 값으로 경로에 따라 렌터링할 component 설정.
          - exact로 설정한 path와 정확히 일치할 때만 보이도록 설정.
      */}
      <Route exact path="/" component={Home} />
      {/* 1번 . params 사용. */}
      {/* <Route exact path="/about" component={About} /> */}
      <Route path="/about/:name?" component={About} />
      {/* params객체 안에 .name이라는 key가 생김. ?옵션을 통해 컴포넌트의 중복 방지. */}
    </div>
  );
};

export default App;
