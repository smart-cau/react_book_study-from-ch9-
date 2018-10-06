/*  어떤 함수의 반환 값이 Prmoise 객체일 때, async/await 사용가능.
    await를 사용하려면 함수를 선언하는 부분 앞에 async 키워드를 넣어야함.
    await를 사용할 때는 try~catch 구문으로 오류를 처리해야 함.
*/
/*  Ch 19.8.1 ObjectId 검증
    objectId가 아닌 잘못된 id를 client가 요청할 경우를 대비할 요청검증.
    id 값을 사용하는 read / remove / update에서의 검증이 필요함.

    Ch 19.8.2 Request Body 검증
    client가 post를 작성을 POST 요청할 때, 서버는 title / body / tags 값을 모두 전달받아야 한다.
    client가 어느 값을 빼먹었다면 400 error를 발생시켜야함.
    이를 위해 객체 검증 lib인 joi 설치.
*/

const Post = require("../../models/post");
const { ObjectId } = require("mongoose").Types;
const Joi = require("joi");

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
  // 객체가 지닌 값들을 검증
  const schema = Joi.object().keys({
    title: Joi.string().required(), // required()를 붙여주면 필수항목이라는 의미.
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required() // 문자열 배열
  });

  // 첫 번째 param은 검증할 객체 / 두 번째는 schema
  const result = Joi.validate(ctx.request.body, schema);

  // error 발생하면 error 내용 응답
  if (result.error) {
    (ctx.status = 400), (ctx.body = result.error);
    return;
  }

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
  /*  Ch 19.9 Pagenation 구현하기
  1) 가짜데이터 생성 (post man으로 함.)
  2) 포스트를 역순으로 정렬하기(= 최신 포스트 먼저 보여주기.)
  ---> .sort({ key: -1 or 1 }) 사용. 1은 오름차순, -1은 내림차순 정렬.
  3) 보이는 개수 제한.
  ---> .limit(제한할 갯수) 함수 사용!
  4) 페이지기능 구현
  ---> .skip(불러올 갯수n) 함수 사용. 그러면 처음의 n개를 제외하고 다음 n개를 불러옴. n(page 값)을query로 받아오겠음.
  5) 마지막 페이지 번호 알려주기.
  6) 미리보기 내용 길이 제한.
  ---> (a) .toJSON() 사용. (b) .lean() 사용.  // (b) 방법으로 사용. (a) 는 472p 참고.
  */

  // page가 주어지지 않았다면 1로 간주.
  // query는 문자열 형태로 받아 오므로 숫자로 변환!
  const page = parseInt(ctx.query.page || 1, 10);

  // 잘못된 페이지가 주어졌다면 오류.
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec(); // find() 함수를 호출한후에 exec()를 붙여 주어야 서버에 쿼리를 요청한다.

    // 5) 마지막 페이지 번호 알려주기.
    const postCount = await Post.countDocuments().exec();

    // 마지막 페이지 알려주기. ctx.set은 response header를 설정.
    ctx.set("Last-Page", Math.ceil(postCount / 10));

    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
    });

    ctx.body = posts.map(limitBodyLength);
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
