// '/'  '/page/:page'  '/tag/:tag/:page?'에서 렌더링됨.
import React from "react";
import PageTemplate from "components/common/PageTemplate";
import ListWrapper from "components/list/ListWrapper";
import PostList from "components/list/PostList";
import Pagination from "components/list/Pagination";

const ListPage = () => {
  return (
    <PageTemplate>
      <ListWrapper>
        <PostList />
        <Pagination />
      </ListWrapper>
    </PageTemplate>
  );
};

export default ListPage;
