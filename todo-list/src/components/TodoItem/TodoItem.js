// 이 컴포넌트는 App.js가 아니라 TodoList 컴포넌트 내부에 렌더링 함.
import React, { Component } from "react";
import styles from "./TodoItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
// 나중에 성능을 최적화 하기 위해 shouldComponentUpdate 라이프 사이클 메서드를 사용해야해
// 이번엔 Functional Component가 아니라 Class Component로 만들었다.

class TodoItem extends Component {
  render() {
    /*
    * 'done' 값은 해당 일정을 완료했는지 완료하지 않았는지 여부를 가르킴.
    * 'children'은 일정에 대한 내용을 나타냄.
    * 'onToggle'은 일정finished 상태를 껏다 켰다 하는 함수.
    * 'onRemove'는 해당 일정을 제거하는 함수.
    */
    const { done, children, onToggle, onRemove } = this.props;
    // 위와 같은 비구조화 할당 문법을 사용하면, props를 사용할 때마다 this.props.onToggle처럼
    // 매번 앞 부분에 this.props를 붙이는 것을 생략할 수 있다.
    // 앞으로 class Component를 만들면서 props를 사용할 때는 이런 식으로 비구조화 할당을 한다.
    // 또 이렇게 레퍼런스를 만들면, 렌더링 함수 위쪽에서 이 컴포넌트가 어떤 props를 사용하는지 한눈에 볼 수 있어서 편함.
    return (
      // 큰 div의 onClick 이벤트와 onToggle 함수를 연결시켜 줌.
      <div className={cx("todo-item")} onClick={onToggle}>
        {/* checked -> 체크박스의 체크 여부를 가르킴. 이 checked 값으로 'done'을 지정.
        readOnly Props를 활성화 시킨 이유 : 체크를 활성화 및 비활성화는 input의 이벤트가 아니라,
        상위 div의 onClick 이벤트로 관리할 것이기 때문이다! 
        원래는 readOnly = {true}와 같이 했어야 했는데 '='의 생략은 '= {ture}'와 같은 뜻이다. */}
        <input className={cx("tick")} type="checkbox" checked={done} readOnly />
        {/* 조건부 className으로 해놈. done 값이 true이면 해당 요소에 done 클래스를 적용.
        추후 스타일링 할 때, text class와 done class가 함께 있으면 일정완료선(취소선)을 긋도록 할 것임. */}
        <div className={cx("text", { done })}>{children}</div>
        {/* 현재 아래 코드에는 오류가 있음. 아래 div의 onClick 이벤트가 부모 div의 onClick 이벤트와 연결되어 있어
        기대하는 대로 동작하지 않을 수 있음. 추후 수정할 것임. */}
        <div
          className={cx("delete")}
          onClick={e => {
            onRemove();
            e.stopPropagation(); // 원노트(REACT/React info from ~)에서 bubble vs capture 참고.
          }}
        >
          [지우기]
        </div>
      </div>
    );
  }
}

export default TodoItem;
