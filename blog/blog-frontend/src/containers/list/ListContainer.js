/*  Ch 21.3.3 ListContainer 컴포넌트 생성.
    - PostList와 Pagination 컴포넌트를 내장.
    - 이 Container는 나중에 ListPage에서 tag 값과 page 값을 전달받는다.
      - 이에 따라 포스트 리시트를 불러오는 API를 호출하고, 데이터를 PostList와 Pagination에 넣어주며,
      - page 값이 변하면, 리스트를 새로 불러온다.
*/
import React, { Component } from "react";
import PostList from "components/list/PostList";
import Pagination from "components/list/Pagination";
import * as listActions from "stores/modules/list";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ListContainer extends Component {
  getPostList = () => {
    // page와 tag 값을 부모에게서 받아온다.
    const { page, tag, ListActions } = this.props;
    ListActions.getPostList({
      page,
      tag
    });
  };

  componentDidMount() {
    this.getPostList();
  }

  componentDidUpdate(prevProps, prevState) {
    // 페이지 & 태그가 바뀔 때, 리스트를 다시 불러온다.
    if (
      prevProps.page !== this.props.page ||
      prevProps.tag !== this.props.tag
    ) {
      this.getPostList();
      // 스크롤바를 맨 위로 올린다. -- 기억
      document.documentElement.scrollTop = 0;
    }
  }

  render() {
    const { posts, tag, page, lastPage, loading } = this.props;
    if (loading) return null; // 로딩 중에는 아무것도 보여주지 않는다.
    return (
      <div>
        <PostList posts={posts} />
        <Pagination page={page} lastPage={lastPage} tag={tag} />
      </div>
    );
  }
}

export default connect(
  state => ({
    lastPage: state.list.get("lastPage"),
    posts: state.list.get("posts"),
    loading: state.list.get("loading")
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);
