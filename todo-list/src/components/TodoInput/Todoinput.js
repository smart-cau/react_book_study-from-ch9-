import React from "react";
import styles from "./Todoinput.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
// { value, onChange, onInsert } 3개의 props!
/* 1) value는 input 값으로 설정됨. / input의 props
2) onChange는 input 내용이 수정될 때 사용하는 이벤트. / input의 props
3) onInsert는 '추가' 버튼을 눌렀을 떄 실행하는 이벤트. / '추가' 버튼의 onClick이벤트. props.
*/
const TodoInput = ({ value, onChange, onInsert }) => {
  // Enter 키를 누르면 onInsert를 실행함.
  const hansdleKeyPress = e => {
    if (e.key === "Enter") {
      onInsert();
    }
  };
  return (
    <div className={cx("todo-input")}>
      <input onChange={onChange} value={value} onKeyPress={hansdleKeyPress} />
      <div className={cx("add-button")} onClick={onInsert}>
        추가
      </div>
    </div>
  );
};
export default TodoInput;
