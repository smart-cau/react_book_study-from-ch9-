// 에디터 위쪽에 위치하는 파란색 Headr.
import React, { Component } from "react";
import styles from "./EditorTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class EditorTemplate extends Component {
  render() {
    const { header, editor, preview } = this.props;

    return (
      <div className={cx("editor-template")}>
        {header}
        <div className={cx("panes")}>
          <div className={cx("pane", "editor")}>{editor}</div>
          <div className={cx("pane", "preview")}>{preview}</div>
        </div>
      </div>
    );
  }
}

export default EditorTemplate;
