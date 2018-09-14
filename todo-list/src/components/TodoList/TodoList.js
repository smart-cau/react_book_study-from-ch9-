import React, { Component } from "react";
import TodoItem from "../TodoItem";

class TodoList extends Component {
  // TodoList 컴포넌트는 todos props를 바꿀 때만 rerendering되어야 한다.
  // 하지만 현재 input에 하나의 char을 입력만 해도 TodoList와 Item까지 전부 rerendering되버림.
  // 따라서 todos 값을 바꿀 때만 컴포넌트에 업데이트하도록 shouldComponentUpdate 메서드에서
  // 업데이트 조건을 설정하겠음.
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, onToggle, onRemove } = this.props;
    const todoList = todos.map(todo => (
      // todos객체가 immutable.js로 만들었으므로 그에 맞게 데이터 접근 법을 바꿔줌.
      <TodoItem
        key={todo.get("id")}
        done={todo.get("done")}
        onToggle={() => onToggle(todo.get("id"))}
        onRemove={() => onRemove(todo.get("id"))}
      >
        {todo.get("text")}
      </TodoItem>
    ));
    return <div>{todoList}</div>;
  }
}

export default TodoList;
