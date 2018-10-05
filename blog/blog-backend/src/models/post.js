// title, body, tags, publishedDate의 총 4가지 필드가 있는 Schema 생성!
const mongoose = require("mongoose");

const { Schema } = mongoose;

// schema는 문서 내부의 각 필드의 data type을 정의한 객체!
const Post = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열 배열
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본 값으로 지정.
  }
});

// Model 생성! 모델 인스턴스를 만들고, module.exports로 내보내줌.
module.exports = mongoose.model("Post", Post);
/*  model() 함수는 기본적으로 파라미터 2개가 필요함.
    1) 스키마 이름
    2) 스키마 객체
    DB는 1) 스키마 이름을 정해주면 이 이름의 복수 형태로 DB Collection 이름을 만든다.
      ex) 스키마 이름 = post -> DB 이름 = posts
    이런 컨벤션을 따르고 싶지 않으면 3) 세번쨰 파라미터로 원하는 이름을 입력하면 됨. 450p 참고.
*/
