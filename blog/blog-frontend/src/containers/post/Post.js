/* Ch 21.2.3 Post 컴포넌트 생성.
    - Post라는 컨테이너 컴포넌트는 Redux Store에 있는 데이터를 컴포넌트로 전달한다.
    - PostInfo와 PostBody 컴포넌트를 불러온다
    - componentDidMount가 발생할 때, props로 받아 온 id를 사용하여 특정 id를 가진 포스트를 불러온다.
    - 렌더링하는 부분에서는 로딩 중일 때 아무것도 나타나지 않도록 null을 반환해주었다.
*/
import React, { Component } from "react";
import PostInfo from "components/post/PostInfo";
import PostBody from "components/post/PostBody";
import * as postActions from "stores/modules/post";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Post extends Component {
  initialize = async () => {
    const { PostActions, id } = this.props;
    try {
      await PostActions.getPost(id); // 여기도 글케 이해는 안됨... 질문
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    // 아래 3줄 원리 및 역할 뭐임.. 질문
    const { post, loading } = this.props;

    if (loading) return null;

    const { title, body, tags, publichedDate } = post.toJS();

    return (
      <div>
        <PostInfo title={title} tags={tags} publichedDate={publichedDate} />
        <PostBody body={body} />
      </div>
    );
  }
}

export default connect(
  state => ({
    post: state.post.get("post"),
    loading: state.pender.pending["post/GET_POST"] // 로딩상태 --> 무슨의미? 어디서 온거? 질문
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(Post);
