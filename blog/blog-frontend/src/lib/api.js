import axios from "axios";
import queryString from "query-string";

// 포스트 쓰기 API 함수.
export const writePost = ({ title, body, tags }) =>
  axios.post("/api/posts", { title, body, tags });
// 포스트 읽기 API 함수.
export const getPost = id => axios.get(`/api/posts/${id}`);

/*  // 포스트 List API 함수.
    - tag 값과 page값이 있는 객체를 param으로 받는다.
    - 객체로 전달된 위 값은 query-string lib을 통해 문자열 URL 쿼리 형태로 변환해 API 주소 뒷부분에 붙여준다.
    - 객체를 URL 쿼리 문자열로 변환할 때 -> querystring.stringify() 사용.
*/
export const getPostList = ({ tag, page }) =>
  axios.get(`/api/posts/${queryString.stringify({ tag, page })}`);
