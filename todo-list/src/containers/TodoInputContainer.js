import React, { Component } from "react";
import TodoInput from "../components/TodoInput";

// store의 상태와 액션 생성 함수들을 연결시키기 위한 모듈 import.
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// 액션 생성 함수들을 한꺼번에 불러옴.
import * as inputActions from "../modules/input";
import * as todosActions from "../modules/todos";

class TodoInputContainer extends Component {
  id = 1;
  getId = () => ++this.id;

  handleChange = e => {
    const { value } = e.target;
    // 대체 이 아래 코드는 어디서 왔는가...  --> connect에서 왔다.
    const { InputActions } = this.props;
    InputActions.setINPUT(value);
  };

  /*
    handleChange = e => {
      const { value } = e.target;

      this.setState({
        input: value
      });
    };
  */

  handleInsert = () => {
    // 이 props들은 어디서 왔는가... ---> connect에서 왔다.
    const { InputActions, TodosActions, value } = this.props;

    const todo = {
      id: this.getId(),
      text: value,
      done: false
    };
    // Insert 되는 원리가 대체 뭐지...
    TodosActions.insert(todo);
    InputActions.setINPUT("");
  };
  /*
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
  */

  render() {
    const { value } = this.props;
    const { handleChange, handleInsert } = this;
    console.log(this.props);
    return (
      <div>
        <TodoInput
          onChange={handleChange}
          onInsert={handleInsert}
          value={value}
        />
      </div>
    );
  }
}

/*  이번에는 mapStateToProps와 mapDispatchToProps 함수에 대한 레퍼런스를
    따로 만들지 않고, 그 내부에 바로 정의해 주었음.
*/
export default connect(
  state => ({
    // value를 props로 쓸 수 있게 됨.
    value: state.input.get("value")
  }),
  dispatch => ({
    InputActions: bindActionCreators(inputActions, dispatch),
    TodosActions: bindActionCreators(todosActions, dispatch)
    /*  bindActionCreators를 사용하면 자동으로 다음 작업들을 한다.
        {
          actionCreator: (...params) => dispatch(actionCreator(...params))
        }
        그래서 이전에 우리가 했던 것처럼 일일이 dispatch할 필요가 없다.
        예를 들어, InputActions에는 이 작업을 통해 다음과 같이 되어 있다.
        InputActions : {
          setInput: value => dispatch(inputActions.setInput(value))
        }
        나중에 이를 호출할 때는, this.props.InputActions.setInput을 호출하면 된다.


        mapStateToProps 등을 선언하는 방법과의 비교는 redux-couter/src/containers/CounterListContainer.js참고
    */
  })
)(TodoInputContainer);
