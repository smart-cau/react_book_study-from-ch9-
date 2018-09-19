// 페이지 이동을 위해선 일반적인 a 태그를 쓰면 안됨!
// Link 컴포넌트를 사용해야 함!
import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="about">소개</Link>
        </li>
        <li>
          <Link to="/about/react">React 소개</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
