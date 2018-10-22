/*  Ch 21.5.2 비밀번호 인증 API 생성.
  - 3 종류의 API를 만든다.
  1) POST /api/auth/login : 비밀번호 로그인
  2) GET /api/auth/check : 현재 로그인 상태 확인
  3) POST /api/auth/logout : 로그아웃
*/

const Router = require("koa-router");

const auth = new Router();
const authCtrl = require("./auth.ctrl");

auth.post("/login", authCtrl.login);
auth.get("/check", authCtrl.check);
auth.post("/logout", authCtrl.logout);

module.exports = auth;
