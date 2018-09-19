import React from "react";

/*  js에서 페이지를 이동해야 하는 경우가 있음.
    ex) 로그인이 성공했을 때, 특정 경로로 이동시키기. 이는 Link comp로는 부족함.
    이를 위해 라우트로 사용된 component가 받아 오는 props 중 하나인 history 객체의 push 함수 사용!
*/
const Home = ({ history }) => {
  return (
    <div>
      <h2>홈</h2>
      <button
        onClick={() => {
          history.push("/about/javascript");
        }}
      >
        JavaScript를 사용하여 page 이동!!
      </button>
    </div>
  );
};

export default Home;
