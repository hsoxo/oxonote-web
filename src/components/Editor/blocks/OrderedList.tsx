import React from "react";
import {EditorElementProps} from "../types/index";

class NumberedListElement extends React.Component<EditorElementProps> {
  render() {
    return <ol {...this.props.attributes}>{this.props.children}</ol>
  }
}

export default NumberedListElement