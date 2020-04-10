import React from "react";
import { EditorElementProps } from "../types/index";

class ParagraphElement extends React.Component<EditorElementProps> {
  render() {
    return <div {...this.props.attributes}>{this.props.children}</div>
  }
}

export default ParagraphElement