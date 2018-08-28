import React, { Component } from "react";
import PageTemplate from "./PageTemplate";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

class App extends Component {
  state = {
    input: "", // input 값.
    // 일정 데이터 초기값.
    todos: [
      { id: 0, text: "리액트 공부하기", done: true },
      { id: 1, text: "컴포넌트 스타일링 해보기", done: false }
    ]
  };

  handleChange = e => {
    const { value } = e.target; // 비구조화 할당 사용! 이거 유용하네

    this.setState({
      input: value
    });
  };

  render() {
    const { input, todos } = this.state; // const input = this.state.input;
    const { handleChange } = this; // const handleChange = this.handleChange;

    return (
      <PageTemplate>
        {/* onChange와 value의 props를 전달! props와 상태에 대해 조금씩 알아가는 것 같다. */}
        <TodoInput onChange={handleChange} value={input} />
        <TodoList todos={todos} />
      </PageTemplate>
    );
  }
}

export default App;
