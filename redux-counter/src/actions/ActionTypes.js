//3-1. Action Types 준비.
/*  Action 종류들을 선언.
    앞에 export를 붙이면 나중에 이것들을 불러올 때,
    import * as types from './ActionTypes'로 사용할 수 있다.
 */

// 상수를 선언하고 바로 내보내기.
// 액션 선언은 대문자로!
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COLOR = "SET_COLOR";
