// 4.2 여러 카운터를 렌더링: CounterList 컴포넌트 생성
// 이 컴포넌트는 '카운터 객체들의 배열' 'counters'와
// '카운터 값을 조작하는' 'onIncrement / onDecrement / onSetColor' 함수를 props로 받는다.
// 이 컴포넌트 내부에서 counters 배열을 'Counter 컴포넌트'의 배열로 map 할 것이다.
// 이때, key는 배열의 index로 설정하고, index 값도 Counter 컴포넌트에 props로 전달해 준다.
// 그리고 counters 배열 안 객체의 color 값과 number 값을 일일이 설정하는 대신 {...counter}를 jsx 태그 내부에 넣어 주면
//  해당 값들을 풀어서 각 값을 한꺼번에 전달할 수 있다.

import React from "react";
import Counter from "./Counter";
import propTypes from "prop-types";

import "./CounterList.css";

const CounterList = ({ counters, onIncrement, onDecrement, onSetColor }) => {
  const counterList = counters.map((counter, i) => (
    <Counter
      key={i}
      index={i}
      {...counter}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onSetColor={onSetColor}
    />
  ));

  return <div className="CounterList">{counterList}</div>;
};

CounterList.propTypes = {
  couters: propTypes.arrayOf(
    propTypes.shape({ color: propTypes.string, number: propTypes.number })
  ),
  onIncrement: propTypes.func,
  onDecrement: propTypes.func,
  onSetColor: propTypes.func
};

CounterList.defaultProps = {
  couters: []
};

export default CounterList;
