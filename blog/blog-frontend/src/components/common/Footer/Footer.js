import React from "react";
import styles from "./Footer.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Footer = ({ onLoginClick, logged }) => (
  <footer className={cx("footer")}>
    <Link to="/" className={cx("brand")}>
      혀누쓰 블로그
    </Link>
    <div onClick={onLoginClick} className={cx("admin-login")}>
      {logged ? "로그 아웃" : "관리자 로그인"}
      {/* 로그인은 되지만, 로그아웃 기능에 문제있음. pender/FAIULRE */}
    </div>
  </footer>
);

export default Footer;
