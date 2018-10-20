// '/'  '/page/:page'  '/tag/:tag/:page?'에서 렌더링됨.
import React from "react";
import PageTemplate from "components/common/PageTemplate";
import ListWrapper from "components/list/ListWrapper";
import ListContainer from "containers/list/ListContainer";

const ListPage = ({ match }) => {
  // page의 기본 값을 1로 설정.
  const { page = 1, tag } = match.params;
  return (
    <PageTemplate>
      <ListWrapper>
        {/* pagination할 때 page번호. 10진법으로 전환. */}
        <ListContainer page={parseInt(page, 10)} tag={tag} />
      </ListWrapper>
    </PageTemplate>
  );
};

export default ListPage;
