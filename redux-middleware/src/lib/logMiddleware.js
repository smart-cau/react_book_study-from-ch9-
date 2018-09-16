// 미들웨어는 store를 생성할 때 적용할 수 있다.
/*  미들웨어로는 정말 많은 일들을 할 수 있다.
    - 액션 정보에 따라서 아예 무시할 수도 있다.(nex를 호룰하지 않고 return하면 된다.)
    - 액션 정보를 가로채서 수정한 후, 리듀서로 전달할 수도 있따.
    - 특히, 미들웨어는 네트워크 요청과 같은 비동기 작업을 할 때 매우 유용하다.
*/

const loggerMiddleware = store => next => action => {
  /*  'next'는 store.dispatch와 비슷한 역할.
      차이점은 next(action)을 했을 때는 그 다음 처리해야할 미들웨어로 액션을 넘겨주고,
      추가로 처리할 미들웨어가 없다면, 바로 리듀서에 넘겨준다는 것.
      하지만, store.dispatch는 다음 미들웨어로 넘기는 것이 아니라, 액션을 처음부터 디스패치함.
      따라서, Middleware 내부에서 store.dispatch를 사용할 떄는,
      (특정 조건을 만족하면 같은 액션이 아니라,)
      다른 액션으로 실행해야 한다.
  */

  /* 미들웨어 내용. */

  // 1. 현재 스토어 상태
  console.log("현재 상태 :", store.getState());

  // 2. 액션 정보
  console.log("액션 :", action);

  // 액션을 다음 Middleware 또는 Reducer로 넘긴다.
  const result = next(action);

  // 3. 액션을 처리 한 후의 스토어 상태를 기록.
  console.log("다음 상태 :", store.getState());
  console.log("\n");

  return result; // 여기에서 반환하는 값은, store.dispatch(ACTION_TYPE)했을 때의 결과이다.
};

export default loggerMiddleware;
