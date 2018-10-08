import React from "react";
import styles from "./Header.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);

const Header = () => {
  return <div className={cx("header")}>Header</div>;
};

export default Header;
