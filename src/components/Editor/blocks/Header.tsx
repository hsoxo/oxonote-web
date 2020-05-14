import React from "react";
import {EditorElementProps} from "../types/index";

export class HeadOneElement extends React.Component<EditorElementProps> {
  render() {
    return <h1 {...this.props.attributes}>{this.props.children}</h1>
  }
}
export class HeadTwoElement extends React.Component<EditorElementProps> {
  render() {
    return <h2 {...this.props.attributes}>{this.props.children}</h2>
  }
}
export class HeadThreeElement extends React.Component<EditorElementProps> {
  render() {
    return <h3 {...this.props.attributes}>{this.props.children}</h3>
  }
}
export class HeadFourElement extends React.Component<EditorElementProps> {
  render() {
    return <h4 {...this.props.attributes}>{this.props.children}</h4>
  }
}
export class HeadFiveElement extends React.Component<EditorElementProps> {
  render() {
    return <h5 {...this.props.attributes}>{this.props.children}</h5>
  }
}
export class HeadSixElement extends React.Component<EditorElementProps> {
  render() {
    return <h6 {...this.props.attributes}>{this.props.children}</h6>
  }
}

interface BlockElementRendererProps {
  matched: Array<string>
}

