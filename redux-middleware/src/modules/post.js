import { handleActions, createAction } from "redux-actions";
import { pender } from "redux-pender";
import axios from "axios";

// postId를 param으로 받아 와서 axios를 사용하여 API 요청을 하는 함수.
function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${postId}`);
  // aixos.get으로 json data를 요청해서 받은 결과 값은
  // 요청 함수를 실행한 이후에 첫번째로 나오는 .then(sth => {})의 형식 중에서 sth에 결과 값이 담긴다!
}

const GET_POST = "GET_POST";

/*  redux-pender의 액션 구조는 Flux standard action(https://gihub.com/acdlite/flux-standard-action)을
    따르기 때문에, createAction으로 액션을 만들 수 있다.
    두 번째로 들어가는 파라미터는, Promise를 반환하는 함수여야 한다.
*/
export const getPost = createAction(GET_POST, getPostAPI);

// InitialState
const InitialState = {
  // 요청이 진행 중인지, 오류가 발생했는지 여부는 더 이상 직접 관리할 필요가 없다.
  // --> penderReducer가 관라하기 때문!
  data: {
    title: "",
    body: ""
  }
};

// Reducer.
export default handleActions(
  {
    ...pender({
      // type이 주여지면, 이 type에 접미사를 붙인
      // action handlers들이 담김 객체를 만든다.
      type: GET_POST,

      /* 요청 중일 때와 실패했을 때 추가로 해야 할 작접이 있다면,
      이렇게 onPending과 onFailure를 추가하면 된다.
      onPending: (state, action) => state,
      onFailure: (state, action) => state
      */
      onSuccess: (state, action) => {
        // 성공했을 때 해야 할 작접이 따로 없으면 이 함수도 생략 가능.
        const { title, id } = action.payload.data;
        return {
          data: {
            title,
            id
          }
        };
      }
      // 함수를 생략했을 때 기본 값으로는 (state, action) => state를 설정한다.
      // (state를 그대로 반환한다는 뜻.)
    })
  },
  InitialState
);
