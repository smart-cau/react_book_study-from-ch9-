import { handleActions, createAction } from "redux-actions";

import axios from "axios";

// postId를 param으로 받아 와서 axios를 사용하여 API 요청을 하는 함수.
function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${postId}`);
  // aixos.get으로 json data를 요청해서 받은 결과 값은
  // 요청 함수를 실행한 이후에 첫번째로 나오는 .then(sth => {})의 형식 중에서 sth에 결과 값이 담긴다!
}

// 요청에 관한 action types. 내부에서 사용하기에 export 안함.
const GET_POST_PENDING = "GET_POST_PENDING"; // 요청을 '시작'할 때,
const GET_POST_SUCCESS = "GET_POST_SUCESS"; // 요청이 '성공'했을 때,
const GET_POST_FAILURE = "GET_POST_FAILURE"; //요청이 '실패'했을 때

// createAction's'라고 해서 오류 났었음... 기억하자..
const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE);

// thunk 생성 함수
// redux-thunk로 만든 액션 함수는 Promise를 반환한다.
// 따라서 해당 함수를 호출하고는 뒤에 .then or .catch를 입력해서 구현할 수 있다.
export const getPost = postId => dispatch => {
  // 먼저, 요청이 시작했다는 것을 알립니다
  dispatch(getPostPending());

  // 요청을 시작. 여기서 만든 Promise를 return 해야 나중에 컴포넌트에서
  // 호출할 때 getPost(). then(....)을 할 수 있음.
  return getPostAPI(postId)
    .then(response => {
      // 요청이 '성공'했다면, 서버 응답 내용을 payload로 설정하여
      // GET_POST_SUCCESS 액션을 dispatch 한다.       여기서 dispatch의 의미는? '실행한다'의 의미?
      dispatch(getPostSuccess(response));

      // 나중에 getPostAPI.then을 했을 때, then에 전달하는
      // 함수에서 response에 접근할 수 있게 함.
      return response;
    })
    .catch(error => {
      // 오류가 발생하면 오류 내용을 payload로 설정하여
      // GET_POST_FAILURE 액션을 dispatch 함.
      dispatch(getPostFailure(error));

      // error를 throw하여 이 함수를 실행한 후,
      // 다시 한 번 catch할 수 있게 함.
      throw error;
    });
};

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
