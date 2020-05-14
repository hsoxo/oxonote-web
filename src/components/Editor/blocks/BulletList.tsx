import React from "react";
import {EditorElementProps} from "../types/index";

class BulletListElement extends React.Component<EditorElementProps> {
  render() {
    return <ul {...this.props.attributes}>{this.props.children}</ul>
  }
}

export default BulletListElement