// input module. 인풋 내용을 설정하는 액션.
import { Map } from "immutable";
import { createAction, handleActions } from "redux-actions";

// reducer이름/ACTION_TYPE
const SET_INPUT = "input/SET_INPUT";

// action creator function 액션생성함수.
export const setINPUT = createAction(SET_INPUT);

// reducer의 초기 상태 정의.
const initialState = Map({
  // value 값을 Map 안에 넣어줌.
  value: ""
});

// handleActions를 사용하여 reducer 정의.
export default handleActions(
  {
    // 객체의 key 값으로 변수(varaible)가 들어가면 배열 레터럴[ ]로 변수 key 값을 감싸줘야 한다.
    [SET_INPUT]: (state, action) => {
      return state.set("value", action.payload); // Map의 .set()메서드를 사용하여 'value'라는 키 값에 action.payload라는 새로운 value를 담음.
    }
  },
  initialState
);
