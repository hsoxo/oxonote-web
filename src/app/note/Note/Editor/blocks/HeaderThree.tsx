import React from "react";
import { EditorElementProps } from "../types/index";

class HeadThreeElement extends React.Component<EditorElementProps> {
  render() {
    return <h3 {...this.props.attributes}>{this.props.children}</h3>
  }
}

export default HeadThreeElement