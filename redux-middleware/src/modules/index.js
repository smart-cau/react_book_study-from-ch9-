import { combineReducers } from "redux";
import counter from "./counter";
import post from "./post";
// redux-pender 내장 reducer 추가함! 이 reducer는 요청 상태를 관리함. 자세한 내용은 책 350p 참고.
import { penderReducer } from "redux-pender";

export default combineReducers({
  counter,
  post,
  pender: penderReducer
});
