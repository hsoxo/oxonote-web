import React from "react";
import { EditorElementProps } from "../types/index";

class HeadTwoElement extends React.Component<EditorElementProps> {
  render() {
    return <h2 {...this.props.attributes}>{this.props.children}</h2>
  }
}

export default HeadTwoElement