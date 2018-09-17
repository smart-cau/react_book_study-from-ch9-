import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as counterActions from "./modules/counter";
import * as postActions from "./modules/post";
// import axios from "axios";

class App extends Component {
  /* 15.2.2.5
     개발을 하다 보면, 요청을 완료한 후에도 컴포넌트에서 특정 작업을 해야할 때가 있음.
     ex) 로그인을 시도하고 -> 요청이 완료되어 성공했을 때 -> 다른 페이지로 이동시키기.
     이런 상황은 아래와 같이 로직을 짜면 됨.
  */
  // redux-thunk로 만든 액션 함수는 Promise를 반환한다.
  // 따라서 해당 함수를 호출하고는 뒤에 .then or .catch를 입력해서 구현할 수 있다.
  loadData = () => {
    const { PostActions, number } = this.props;
    PostActions.getPost(number) //number는 현재의 counter값.
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /* ES 7의 'async/await' 문법 활용.    Promise는 ES 6 문법.
  loadData = async () => {
    const { PostActions, number } = this.props;
    try {
      const response = await PostActions.getPost(number);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  */

  componentDidMount() {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/posts/1")
    //   .then(res => console.log(res)); 이렇게 여기서 웹 요청을 직접 하지 않을 것임.

    // 컴포넌트가 처음 마운트 될 때 PostActions.getPost(number) 호출.
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    // 이전 number와 현재 number가 다르면 요청을 시작.
    if (this.props.number !== prevProps.number) {
      this.loadData();
    }
  }

  render() {
    const { CounterActions, number, post, error, loading } = this.props;

    return (
      <div>
        <h1>{number}</h1>
        {/* {loading ? (
          <h2>로딩중...</h2>
        ) : error ? (
          <h2>오류 발생!</h2>
        ) : (
          <div>
            <h2>타이틀은 {post.title} 입니다.</h2>
            <p>id는 {post.id} 입니다. (body가 없음 ㅜㅜ)</p>
          </div>
        )} */}
        {/* 아래는 위의 주석과 같은 코드. {} 내부에서 함수를 선언하고 그 함수 자체를 호출함. */}
        {(() => {
          if (loading) return <h2>로딩중...</h2>;
          if (error) return <h2>오류 발생!</h2>;
          else
            return (
              <div>
                <h2>타이틀은 {post.title} 입니다.</h2>
                <p>id는 {post.id} 입니다. (body가 없음 ㅜㅜ)</p>
              </div>
            );
        })()}
        <button onClick={CounterActions.increment}>+</button>
        <button onClick={CounterActions.decrement}>-</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    number: state.counter,
    post: state.post.data,
    loading: state.post.pending,
    error: state.post.error
  }),
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(App);
