/*  - session에 값을 설정할 때는 ctx.session.이름 = 값
    - 조회할 때는 ctx.session.이름
    - session을 파기할 때는 ctx.session = null로 설정.
*/

const { ADMIN_PASS: adminPass } = process.env;

// POST /api/auth/login : 비밀번호 로그인
exports.login = ctx => {
  const { password } = ctx.request.body;

  if (adminPass === password) {
    ctx.body = {
      success: true
    };
    // 로그인에 성공하면 logged 값을 true로 설정.
    ctx.session.logged = true;
  } else {
    ctx.bod = {
      success: false
    };
    ctx.status = 401; // Unauthorized
  }
};

// GET /api/auth/check : 현재 로그인 상태 확인
exports.check = ctx => {
  ctx.body = {
    // ! 문자를 두 번 입력하여,
    // 값이 존재하지 않을 때도 false를 반환하도록 설정.
    logged: !!ctx.session.logged
  }
}

// POST /api/auth/logout : 로그아웃
exports.logout = ctx => {
  ctx.session = null;
  ctx.status = 204; // No Content
}
