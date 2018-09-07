// 4-3. root 리듀서 생성.

// Reducer는 액션의 type에 따라 변화를 일으키는 '함수'이다.

// import * as types from "../actions/ActionTypes";

// reducer 함수의 초기 상태 선언.
// 이 초기 상태에 따라 아래의 리듀서 함수의 state가 작동 될 것.
// const initialState = {
//   color: "black",
//   number: 0
// };

/*  Reducer 함수를 정의한다. 리듀셔는 state와 action을 param으로 받는다.
    state가 undefined일 때(스토어가 생성될 때) state 기본 값을 initialState로 사용한다.
    action.type에 따라 다른 작업을 하고, 새 상태를 만들어서 반환한다.
    이때 주의할 점은 state를 직접 수정하면 절대 안 되고,
    기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환해야 한다.
*/

// function counter(state = initialState, action) {
//   switch (action.type) {
//     case types.INCREMENT:
//       return {
//         ...state,
//         number: state.number + 1
//       };
//     case types.DECREMENT:
//       return {
//         ...state,
//         number: state.number - 1
//       };
//     case types.SET_COLOR:
//       return {
//         ...state,
//         color: action.color
//       };
//     default:
//       return state;
//   }
// }

// export default counter;

// 10.c 서브 리듀서 생성
// 루트 리듀서
import number from "./number";
import color from "./color";

import { combineReducers } from "redux";

/*  서브 리듀서들을 하나로 합친다.
    combineReducers를 실행하고 나면, 나중에 store 형태를
    파라미터로 전달한 객체 모양대로 만든다.
    지금은 다음과 같이 만든다.
    {
      numberData: {
        number: 0
      },
      colorData: {
        color: 'black
      }
    }
*/

const reducers = combineReducers({
  numberData: number,
  colorData: color
});

export default reducers;
