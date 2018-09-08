// 5. 컨테이너 컴포넌트
// 5.1 CounterListContainer 컴포넌트 생성.
// Buttons는 따로 Container 컴포넌트를 만들어 주지 않고 걍 여기에서 처리.
// App 컴포넌트를 Redux에 연결하여 action functions도 연결시키고,
// 해당 functions들을 Buttons 컴포넌트에 전달할 것임.

import CounterList from "../components/CounterList";
import * as actions from "../actions";
import { connect } from "react-redux";
import getRandomColor from "../lib/getRandomColor";

// store 안의 state 값을 props로 연결한다.
const mapStateToProps = state => ({ counters: state.counters });

/*  액션 생성자를 사용하여 액션을 만들고,
    해당 액션을 dispatch하는 함수를 만든 후 이를 props로 연결한다.
*/
const mapDispatchToProps = dispatch => ({
  onIncrement: index => dispatch(actions.increment(index)),
  onDecrement: index => dispatch(actions.decrement(index)),
  onSetColor: index => {
    const color = getRandomColor();
    dispatch(actions.setColor({ index, color }));
  }
});

// 데이터와 함수들이 props로 붙은 컴포넌트 생성.
const CounterListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterList);

export default CounterListContainer;
