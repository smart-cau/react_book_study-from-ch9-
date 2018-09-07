// 1. 기본적인 틀 생성. containers/App.js
import React, { Component } from "react";
import CounterContainer from "./CounterContainer";

class App extends Component {
  render() {
    return (
      <div>
        <CounterContainer />
      </div>
    );
  }
}

export default App;
