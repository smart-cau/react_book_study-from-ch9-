import { handleActions, createAction } from "redux-actions";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

// 기존의 카운터를 비동기적으로 작동하도록 코드 추가.
// 액션을 디스패치할 때, 1초 뒤에 실제 액션을 디스패치하도록 코드를 추가.
export const incrementAsync = () => dispatch => {
  // 1초 뒤 액션 디스패치
  // setTimeout(실행할 함수, 시간)
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};

export const decrementAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(decrement());
  }, 1000);
};

export default handleActions(
  {
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1
  },
  0
);
