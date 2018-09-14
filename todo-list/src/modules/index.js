import input from "./input";
import todos from "./todos";
import { combineReducers } from "redux";

// combineReducers로 reducers를 합쳐서 내보냄.
// ---> 여기 부분을 통해 input, todos가 각 state에 담긴다!! 그래서
// state.input, state.todos로 접근 가능하게 된 것이다.
export default combineReducers({
  input,
  todos
});
