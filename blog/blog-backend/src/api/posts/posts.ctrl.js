/*  어떤 함수의 반환 값이 Prmoise 객체일 때, async/await 사용가능.
    await를 사용하려면 함수를 선언하는 부분 앞에 async 키워드를 넣어야함.
    await를 사용할 때는 try~catch 구문으로 오류를 처리해야 함.
*/
/*  Ch 19.8 요청검증
    objectId가 아닌 잘못된 id를 client가 요청할 경우를 대비할 요청검증.
    id 값을 사용하는 read / remove / update에서의 검증이 필요함.
*/
const Post = require("../../models/post");

const { ObjectId } = require("mongoose").Types;

// 코드 반복을 피하기 위해 함수를 따로 만듦.
exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  // 검증실패
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // 400 Bad Request
    return null;
  }

  return next(); // next를 리턴해야 ctx.body가 제대로 설정됨.
};

/*  포스트 작성
    POST /api/posts
    { title, body }
*/
exports.write = async ctx => {
  const { title, body, tags } = ctx.request.body;

  //  새 Post 인스턴스를 만듦. 새 인스터스를 만들 때는 new 사용.
  const post = new Post({
    title,
    body,
    tags
  });

  try {
    await post.save(); // DB에 등록
    ctx.body = post; // 저장된 결과를 반환
  } catch (e) {
    // DB 오류 발생
    ctx.throw(e, 500);
  }
};

exports.list = async ctx => {
  try {
    const posts = await Post.find().exec(); // find() 함수를 호출한후에 exec()를 붙여 주어야 서버에 쿼리를 요청한다.
    // data를 조회할 때, 특정 조건을 설정할 수 있으며 불러오는 제한도 설정할 수 있다. 이 부분은 추후 pagenation 기능 구현할 때 알아볼 것.
    ctx.body = posts;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// 특정 Id를 찾을 때는 .findById()를 사용.
/*  특정 포스트 조회
    GET /api/posts/:id
*/
exports.read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    // 포스트가 존재하지 않을 떄
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// Ch 19.7
/*  data를 삭제하는 3가지 방법.
    1) remove : 특정 조건을 만족하는 데이터들을 모두 지운다.
    2) findByIdAndRemove : id를 찾아서 지운다.  --> (이 방법 사용.)
    3) findOneAndRemove : 특정 조건을 만족하는 데이터 하나를 찾아서 제거한다.
*/
/*  특정 포스트 제거.
    DELETE /api/posts/:id
*/
exports.remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// data를 update할 때는 findByIdAndUpdate() 함수를 사용.
// 첫 번째 param은 id / 두 번째 param은 업데이트 내용 / 세 번째 param은 update의 설정 객체
/*  포스트 수정(특정 필드 변경)
    PATCH /api/posts/:id
    { title, body}
*/
exports.update = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
      // 이 값을 설정해야 업데이트된 객체를 반환한다.
      // 설정하지 않으면 업데이트되기 전의 객체를 반환한다.
    }).exec();

    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
