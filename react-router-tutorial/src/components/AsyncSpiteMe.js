// Ch 17.2 SplitMe를 비동기적으로 불러오는 컴포넌트.
// 버튼을 눌렀을 때, SplitMe 컴포넌트를 불러와 state에 담고, 이를 렌더링 해준다.
import React, { Component } from "react";

class AsyncSpiteMe extends Component {
  state = {
    SplitMe: null
  };

  loadSpitMe = () => {
    // 비동기적으로 파일을 불러오려면, import를 코드 맨 위 쪽이 아니라 특정 함수 내부(or LifeCycleMethod)에서 작성함. or 특정 이벤트를 설정.
    // import 함수는 Promise를 결과로 반환함.
    // import()는 모듈의 전체 name space를 불러오므로, default를 직접 지정해야 함.
    import("./SpliteMe").then(({ default: SplitMe }) => {
      this.setState({
        SplitMe
      });
    });
  };

  render() {
    const { SplitMe } = this.state;
    // SplitMe가 있으면 이를 렌더링 하고, 없으면 버튼을 렌더링한다.
    // 버튼을 누르면 SplitMe를 불러온다.
    return SplitMe ? (
      <SplitMe />
    ) : (
      <button onClick={this.loadSpitMe}>SpliteMe 로딩</button>
    );
  }
}

export default AsyncSpiteMe;
