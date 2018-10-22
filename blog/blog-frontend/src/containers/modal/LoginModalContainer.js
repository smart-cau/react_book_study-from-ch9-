import React, { Component } from "react";
import LoginModal from "components/modal/LoginModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "stores/modules/base";

class LoginModalContainer extends Component {
  handleLogin = () => {};

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("login");
  };

  handleChange = e => {};

  handleKeyPress = e => {};

  render() {
    const { handleLogin, handleCancel, handleChange, handleKeyPress } = this;
    const { visible } = this.props;

    return (
      <LoginModal
        visible={visible}
        onLogin={handleLogin}
        onCancel={handleCancel}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(["modal", "login"])
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(LoginModalContainer);
