// 3-2. 액션 생성 함수 만들기.
/*  action 객체를 만드는 액션 생성 함수(action creators)들을 선언한다.
    여기에서 () => ({})은 function() { return { } }과 동일한 의미이다.
 */

import * as types from "./ActionTypes";

export const increment = () => ({
  type: types.INCREMENT
});

export const decrement = () => ({
  type: types.DECREMENT
});

// 다른 action 생성자들과 달리 parameter를 갖고 있음.
// parameter로 color를 받고 그 값을 액션 객체 안에 넣음.
export const setColor = color => ({
  type: types.SET_COLOR,
  color
});
