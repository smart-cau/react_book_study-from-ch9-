/*  Ch 21.4.1 헤더에 버튼 보여주기
    * '수정' 버튼 추가
    - 클릭 시, /editor?postId=ID 링크로 이동하게 설정.

    * '삭제' 버튼 추가
    - onRemove 함수를 props로 받아 와 호출.

    - 추후 관리자 로그인 기능 구현할 때 connect를 사용하기에 Container로 빼둠.
*/
/*  Ch 21.5.10 로그인할 떄만 포스트 작성 / 수정 / 삭제 버튼 보여주기.
    - store의 logged 값을 연동시키고, 이를 Header Comp로 전달.
*/
import React, { Component } from "react";
import Header from "components/common/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "stores/modules/base";

class HeaderContainer extends Component {
  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal("remove");
  };

  render() {
    const { handleRemove } = this;
    const { match, logged } = this.props;

    const { id } = match.params; // App.js에서 path로 정한 /post/:id의 id이다.

    return <Header postId={id} onRemove={handleRemove} logged={logged} />;
  }
}

export default connect(
  state => ({
    logged: state.base.get("logged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeaderContainer));
