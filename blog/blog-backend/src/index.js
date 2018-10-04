/*  18.5.5.2 컨트롤러 파일 작성
    라우트를 작성할 때, posts.get('/', ctx => {...})에서 
    {...} 부분이 너무 길어지면 코드 가독성과 관리가 힘들다.
    그래서 {...} 이 부분을 따로 분리해서 관리하는데,
    이 라우트 처리 함수{...}만 모아 놓은 파일을 '컨트롤러'라고 한다!
    컨트롤러에서는 백엔드 기능을 구현한다.
*/
const Koa = require("koa");
const Router = require("koa-router");
const bodyparser = require("koa-bodyparser");

// Router 모듈화
const api = require("./api");

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use("/api", api.routes()); // api 라우트 적용.

app.use(bodyparser());

// app 인스턴스에 router 적용.
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("listening to port 4000");
});
