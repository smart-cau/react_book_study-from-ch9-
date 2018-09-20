// Chunk 생성을 쉽게 하기 위해 따로 함수를 만들어 export 함.
import React from "react";

// 이 함수가 param으로 받는 getComponent는 다음과 같다.
// acyncComponent( () => import('./Home) )
// 이렇게 param으로 받은 함수는 constructor에서 실행하여 컴포넌트를 불러온다.
// 즉, 해당 컴포넌트를 실제로 렌더링할 때 파일을 불러오도록 설정한 것임.

// 컴포넌트가 로딩되면, 불러온 컴포넌트를 state에 집어넣고, 또 static 값으로도 설정한다.
// 컴포넌트가 unMount 되었다가 나중에 다시 Mount될 때는 컴포넌트를 새로 불러오지 않고,
// static 값으로 남아 있는 이전에 불러온 컴포넌트 정보를 재사용 한다.
export default function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    // static varaible에 대해 알아보자.
    static Component = null;
    state = { Component: AsyncComponent.Component };

    constructor(props) {
      super(props);
      if (AsyncComponent.Component) return;

      getComponent().then(({ default: Component }) => {
        AsyncComponent.Component = Component;
        this.setState({ Component });
      });
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}
