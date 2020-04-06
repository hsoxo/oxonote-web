import React from "react";
import { EditorElementProps } from "../types/index";

class HeadSixElement extends React.Component<EditorElementProps> {
  render() {
    return <h6 {...this.props.attributes}>{this.props.children}</h6>
  }
}

export default HeadSixElement