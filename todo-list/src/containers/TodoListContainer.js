import React, { Component } from "react";
import TodoList from "../components/TodoList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as todoActions from "../modules/todos";

class TodoListContainer extends Component {
  handleToggle = id => {
    // 대체 이 props는 어디서 왔는가...  -->마지막의 connect에서 왔다.
    const { TodoActions } = this.props;
    TodoActions.toggle(id);
  };

  handleRemove = id => {
    const { TodoActions } = this.props;
    TodoActions.remove(id);
  };

  render() {
    const { todos } = this.props;
    const { handleRemove, handleToggle } = this;

    return (
      <div>
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    // todos를 props로 쓸수 있게됨.
    todos: state.todos
  }),
  dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoListContainer);
