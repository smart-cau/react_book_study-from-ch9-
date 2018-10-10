// 에디터 위쪽에 위치하는 파란색 Headr.
/*  Resize기능 구현!
    - 각 영역 사이에 separator를 렌더링 후,
    - 이 DOM을 클릭할 때 이벤트를 등록.
    - 커서 위치에 따라 state를 변경하고,
    - 이 state에따라 각 영역의 크기를 변경하여 rerendering하도록 설정.
*/
import React, { Component } from "react";
import styles from "./EditorTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class EditorTemplate extends Component {
  state = {
    leftPercentage: 0.5
  };

  // separator 클릭 후, 마우스를 움직이면 그에 따라 leftPercentage 업데이트
  handleMouseMove = e => {
    this.setState({
      leftPercentage: e.clientX / window.innerWidth
    });
  };

  // 마우스를 뗐을 때, 등록한 이벤트 제거.
  handleMouseUp = e => {
    document.body.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  // separator 클릭할 때.
  handleSeparatorMouseDown = e => {
    document.body.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  render() {
    const { header, editor, preview } = this.props;
    const { leftPercentage } = this.state;
    const { handleSeparatorMouseDown } = this;

    // 각 영역에 flex 값 적용.
    const leftStyle = {
      flex: leftPercentage
    };
    const rightStyle = {
      flex: 1 - leftPercentage
    };

    // separator 위치 설정
    const separatorStyle = {
      left: `${leftPercentage * 100}%`
    };

    return (
      <div className={cx("editor-template")}>
        {header}
        <div className={cx("panes")}>
          <div className={cx("pane", "editor")} style={leftStyle}>
            {editor}
          </div>
          <div className={cx("pane", "preview")} style={rightStyle}>
            {preview}
          </div>
          <div
            className={cx("separator")}
            style={separatorStyle}
            onMouseDown={handleSeparatorMouseDown}
          />
        </div>
      </div>
    );
  }
}

export default EditorTemplate;

// DOM 구조에 대해 공부해야겠다.
// document.body & window에 대해 검색해보자.
