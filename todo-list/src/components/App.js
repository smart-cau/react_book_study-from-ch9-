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

  // 일정 data 안에 들어가는 id 값
  id = 1; // 미리 배열에 data를 넣어둬서 최신 id 값이 1이여서 id=1로 설정.
  getId = () => {
    return ++this.id; // 현재 값에서 1을 더한 값을 반환.
  };

  // 새 데이터 추가.
  handleInsert = () => {
    const { todos, input } = this.state;

    // 새 데이터 객체 만들기
    const newTodo = {
      text: input,
      done: false,
      id: this.getId()
    };

    // 배열 안에 새 데이터를 집어넣음.
    this.setState({
      todos: [...todos, newTodo],
      input: ""
    });
  };

  render() {
    const { input, todos } = this.state; // const input = this.state.input;
    const { handleChange, handleInsert } = this; // const handleChange = this.handleChange;

    return (
      <PageTemplate>
        {/* onChange와 value의 props를 전달! props와 상태에 대해 조금씩 알아가는 것 같다. */}
        <TodoInput
          onChange={handleChange}
          onInsert={handleInsert}
          value={input}
        />
        <TodoList todos={todos} />
      </PageTemplate>
    );
  }
}

export default App;
