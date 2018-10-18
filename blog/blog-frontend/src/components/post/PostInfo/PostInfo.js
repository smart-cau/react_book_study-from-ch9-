import React from "react";
import styles from "./PostInfo.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import moment from "moment";

const cx = classNames.bind(styles);

const PostInfo = ({ publichedDate, title, tags }) => (
  <div className={cx("post-info")}>
    <div className={cx("info")}>
      <h1>{title}</h1>
      <div className={cx("tags")}>
        {// tags가 존재할 때만 map을 실행. -- '~가 존재할 때만' 이런 방법 기억!
        tags &&
          tags.map(tag => (
            <Link key={tag} to={`/tag/${tag}`}>
              #{tag}
            </Link>
          ))}
      </div>
      {/* momont --> https://momentjs.com 참고 */}
      <div className={cx("date")}>{moment(publichedDate).format("ll")}</div>
    </div>
  </div>
);

export default PostInfo;
