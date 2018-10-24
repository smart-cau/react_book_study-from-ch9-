import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import { pender } from "redux-pender";

import * as api from "lib/api";

// action types
const INITIALIZE = "editor/INITIALIZE";
const CHANGE_INPUT = "editor/CHANGE_INPUT";
const WRITE_POST = "editor/WRITE_POST";
const GET_POST = "edior/GET_POST";
const EDIT_POST = "editor/EDIT_POST";

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);
export const getPost = createAction(GET_POST, api.getPost);
export const editPost = createAction(EDIT_POST, api.editPost);
// createAction의 두번째 인자로 넘겨주는건 무슨 역할을 함? 질문. --> payloaderCreator라는 이름. 공식문서 참고. https://redux-actions.js.org/api/createaction
// initial state
const initialState = Map({
  title: "",
  markdown: "",
  tags: "",
  postId: null
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState, // --> 이걸 initialize라고 써서 state.editor.get은 함수가 아니다 이런 오류가 떴었다ㅜㅠ
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      // name이랑 value를 state의 어느 값에 담는거? --> 그러게 어디에 set하는거지? -- parcice 파일에 답이 있음.
      return state.set(name, value); // .set은 immutable의 메소드! 값 수정에 사용.
    },
    ...pender({
      type: WRITE_POST,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set("postId", _id);
      }
    }),
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { title, body, tags } = action.payload.data;
        return state
          .set("title", title)
          .set("markdown", body)
          .set("tags", tags.join(",")); // 배열 -> ,쉼표로 구분된 문자열.
      }
    })
  },
  initialState
);
