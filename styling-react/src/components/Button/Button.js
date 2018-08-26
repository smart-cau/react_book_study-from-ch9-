import React from "react";
import styles from "./Button.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Button = ({ children, ...rest }) => {
  // children과 ...rest는 props이다.
  // 비구조화 할당. 책 179p 참고.
  // 이 부분 이해 안됨.
  console.log(children); // children에는 App.js의 '버튼'이 담겨있었다.
  console.log(...rest); // 여기에는 출력되는게 없음.
  return (
    <div className={cx("button")} {...rest}>
      {children}
    </div>
  );
};

export default Button;
