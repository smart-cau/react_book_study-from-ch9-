/*  Action 종류들을 선언.
    앞에 export를 붙이면 나중에 이것들을 불러올 때,
    import * as types from './ActionTypes'로 사용할 수 있다.
 */
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COLOR = "SET_COLOR";

// 1. 액션 type 수정.
export const CREATE = "CREATE";
export const REMOVE = "REMOVE";
