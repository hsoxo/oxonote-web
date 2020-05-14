import React from 'react'
import {EditorElementProps} from "./types";

const Leaf: React.FunctionComponent<EditorElementProps> = props => {
  return (
    <span
      {...props.attributes}
      // style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

export default Leaf
