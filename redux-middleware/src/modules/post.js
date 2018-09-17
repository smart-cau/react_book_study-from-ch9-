import { handleActions } from "redux-actions";

import axios from "axios";

// postId를 param으로 받아 와서 axios를 사용하여 API 요청을 하는 함수.
function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${postId}`);
  // aixos.get으로 json data를 요청해서 받은 결과 값은
  // 요청 함수를 실행한 이후에 첫번째로 나오는 .then(sth => {})의 형식 중에서 sth에 결과 값이 담긴다!
}

// 요청에 관한 action types. 내부에서 사용하기에 export 안함.
const GET_POST = "GET_POST"; // redux-promise-middleware 사용할 때의 action type.
const GET_POST_PENDING = "GET_POST_PENDING"; // 요청을 '시작'할 때,
const GET_POST_SUCCESS = "GET_POST_SUCCESS"; // 요청이 '성공'했을 때,
const GET_POST_FAILURE = "GET_POST_FAILURE"; //요청이 '실패'했을 때

// createAction's'라고 해서 오류 났었음... 기억하자..
// const getPostPending = createAction(GET_POST_PENDING);
// const getPostSuccess = createAction(GET_POST_SUCCESS);
// const getPostFailure = createAction(GET_POST_FAILURE);
// ----> redux-promise-middleware의 사용으로 필요 없어짐.

// promise-middleware는 Promise 객체를 payload로 전달하면
// 요청을 시작 / 성공 / 실패에 따라 _PENDING, _FULFILLED, _REJECTED로 붙여서 반환함. (_SUCCESS, _FAILURE로 커스터마이징함.)
// --> 위와 같이 각 action type을 일일이 선언할 필요가 없음.
export const getPost = postId => ({
  type: GET_POST,
  payload: getPostAPI(postId)
});

// InitialState
const InitialState = {
  pending: false,
  error: false,
  data: {
    title: "",
    id: ""
  }
};

// Reducer.
export default handleActions(
  {
    [GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },

    [GET_POST_SUCCESS]: (state, action) => {
      const { title, id } = action.payload.data;

      return {
        ...state,
        pending: false,
        data: {
          title,
          id
        }
      };
    },

    [GET_POST_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  InitialState
);
