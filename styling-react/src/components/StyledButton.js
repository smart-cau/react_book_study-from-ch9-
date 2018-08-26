/*
styled-component 방법... 어렵고 내가 쓸 일이 없을 것 같다. 넘어가자 
*/

import React from "react";
import styled from "styled-components";

// ` ` -> ES6의 Tagged Template Literals.
// 이 문법을 사용하는 이유 = 스타일링을 할 때 props에 접근하기 위해서.
const Wrapper = styled.div`
  border: 1px solid black;
  display: inline-block;
  padding: 1rem;
  border-radius: 3px;
  font-size: ${props => props.fontSize};
  ${props =>
    props.big &&
    `
    fonst-size: 2rem; 
    padding: 2rem;
    `} &:hover {
    background: black;
    color: white;
  }
`;

const StyledButton = ({ children, big, ...rest }) => {
  return (
    <Wrapper fontSize="1.25rem" {...rest} big={big}>
      {children}
    </Wrapper>
  );
};

export default StyledButton;
