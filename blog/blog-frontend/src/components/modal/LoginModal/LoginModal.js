/*  Ch 21.5.5 로그인 모달 생성.
    - 이 컴포넌트는 visible / password / error / onCancel / onLogin / onChange / onKeyPress를 props로 받는다.
    - password는 로그인 창에 있는 input의 value 값이다. 이 값은 base 모듈에서 받아온다.
    - error 값은 유저가 잘못된 비밀번호를 입력했을 때 오류를 표시하는 값이다.
    - onCancel은 닫기버튼을 누르면 실행하는 함수.
    - onCHange는 값의 변경을 반영하기 위함.
    - onKeyPress는 비밀번호 입력 후 엔터를 눌렀을 때도 로그인 작업을 수행하게 하기 위함.
*/

import React from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "components/modal/ModalWrapper";

const cx = classNames.bind(styles);

const LoginModal = ({
  visible,
  password,
  error,
  onCancel,
  onLogin,
  onChange,
  onKeyPress
}) => (
  <ModalWrapper visible={visible}>
    <div className={cx("form")}>
      <div onClick={onCancel} className={cx("close")}>
        &times; {/* 이거 무슨 뜻? --> X자 표시임. 유용할듯 기억 */}
      </div>
      <div className={cx("title")}>로그인</div>
      <div className={cx("description")}>관리자 비밀번호를 입력하세요</div>
      <input
        autoFocus
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      {error && <div className={cx("error")}>로그인 실패</div>}
      <div className={cx("login")} onClick={onLogin}>
        로그인
      </div>
    </div>
  </ModalWrapper>
);

export default LoginModal;
