// 페이지 이동을 위해선 일반적인 a 태그를 쓰면 안됨!
// Link 컴포넌트를 사용해야 함!
import React from "react";
// NavLink는 '현재주소'와 '해당 컴포넌트의 목적지 주소'가 일치한다면, 특정 style or class를 지정할 수 있음.
import { NavLink, withRouter } from "react-router-dom";
// location, match, history와 같은 props는 Router로 사용되는 component에서만 접근 가능했다.
// 하지만, withRouter를 사용하면 Router로 사용되지 않더라도 위 3가지 props에 대해 접근 가능하다!
// withRouter는 주로 history에 접근하여 컴포넌트에서 라우터를 조작하는데 사용됨.

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

export default withRouter(Menu);
