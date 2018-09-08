// 4.3 Counter 컴포넌트 수정.
// index를 props에 추가. + actions에 index를 param으로 전달.
import React from "react";
import propTypes from "prop-types";
import "./Counter.css";

// 숫자 / 색상 값 / 더하기 / 빼기 / 색상변경함수 를 props로 전달 받음.
const Counter = ({
  number,
  color,
  index,
  onIncrement,
  onDecrement,
  onSetColor
}) => {
  return (
    <div
      className="Counter"
      onClick={() => onIncrement(index)}
      onContextMenu={e => {
        e.preventDefault();
        onDecrement(index);
        // onContextMenu는 마우스 오른쪽 버튼을 눌렀을 때 메뉴가 열리는 이벤트를 의미.
        // 이 함수가 실행될 때, e.prevenDefault() 함수를 호출하면 메뉴가 열리는 것을 방지함.
      }}
      onDoubleClick={() => onSetColor(index)}
      style={{
        backgroundColor: color
      }}
    >
      {number}
    </div>
  );
};

Counter.propTypes = {
  index: propTypes.number,
  number: propTypes.number,
  color: propTypes.string,
  onIncrement: propTypes.func,
  onDecrement: propTypes.func,
  onSetColor: propTypes.func
};

Counter.defaultProps = {
  index: 0,
  number: 0,
  color: "black",
  onIncrement: () => console.warn("onIncrement not defined"),
  onDecrement: () => console.warn("onDecrement not defined"),
  onSetColor: () => console.warn("onSetColor not defined")
};

export default Counter;
