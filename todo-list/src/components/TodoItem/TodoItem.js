import React, { Component } from "react";
import styles from "./TodoItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class TodoItem extends Component {
  // Item 하나를 toggle 했을 뿐인데 너무 많은 item들이 업데이트 된다.
  // toggle된 item만 업데이트 하도록 코드 추가.
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.done !== nextProps.done;
  }

  render() {
    const { done, children, onToggle, onRemove } = this.props;
    return (
      <div className={cx("todo-item")} onClick={onToggle}>
        <input className={cx("tick")} type="checkbox" checked={done} readOnly />
        <div className={cx("text", { done })}>{children}</div>
        <div
          className={cx("delete")}
          onClick={e => {
            onRemove();
            e.stopPropagation();
          }}
        >
          [지우기]
        </div>
      </div>
    );
  }
}

export default TodoItem;
