//7. 컴포넌트를 connect 함수를 사용하여 store에 연결.
import Counter from "../components/Counter";
import * as actions from "../actions";
import { connect } from "react-redux";

// 총 13가지 색상 중 랜덤으로 선택하는 함수.
export function getRandomColor() {
  const colors = [
    "#495057",
    "#f03e3e",
    "#d6336c",
    "#ae3ec9",
    "#7048e8",
    "#4263eb",
    "#1c7cd6",
    "#1098ad",
    "#0ca678",
    "#32b24d",
    "#74b816",
    "#f59f00",
    "#f76707"
  ];

  // 0 ~ 12까지 랜덤 숫자.
  const random = Math.floor(Math.random() * 13);

  // 랜덤색상 반환
  return colors[random];
}

/*  상태를 연결시킬 땐 'state',
    액션함수를 연결시킬 땐 'dispatch'를
    파라미터로 전달받는 함수를 만들어서 객체를 반환하면,
    이를 props로 사용할 수 있게 된다.
 */

// store 안의 state 값을 props로 연결함.
const mapStateToProps = state => ({
  color: state.colorData.color,
  number: state.numberData.number
});

/*  액션생성 함수를 사용하여 액션을 생성하고,
    해당 액션을 dispatch하는 함수를 만든 후 이를 props로 연결한다.
 */

const mapDispatchToProps = dispatch => ({
  onIncrement: () => dispatch(actions.increment()),
  onDecrement: () => dispatch(actions.decrement()),
  onSetColor: () => {
    const color = getRandomColor();
    dispatch(actions.setColor(color));
  }
});

// Counter 컴포넌트의 Container 컴포넌트.
// Counter 컴포넌트(Counter)를 애플리케이션의 데이터 레이어(mapStateToProps, mapDispatchToprops)와 묶는 역할을 한다.
// 이렇게 하면 mapStateToProps의 color 값, number 값과
// mapDispatchToProps의 onInrement, onDecrement, onSetColor 값이
// Counter 컴포넌트의 'props'로 들어간다!
const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

export default CounterContainer;
