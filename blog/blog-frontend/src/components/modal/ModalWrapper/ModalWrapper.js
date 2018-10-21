/*  Ch 21.4.3.1 ModalWrapper Comp 생성.
    - 이 Comp는 state가 있는 class형 comp로, 
    - 전체 화면을 불투명한 회색 배경으로 바꾸고,
    - 그 위에 흰색 박스를 보여준다.
    - 삭제 확인 뿐만 아니라 나중에 비밀번호 로그인을 구현할 때 재사용한다.

    - -- modal 관련해서 스타일링까지 모두 기억!! 
*/
import React, { Component } from "react";
import styles from "./ModalWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class ModalWrapper extends Component {
  render() {
    const { children, visible } = this.props;
    if (!visible) return null; // visible이 true 일 때만 modal이 보임.

    return (
      <div className={cx("gray-background")}>
        <div className={cx("modal-wrapper")}>
          <div className={cx("modal")}>{children}</div>
        </div>
      </div>
    );
  }
}

export default ModalWrapper;
