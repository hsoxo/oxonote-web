import React from "react";
import { EditorElementProps } from "../types/index";

class HeadFiveElement extends React.Component<EditorElementProps> {
  render() {
    return <h5 {...this.props.attributes}>{this.props.children}</h5>
  }
}

export default HeadFiveElement