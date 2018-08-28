import React, { Component } from "react";
import TodoItem from "../TodoItem";

class TodoList extends Component {
  render() {
    return (
      <div>
        {/* <TodoItem>여기 사이에 있는 내용이 children으로 들어간다!! 이 사이에 내용을 넣을려면 children props는 필수</TodoItem> */}
        <TodoItem done>리액트 공부하기</TodoItem>
        <TodoItem>리액트 스타일링 해보기</TodoItem>
      </div>
    );
  }
}

export default TodoList;
