// Route 관련 component들을 비동기적으로 불러오는 index file.
import asyncComponent from "../lib/asyncComponent";

export const Home = asyncComponent(() => import("./Home"));
export const About = asyncComponent(() => import("./About"));
export const Post = asyncComponent(() => import("./Post"));
export const Posts = asyncComponent(() => import("./Posts"));

/*  index.js와 index.async.js를 분리하는 이유
    - 개발 서버에서 chunk를 생성하여 code spliting을 하면 코드 내용을 변경했을 때 자동으로 새로고침 하지 않음
    - Route Code Spliting은 실제로 나중에 사용자에게 전달할 Production Build에만 적용할 수 있음.
    - 그래서 나중에 개벌 서버에서 비동기 라우트를 비활성화 할 것임.(일단 여기선 잘 잘동하는지 확인하려고 개발 서버에 적용해보겠음.)
*/
