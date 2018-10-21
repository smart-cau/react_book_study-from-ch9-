// .env파일. 이 파일에는 서버에서 사용할 포트와 Mongo DB 주소를 넣어놨음. DB 이름은 blog.
// .env 파일 적용. Node.js에서 환경변수는 process.env파일로 조회 가능.
require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");
const bodyparser = require("koa-bodyparser");

const mongoose = require("mongoose");
// Ch 21.5.1 관리자 로그인 - 서버에 세션 구현
const session = require("koa-session");

// 비구조화 할당 문법으로 process.env 파일 내부 값에 대한 레퍼런스를 만듦.
const {
  PORT: port = 4000, // 값이 존재하지 않는다면 4000을 기본 값으로 사용.
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
} = process.env;

// mongoose를 사용하여 서버에 DB 연결.
mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정. (자세한 설명 = 447p)
mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(e => {
    console.error(e);
  });

// Router 모듈화
const api = require("./api");

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use("/api", api.routes()); // api 라우트 적용.

app.use(bodyparser());

// session/key 적용
const sessionConfig = {
  maxAge: 86400000 //세션 유효 기간 = 1일.
  // signed: true가 기본으로 설정되어 있음.
};

app.use(session(sessionConfig, app));
app.keys = [signKey];

// app 인스턴스에 router 적용.
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("listening to port", port);
});
