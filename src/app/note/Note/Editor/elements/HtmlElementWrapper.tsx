import React from 'react'

interface EditorElementProps {
  children: any
  attributes: any
}

export const DefaultElement: React.FunctionComponent<EditorElementProps> = props => {
  return <p {...props.attributes}>{props.children}</p>
}

export const CodeElement: React.FunctionComponent<EditorElementProps> = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export const BlockQuoteElement: React.FunctionComponent<EditorElementProps> = props => {
  return <blockquote {...props.attributes}>{props.children}</blockquote>
}

export const BulletListElement: React.FunctionComponent<EditorElementProps> = props => {
  return <ul {...props.attributes}>{props.children}</ul>
}

export const ListElement: React.FunctionComponent<EditorElementProps> = props => {
  return <li {...props.attributes}>{props.children}</li>
}

export const HeadOneElement: React.FunctionComponent<EditorElementProps> = props => {
  return <h1 {...props.attributes}>{props.children}</h1>
}

export const HeadTwoElement: React.FunctionComponent<EditorElementProps> = props => {
  return <h2 {...props.attributes}>{props.children}</h2>
}

export const HeadThreeElement: React.FunctionComponent<EditorElementProps> = props => {
  return <h3 {...props.attributes}>{props.children}</h3>
}

export const HeadFourElement: React.FunctionComponent<EditorElementProps> = props => {
  return <h4 {...props.attributes}>{props.children}</h4>
}

export const HeadFiveElement: React.FunctionComponent<EditorElementProps> = props => {
  return <h5 {...props.attributes}>{props.children}</h5>
}

export const HeadSixElement: React.FunctionComponent<EditorElementProps> = props => {
  return <h6 {...props.attributes}>{props.children}</h6>
}