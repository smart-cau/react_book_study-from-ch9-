import React from "react";
import PageTemplate from "components/common/PageTemplate";
import Post from "containers/post/Post";
import AskRemoveModalContainer from "containers/modal/AskRemoveModalContainer";

const PostPage = ({ match }) => {
  const { id } = match.params; // 이거 뭐였지.. Ch 18에서 봤었다.. 질문.
  return (
    <PageTemplate>
      <Post id={id} />
      <AskRemoveModalContainer />
    </PageTemplate>
  );
};

export default PostPage;
