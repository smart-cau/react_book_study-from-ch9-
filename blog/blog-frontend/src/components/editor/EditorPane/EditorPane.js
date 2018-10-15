/*  Ch 20.6.1 CodeMirror 적용.
    - EditorPane에서 CodeMirror관련 js file과 styles을 불러오고,
    - componentDidMount가 되었을 때, CodeMirror 인스턴스를 만들어 페이지에 나타나게 할 것임.
    - 이 과정에서, code-editor class를 가진 div에 ref를 설정하여 해당 DOM에 CodeMirror를 삽입할 것이다.
*/

import React, { Component } from "react";
import styles from "./EditorPane.scss";
import classNames from "classnames/bind";

import CodeMirror from "codemirror";

import "codemirror/mode/markdown/markdown"; // 마크다운 문법 색상.
// 마크다운 내부에 들어가는 코드 색상
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/css/css";
import "codemirror/mode/shell/shell";

// CodeMirror를 위한 css 스타일
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

const cx = classNames.bind(styles);

/*  props로 EditorPaneContainer에서 다음의 내용을 받음.
      title={title}
      markdown={markdown}
      tags={tags}
      onChangeInput={handleChangeInput}
*/

class EditorPane extends Component {
  editor = null; // editor ref.
  CodeMirror = null; // CodeMirror 인스턴스.
  cursor = null; // 에디터의 텍스트 cursor 위치.

  initializeEditor = () => {
    this.CodeMirror = CodeMirror(this.editor, {
      mode: "markdown",
      theme: "monokai",
      lineNumbers: true, // 왼쪽에 라인 넘버 띄우기
      lineWrapping: true // 내용이 너무 길면 다음 줄에 작성.
    });
    // input 태그와는 달리, CodeMirror에 initializeEditor 함수가 호출될 때 onChange 이벤트를 직접 등록함.
    this.CodeMirror.on("change", this.handleChangeMarkdown);
  };

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = e => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target; // ---> 여기서 문제 발생. 진짜 말도 안되는 오타..... 죽자...
    // console.log(value, name);
    onChangeInput({ name, value });
  };

  handleChangeMarkdown = doc => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor(); // 텍스트 cursor 위치 저장.
    onChangeInput({
      name: "markdown",
      value: doc.getValue()
    });
  };

  // props로 받은 markdown 값을 CodeMirror 인스턴스에 반영해야 하기 때문에,
  // componentDidUpdate()에서 markdown 값을 바꾸면 setValue를 사용하여 내용을 변경해줌.
  componentDidUpdate(prevProps, prevState) {
    // makrdown이 변경되면 에디터 값도 변경함.
    // 이 과정에서 텍스트 커서의 위치가 최기화되기 때문에,
    // 저장한 커서의 위치가 있으면 해당 위치로 설정함.
    if (prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if (!codeMirror) return; // 인스턴스를 아직 만들지 않았을 때
      codeMirror.setValue(this.props.markdown);
      if (!cursor) return; // 커서가 없을 때
      codeMirror.setCursor(cursor);
    }
  }

  render() {
    const { handleChange } = this;
    const { tags, title } = this.props;
    // console.log(`this.props : ${JSON.stringify(this.props)}`);

    return (
      <div className={cx("editor-pane")}>
        <input
          className={cx("title")}
          placeholder="제목을 입력하세요."
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className={cx("code-editor")} ref={ref => (this.editor = ref)} />
        <div className={cx("tags")}>
          <div className={cx("description")}>Tag</div>
          <input
            name="tags"
            placeholder="태그를 입력하세요. (쉼표로 구분)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EditorPane;
