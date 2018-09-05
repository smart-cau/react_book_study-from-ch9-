/* Chapter 11. 컴포넌트 리렌더링 최적화
* rerendering속성 : 부모가 rerendering되면 자식도 rerendering 된다. -> 불필요한 자원낭비 초래 가능.
* input에 내용을 입력하면, TodoInput에 변화가 생긴 것이므로 TodoInput만 rerendering되야 하는데
* 다른 Components들, TodoList와 TodoItem도 모두 rerendering되버림. -> rerendering속도 저하의 원인!
* 이 불필요한 rerendering을 TodoList에 shouldComponentUpdate를 통해 제어할 것임.
*/

import React, { Component } from "react";
import PageTemplate from "./PageTemplate";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

// 길이가 500이고 내용을 아래와 같이 채운 배열을 만듬. (dummy data)
const initialTodos = new Array(500)
  .fill(0)
  .map((foo, index) => ({ id: index, text: `일정 ${index}`, done: false }));

class App extends Component {
  state = {
    input: "",
    todos: initialTodos
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState({
      input: value
    });
  };

  // 현재 500개의 data가 들어 있어 새로운 값은 id가 500 이후로 들아갸야 오류가 없음.
  id = 500;
  getId = () => {
    return ++this.id;
  };

  handleInsert = () => {
    const { todos, input } = this.state;

    const newTodo = {
      text: input,
      done: false,
      id: this.getId()
    };

    this.setState({
      todos: [...todos, newTodo],
      input: ""
    });
  };

  handleToggle = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    const toggled = {
      ...todos[index],
      done: !todos[index].done
    };

    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    });
  };

  handleRemove = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1, todos.length)]
    });
  };

  render() {
    const { input, todos } = this.state;
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;

    return (
      <PageTemplate>
        <TodoInput
          onChange={handleChange}
          onInsert={handleInsert}
          value={input}
        />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </PageTemplate>
    );
  }
}

export default App;

/* Chapter 11 정리
 * shouldComponentUpdate를 구현해야 하는 경우
   1. 컴포넌트 배열이 렌더링 되는 '리스트' 컴포넌트 일 때
   2. 리스트 컴포넌트 내부에 있는 '아이템' 컴포넌트 일 때
   3. 하위 컴포넌트 개수가 많으며, rerendering되지 말아야 할 상황에서도 리렌더링이 진행될 때.
   - '리스트'를 렌더링할 때는 '언제나' shouldComponentUpdate를 구현해 놓는 것을 습관화 해두자.
   - 나머지 경우에는 프로젝트를 작업하면서 버벅거린다고 느낄 때 성능조사를 하고, 상황에 따라
     shouldComponentUpdate를 구현하면 좋다.
*/
