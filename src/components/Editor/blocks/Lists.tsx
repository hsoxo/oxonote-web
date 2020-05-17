import React from 'react'
import { EditorElementProps } from '../types/index'

export class ListItemElement extends React.Component<EditorElementProps> {
  render() {
    return <li {...this.props.attributes}>{this.props.children}</li>
  }
}

export class BulletListElement extends React.Component<EditorElementProps> {
  render() {
    return <ul {...this.props.attributes}>{this.props.children}</ul>
  }
}

export class OrderedListElement extends React.Component<EditorElementProps> {
  render() {
    return <ol {...this.props.attributes}>{this.props.children}</ol>
  }
}
