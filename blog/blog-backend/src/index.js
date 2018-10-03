const Koa = require("koa");
const Router = require("koa-router");

// Router 모듈화
const api = require("./api");

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use("/api", api.routes()); // api 라우트 적용.

/* 18.5.2 Route Parameter와 query

router.get("/", ctx => {
  ctx.body = "Home";
});
// parameters는 ctx.params로 접근 가능.
router.get("/about/:name?", ctx => {
  const { name } = ctx.params;
  // name의 존재 유무에 따라 다른 결과 출력
  ctx.body = name ? `${name}의 소개` : `소개`;
});

// query는 query의 값이 문자열이라면 ctx.querystring으로,
// 문자열이 아니라면 ctx.query로 접근 가능.
router.get("/posts", ctx => {
  const { id } = ctx.query;
  ctx.body = id ? `Post # ${id}` : "there is no post id";
});
*/

// app 인스턴스에 router 적용.
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("listening to port 4000");
});
