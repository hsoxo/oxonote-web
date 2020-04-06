import React from "react";
import { EditorElementProps } from "../types/index";

class NumberedListElement extends React.Component<EditorElementProps> {
  render() {
    return <li {...this.props.attributes}>{this.props.children}</li>
  }
}

export default NumberedListElement