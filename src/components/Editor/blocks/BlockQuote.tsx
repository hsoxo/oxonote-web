import React from 'react'
import { EditorElementProps } from '../types/index'

class BlockQuoteElement extends React.Component<EditorElementProps> {
  render() {
    return (
      <blockquote {...this.props.attributes}>{this.props.children}</blockquote>
    )
  }
}

export default BlockQuoteElement
