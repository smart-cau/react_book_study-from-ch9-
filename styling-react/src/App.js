import React, { Component } from "react";
import Button from "./components/Button";

class App extends Component {
  render() {
    return (
      <div>
        <Button>버튼</Button>
      </div>
    );
  }
}

export default App;
/*
Chapter 9. CSS Module 사용.
이와 같은 일반적인 CSS 방식은 사용하기에는 편하지만,
프로젝트를 진행하다 보면 코드가 복잡해져서 가독성이 쉽게 떨어질 수 있음.
이를 해결하기 위해 Sass와 같은 CSS 전처리기 도구를 사용한다.
*/
