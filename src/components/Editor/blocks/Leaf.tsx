import * as NAMES from '../constants/names'
import React from 'react'

const prismToken = [
  'comment',
  'prolog',
  'doctype',
  'cdata',
  'punctuation',
  'namespace',
  'property',
  'tag',
  'boolean',
  'number',
  'constant',
  'symbol',
  'deleted',
  'selector',
  'attr-name',
  'string',
  'char',
  'builtin',
  'inserted',
  'operator',
  'entity',
  'url',
  'string',
  'string',
  'atrule',
  'attr-value',
  'keyword',
  'function',
  'class-name',
  'regex',
  'important',
  'variable',
  'important',
  'bold',
  'italic',
  'entity'
]

const Leaf = ({ attributes, children, leaf }: any) => {
  const activeToken = prismToken.filter(x => leaf[x])
  const className = 'token ' + activeToken.join(' ')

  if (leaf[NAMES.INLINE_BOLD]) {
    children = <b>{children}</b>
  }

  if (leaf[NAMES.INLINE_ITALIC]) {
    children = <em>{children}</em>
  }

  if (leaf[NAMES.INLINE_CODE]) {
    children = <code className="language-text inline-code">{children}</code>
  }

  if (leaf[NAMES.INLINE_LINK]) {
    children = <a href={leaf.href}>{children}</a>
  }
  return (
    <span {...attributes} className={className}>
      {children}
    </span>
  )
}

export default Leaf
