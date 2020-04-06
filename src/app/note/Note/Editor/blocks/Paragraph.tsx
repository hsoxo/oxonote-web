import React from "react";
import { EditorElementProps } from "../types/index";

class ParagraphElement extends React.Component<EditorElementProps> {
  render() {
    return <p {...this.props.attributes}>{this.props.children}</p>
  }
}

export default ParagraphElement