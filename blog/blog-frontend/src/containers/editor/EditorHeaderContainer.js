/*  Ch 21.1.5 EditorHeaderContainer
    - EditorHeader에 Redux state와 액션생성함수를 붙여준다.
    - '뒤로가기'버튼과 '작성하기'버튼에 기능을 붙인다. --> 기억!
    * '뒤로가기' 버튼
      - withRouter가 props로 가지고 있는 history 객체를 사용하기 위해
      - EditorHeaderContainer를 withRouter로 감싸준다. - 마지막줄 참고.

    * '작성하기' 버튼
      - 버튼을 눌렀을 때, WRITE_POST 액션을 실행시킨 후,
      - postId 값을 받아 와 포스트 주소로 이동한다.
      - coponentDidMount가 발생할 때 INITIALIZE 액션을 실행시켜 에디터 상태를 초기화한다.
      - 초기화하지 않으면 이전에 작성한 상태가 남아있다.
*/
import React, { Component } from "react";
import EditorHeader from "components/editor/EditorHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as editorActions from "stores/modules/editor";

class EditorHeaderContainer extends Component {
  componentDidMount() {
    const { EditorActions } = this.props;
    EditorActions.initialize(); // 에디터를 초기화합니다.
  }

  // '뒤로가기' 버튼
  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  // '작성하기' 버튼
  handleSubmit = async () => {
    // 레퍼런스
    const { title, markdown, tags, EditorActions, history } = this.props;
    const post = {
      title,
      body: markdown,
      // 태그 텍스트를 ,로 분리시키고 앞뒤 공백을 지운 후 중복되는 값을 제거해줍니다.
      tags:
        tags === "" ? [] : [...new Set(tags.split(",").map(tag => tag.trim()))]
    };
    try {
      await EditorActions.writePost(post);
      // 페이지를 이동시킵니다. 주의: postId는 상단에서 레퍼런스를 만들지 말고
      // 이 자리에서 this.props.postId를 조회해 주어야 합니다(현재 값을 불러오기 위함).
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { handleGoBack, handleSubmit } = this;

    return <EditorHeader onGoBack={handleGoBack} onSubmit={handleSubmit} />;
  }
}

export default connect(
  state => ({
    title: state.editor.get("title"),
    markdown: state.editor.get("markdown"),
    tags: state.editor.get("tags"),
    postId: state.editor.get("postId")
  }),
  dispatch => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));
