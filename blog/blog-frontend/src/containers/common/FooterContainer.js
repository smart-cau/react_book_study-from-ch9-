// Footer에 있는 관리자 로그인 버튼을 누르면 로그인 모달을 띄움.
import React, { Component } from "react";
import Footer from "components/common/Footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "stores/modules/base";

class FooterContainer extends Component {
  handleLoginClick = async () => {
    const { BaseActions } = this.props;
    BaseActions.showModal("login");
  };

  render() {
    const { handleLoginClick } = this;
    return <Footer onLoginClick={handleLoginClick} />;
  }
}

export default connect(
  state => ({
    // 추후 입력
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(FooterContainer);
