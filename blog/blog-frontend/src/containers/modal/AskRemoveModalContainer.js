import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as baseActions from "stores/modules/base";
import * as postActions from "stores/modules/post";
import AskRemoveModal from "components/modal/AskRemoveModal";

class AskRemoveModalContainer extends Component {
  // '삭제 취소' 버튼
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("remove");
  };

  // '삭제 확인' 버튼
  handleConfirm = async () => {
    const { BaseActions, PostActions, history, match } = this.props;
    const { id } = match.params;

    try {
      // 포스트 삭제 후, modal 닫고, 웹 사이트로 이동.
      await PostActions.removePost(id);
      BaseActions.hideModal("remove");
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { visible } = this.props;
    const { handleCancel, handleConfirm } = this;

    return (
      <AskRemoveModal
        visible={visible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(["modal", "remove"])
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(withRouter(AskRemoveModalContainer));
