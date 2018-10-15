import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";

// action types
const INITIALIZE = "editor/INITIALIZE";
const CHANGE_INPUT = "editor/CHANGE_INPUT";

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);

// initial state
const initialState = Map({
  title: "",
  markdown: "",
  tags: ""
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialize,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      // name이랑 value를 state의 어느 값에 담는거? --> 그러게 어디에 set하는거지?
      let temp = state.set(name, value);
      console.log(temp.toJS());
      return temp; // .set은 immutable의 메소드! 값 수정에 사용.
    }
  },
  initialState
);
