// params.id를 받아 렌더링 하는 comp
import React from "react";

const Post = ({ match }) => {
  return <p>포스트 #{match.params.id}</p>;
};

export default Post;
