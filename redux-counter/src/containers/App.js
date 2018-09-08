// 5.2 App 컴포넌트 수정.
// App 컴포넌트를 Redux에 연결.
// 이 컴포넌트에는 store에서 필요한 값이 없으니, mapStateToProps는 null로 설정하고, 버튼용 mapDispatchToProps를 만든다.
// 여기에서 onCreate와 onRemove를 만들고, Buttons 컴포넌트의 props로 전달할 것이다.
import React, { Component } from "react";
import Buttons from "../components/Buttons";
import CounterListContainer from "./CounterListContainer";
import getRandomColor from "../lib/getRandomColor";

import { connect } from "react-redux";
import * as actions from "../actions";

class App extends Component {
  render() {
    const { onCreate, onRemove } = this.props;
    return (
      <div className="App">
        <Buttons onCreate={onCreate} onRemove={onRemove} />
        <CounterListContainer />
      </div>
    );
  }
}

// 액션 생성 함수 준비
const mapToDispatch = dispatch => ({
  onCreate: () => dispatch(actions.create(getRandomColor())),
  onRemove: () => dispatch(actions.remove())
});

// 리덕스에 연결시키고 내보낸다.
export default connect(
  null,
  mapToDispatch
)(App);

/*  이번에는 만든 컴포넌트를 불러와, 이를 redux에 연결하는 것이 아니라,
    파일 하나에서 컴포넌트를 정의하고 바로 연결해 주었다.
    이때는 AppContainer의 레퍼런스를 따로 만들 필요 없이 
    export 하는 부분에서 connect를 사용하여 redux에 연결시키면 된다.
*/
