/*  Ch 21.3.2
    - list.js --> getPostList API를 호출할 때 필요한 액션과 상태관리 로직.
    - state에는
    - posts -> 포스트 목록 데이터가 들어 있음.
    - lastPage -> 마지막 페이지를 알려줌.
      - 이전에 이 API를 만들 때, Last-Page라는 커스텀 HTTP 헤더를 넣어 응답하도록 했었다.
      - 하지만, axios에서는 소문자로 헤더를 읽어 오므로, action.payload.headers['last-page'] 값으로 읽어올 것이다.
      - 추가로, 해당 값은 string 형태로 들어오니, 이 값을 parseInt를 사용하여 숫자로 변환한다.
*/
import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "lib/api";

// action types
const GET_POST_LIST = "list/GET_POST_LIST";

// action creators
export const getPostList = createAction(
  GET_POST_LIST,
  api.getPostList,
  meta => meta
); // meta의 역할?
// --> meta데이터 생성. 이 경우 이 액션을 사용해 만들어진 객체에는 meta : meta 형태의 값을 가짐.
//  참고 : https://redux-actions.js.org/api/createaction

// initial state
const initialState = Map({
  posts: List(), // 빈 List를 만든다.
  lastPage: null
});

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_POST_LIST,
      onSuccess: (state, action) => {
        // 질문. 이거의 의미.. --> action.payload = {data: posts}의 형태에서 posts = action.payload.data.posts
        const { data: posts } = action.payload;

        const lastPage = action.payload.headers["last-page"]; // axios는 헤더까지 읽어서 payload에 담나?? console로 찍어보자.

        return state
          .set("posts", fromJS(posts))
          .set("lastPage", parseInt(lastPage, 10)); // 10개씩 게시물 보여줌.
      }
    })
  },
  initialState
);
