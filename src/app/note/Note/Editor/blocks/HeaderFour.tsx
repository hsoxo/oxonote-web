import React from "react";
import { EditorElementProps } from "../types/index";

class HeadFourElement extends React.Component<EditorElementProps> {
  render() {
    return <h4 {...this.props.attributes}>{this.props.children}</h4>
  }
}

export default HeadFourElement