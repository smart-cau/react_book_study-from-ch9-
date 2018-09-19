import React from "react";
// 2번. query string 사용.
import queryString from "query-string";

const About = ({ match, location }) => {
  const query = queryString.parse(location.search);
  console.log(query);

  // query로 받아오는 값들의 자료형은 'string'임을 명심!
  // query 값과 boolean, int 타입의 자료형을 비교하고 싶을 땐
  // boolean, int 값을 string과 자료형을 통일시켜 준 다음 비교해야함!

  const { color } = query;

  return (
    <div>
      <h2 style={{ color }}>소개</h2>
      <p>
        안녕하세요, 저는 {match.params.name}
        입니다.
      </p>
    </div>
  );
};

export default About;
