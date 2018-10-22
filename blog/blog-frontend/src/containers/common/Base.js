/*  - 로그인 모달은 리스트 페이지든 포스트 페이지든 전역적으로 사용하는 모달이다.
    - 이렇게 전역적으로 사용되는 comp는 App에서 렌더링해야한다. -- 기억!
    - 하지만 App에 직접적으로 LoginModalContainer를 렌더링하면,
    - 나중에 전역으로 사용되는 Comp가 많을 때 App의 render 함수가 복잡해질 수 있음.
    - 따라서 BaseContainer를 만들어 그 안에 LoginModalContainer를 렌더링 할 것임.
    - Base를 컨테이너로 만드는 이유는 페이지를 새로고침할 때마다 현재 유저가 로그인 중인지 검증하는데,
    - 이 작업을 Base Comp에서 처리할 것이기 때문.
*/
import React, { Component } from "react";
import LoginModalCongainer from "containers/modal/LoginModalContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "stores/modules/base";

class Base extends Component {
  initialize = async () => {
    // 로그인 상태 확인(추후 작성)
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <div>
        {/* 전역적으로 사용하는 컴포넌트들이 있으면 여기에서 렌더링한다! -- 기억 */}
        <LoginModalCongainer />
      </div>
    );
  }
}

export default connect(
  null, // mapStateToProps를 안쓸때는 이렇게 null. 기억!
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);
