// Routing을 담당하는 component.
import React from "react";
import { Switch, Route } from "react-router-dom";
import { ListPage, PostPage, EditorPage, NotFoundPage } from "../pages";

/*  Switch 컴포넌트는 설정된 라우트 중에서 일치하는 라우트 하나만 보여줌.
    먼저 매칭된 라우트 하나만 보여준다는 말.
    NotFoundPage에는 path를 설정하지 않았기 때문에 해당되는 path가 없으면
    NotFoundPage를 기본을 보여줌.
*/

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={ListPage} />
      <Route path="/page/:page" component={ListPage} />
      <Route path="/tag/:tag/:page?" component={ListPage} />
      <Route path="/post/:id" component={PostPage} />
      <Route path="/editor" component={EditorPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
