// 우리가 방금 만든 loggerMiddleware와 redux 모듈 안에 있는 미들웨어를 적용하는 함수인 applyMiddleware 불러오기.
import { createStore, applyMiddleware } from "redux";
import modules from "./modules";
// import loggerMiddleware from "./lib/loggerMiddleware";
import { createLogger } from "redux-logger";
/*  Log Middleware를 만들 떄 설정을 커스터마이징할 수 있다.
    https://github.com/evgenyrodionov/redux-logger#options
 */
// import ReduxThunk from "redux-thunk"; 이번에는 다른 미들웨어 사용.
import promiseMiddleware from "redux-promise-middleware";

const logger = createLogger();

// 책 347p 참고.
// action type 뒷부분 접미사 커스터마이징.
const pm = promiseMiddleware({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"]
});

const store = createStore(
  modules,
  window.devToolsExtension && window.devToolsExtension(),
  // Middleware가 여려 개일 때는 파라미터로 전달하면 된다. ex: applyMiddleware(a, b, c)
  // Middleware 순서는 여기에서 전달한 파라미터 순서대로 지정한다.
  applyMiddleware(logger, pm)
);

export default store;
