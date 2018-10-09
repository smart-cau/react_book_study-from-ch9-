/*  ListWrapper comp는 
    - 내부 내용을 페이지 한가운데 정렬시켜 주고,
    - 위 아래 padding이 설정되어 있으며
    - 웹 브라우저 크기아 따라 화면 크기를 조정한다.
    - 컴포넌트(chlidren)를 감싸는 역할을 함.
*/
import React from "react";
import styles from "./ListWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ListWrapper = ({ children }) => (
  <div className={cx("list-wrapper")}>{children}</div>
);

export default ListWrapper;
