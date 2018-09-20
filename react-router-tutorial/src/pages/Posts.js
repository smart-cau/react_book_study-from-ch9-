import React from "react";
import Post from "./Post";
import { Link, Route } from "react-router-dom";

const Posts = ({ match }) => {
  console.log("Posts: ", match);
  return (
    <div>
      <h3>포스트 목록</h3>
      <ul>
        {/* match객체는 .url과 .params를 갖고 있다. 
            이 중, .match.url은, 현재 설정된 url을 가르킨다.
            이 component에서 match.url은, App.js에서 설정된 /posts를 의미한다.
            match.url 대신 /posts를 써도 완전 무방하다.
        */}
        <li>
          <Link to={`${match.url}/1`}>포스트 #1</Link>
        </li>
        <li>
          <Link to={`${match.url}/2`}>포스트 #2</Link>
        </li>
        <li>
          <Link to={`${match.url}/3`}>포스트 #3</Link>
        </li>
      </ul>
      <Route exact path={match.url} render={() => <p>포스트를 선택하세요</p>} />
      <Route exact path={`${match.url}/:id`} component={Post} />
    </div>
  );
};

export default Posts;
