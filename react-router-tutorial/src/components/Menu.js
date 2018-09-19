// 페이지 이동을 위해선 일반적인 a 태그를 쓰면 안됨!
// Link 컴포넌트를 사용해야 함!
import React from "react";
// NavLink는 '현재주소'와 '해당 컴포넌트의 목적지 주소'가 일치한다면, 특정 style or class를 지정할 수 있음.
import { NavLink } from "react-router-dom";

const Menu = () => {
  const activeStyle = {
    color: "green",
    fontSize: "2rem"
  };

  return (
    <div>
      <ul>
        {/* 해당링크를 활성화 했을 때, activeStle로 스타일을 지정할 수 있암.
            css 클래스를 지정하고 싶을 땐 activeClassName 값을 지정. */}
        <li>
          <NavLink exact to="/" activeStyle={activeStyle}>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/about" activeStyle={activeStyle}>
            소개
          </NavLink>
        </li>
        <li>
          <NavLink to="/about/react" activeStyle={activeStyle}>
            React 소개
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts" activeStyle={activeStyle}>
            포스트 목록
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
