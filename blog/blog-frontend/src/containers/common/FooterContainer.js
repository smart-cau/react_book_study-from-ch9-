// Footer에 있는 관리자 로그인 버튼을 누르면 로그인 모달을 띄움.
import React, { Component } from "react";
import Footer from "components/common/Footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "stores/modules/base";

class FooterContainer extends Component {
  handleLoginClick = async () => {
    const { BaseActions, logged } = this.props;
    // 로그인 되어 있을 때 클릭하면 로그아웃 시키고,
    if (logged) {
      try {
        await BaseActions.logout();
        window.location.reload(); // 페이지 새로 고침. - 기억
      } catch (e) {
        console.log(e);
      }
      return;
    }
    // 로그인 되어있지 않으면 로그인 모달을 보여준다. + 로그인 모달 상태 초기화.
    BaseActions.showModal("login");
    BaseActions.initializeLoginModal();
  };

  render() {
    const { handleLoginClick } = this;
    const { logged } = this.props;
    return <Footer onLoginClick={handleLoginClick} logged={logged} />;
  }
}

export default connect(
  state => ({
    logged: state.base.get("logged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(FooterContainer);
