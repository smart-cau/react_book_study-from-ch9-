/*  Project에서 사용할 Button 컴포넌트. 
    이 컴포넌트는 
    - to 값을 props로 전달했을 때는 Link 컴포넌트를 사용하고,
    - to 값이 없을 때는 div 태그를 사용한다.
    theme props를 받아서, 이에 따라 다른 스타일을 설정하면 Button 컴포넌트의 스타일을 여러 종류로 만들 수 있다.
    ---> 이 방법 반드시 기억!!!!!!
*/

import React from "react";
import styles from "./Button.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";

const cx = className.bind(styles);

// JSX에서 ...을 사용하면, 내부에 있는 값들을 props로 넣어준다.
const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;

// theme값이 주어지지 않으면, 'default' 값으로 지정.
// disabled가 true이면 버튼을 비활성화시켜 회색으로 나타나게함.
const Button = ({ children, to, onClick, disabled, theme = "default" }) => {
  // to 값이 존재하면, Link를 사용하고, 그렇지 않으면 div를 사용한다.
  // 비활성화되어 있는 버튼(disabled = true)일 때도 div를 사용한다.
  const Element = to && !disabled ? Link : Div;

  // 비활성화되면 onClick은 실행되지 않는다.
  // disabled 값이 true가 되면, className에 disabled를 추가한다.
  return (
    <Element
      to={to}
      className={cx("button", theme, { disabled })}
      onClick={disabled ? () => null : onClick}
    >
      {children}
    </Element>
  );
};

export default Button;

// 단순 Button Component 안에 내용이 많은 대신,
// 이 버튼 컴포넌트 하나로 프로젝트 내에 필요한 모든 버튼을 표현할 수 있다.
// 재사용성이 높음.
