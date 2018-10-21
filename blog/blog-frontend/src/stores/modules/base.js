import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";

// action types
const SHOW_MODAL = "base/SHOW_MODAL";
const HIDE_MODAL = "base/HIDE_MODAL";

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

// initial state
const initialState = Map({
  // 모달의 가시성 상태
  modal: Map({
    remove: false, // AskRemoveModal(Container)에서 visible 값으로 사용.
    login: false // 추후 구현할 로그인 모달.
  })
});

// reducer
export default handleActions(
  {
    // 두 actions는 주어진 payload 값에 따라서 modal Map 내부에 있는 값(remove or login)을 true or false로 바꾼다.
    [SHOW_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return state.setIn(["modal", modalName], true);
    },
    [HIDE_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return state.setIn(["modal", modalName], false);
    }
  },
  initialState
);
