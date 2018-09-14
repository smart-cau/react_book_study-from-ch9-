// todos module.
// 여기서 구현할 액션은 1. INSERT / 2. TOGGLE / 3. REMOVE로 3가지 이다.
// action type 정의하기 -> 액션 생성함수 만들기 -> 초기상태 정의 -> 리듀서 정의.
import { Map, List } from "immutable";
import { handleActions, createAction } from "redux-actions";

// action type 정의.
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

// 액션 생성함수 만들기.
export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);

// 초기상태 정의.
const initialState = List([
  Map({
    id: 0,
    text: "리액트 공부하기",
    done: true
  }),
  Map({
    id: 1,
    text: "컴포넌트 스타일링 해보기",
    done: false
  })
]);

// 리듀서 정의
export default handleActions(
  {
    [INSERT]: (state, action) => {
      /*  payload 안에 있는 id, text, done의 레퍼런스를 만들어 준다.
        레퍼런스를 만들지 않고, 바로 push(Map(action.payload))를 해도 되지만,
        나중에 이 코드를 보았을 떄,
        이 액션이 어떤 데이터를 처리하는지 쉽게 볼 수 있도록 하는 작업이다.
    */
      const { id, text, done } = action.payload;

      return state.push(
        Map({
          id,
          text,
          done
        })
      );
    },

    [TOGGLE]: (state, action) => {
      // 책에 오류가 있었음. 책 깃헙 참조함.
      const id = action.payload;
      const index = state.findIndex(todo => todo.get("id") === id);
      /*  = const {payload : id} = action;
        비구조화 할당으로 index 레퍼런스에 action.payload 값을 넣는다.
        이 작업이 필수는 아니지만, 나중에 이 코드를 보았을 때 여기서 payload가 
        어떤 값을 의미하는지 쉽게 알 수 있다.
    */

      return state.updateIn([index, "done"], done => !done);
      /*  updateIn을 사용하지 않으면 다음과 같이 작성할 수도 있음.
        return state.setIn([index, 'done'], !state.getIn([0, index]));
        둘 중 편한거 쓰면 됨.(updateIn)이 편한듯.
    */
    },

    [REMOVE]: (state, action) => {
      const id = action.payload;
      const index = state.findIndex(todo => todo.get("id") === id);

      return state.delete(index);
    }
  },
  initialState
);
