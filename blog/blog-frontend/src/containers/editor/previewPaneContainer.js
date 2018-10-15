// title 값과 markdown 값을 store에서 받아 와 PreviewPane에 넣어준다.
import React, { Component } from "react";
import { connect } from "react-redux";
import PreviewPane from "components/editor/PreviewPane";

class previewPaneContainer extends Component {
  render() {
    const { markdown, title } = this.props;
    return <PreviewPane title={title} markdown={markdown} />;
  }
}

export default connect(state => ({
  title: state.editor.get("title"),
  markdown: state.editor.get("markdown")
}))(previewPaneContainer);
