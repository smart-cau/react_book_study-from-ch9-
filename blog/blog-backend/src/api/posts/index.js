/*  src/api/posts/posts.crtrl.js에서 exports한 함수는 다음과 같이 사용할 수 있다.
    const 모듈이름 = require('파일이름);
    모듈이름.이름();
*/
const Router = require("koa-router");
const postsCtrl = require("./posts.ctrl");

const posts = new Router();

posts.get("/", postsCtrl.list);
posts.get("/:id", postsCtrl.checkObjectId, postsCtrl.read); // 순서 잘 지켜야함!

// Login 검사하고 -> (id 있나 검사하고) -> 함수 실행.
posts.post("/", postsCtrl.checkLogin, postsCtrl.write);
posts.delete(
  "/:id",
  postsCtrl.checkLogin,
  postsCtrl.checkObjectId,
  postsCtrl.remove
);
/* posts.put 삭제됨. */
posts.patch(
  "/:id",
  postsCtrl.checkLogin,
  postsCtrl.checkObjectId,
  postsCtrl.update
);

module.exports = posts;
