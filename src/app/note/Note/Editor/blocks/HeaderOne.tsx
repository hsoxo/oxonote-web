import React from "react";
import { EditorElementProps } from "../types/index";

class HeadOneElement extends React.Component<EditorElementProps> {
  render() {
    return <h1 {...this.props.attributes}>{this.props.children}</h1>
  }
}

export default HeadOneElement