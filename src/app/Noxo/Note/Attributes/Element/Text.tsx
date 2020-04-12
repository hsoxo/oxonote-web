import React from 'react'
import { ElementProps } from './types'
import { NoBorderInput } from '@/components/OxOUI/Input'
import BaseElement from './Base'

import { ContentViewProps, ContentPopoverProps } from './Base'

export const TextContent = ({ noteAttr }: ContentViewProps) => {
  return noteAttr.value
}

export const TextContentView: React.FunctionComponent<ContentViewProps> = ({
  noteAttr
}) => {
  return (
    <React.Fragment>
      {noteAttr.value || <span style={{ color: 'grey' }}>请输入描述</span>}
    </React.Fragment>
  )
}

const TextEditor: React.FunctionComponent<ContentPopoverProps> = ({
  noteAttr,
  onNoteAttrChange
}) => {
  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onNoteAttrChange({ value: newValue })
  }
  return (
    <NoBorderInput
      defaultValue={noteAttr.value}
      autoFocus={true}
      onBlur={handleChange}
    />
  )
}

const TextAttributeBody = (props: ElementProps) => {
  return (
    <BaseElement
      {...props}
      editable={true}
      display={TextContentView}
      popover={TextEditor}
    />
  )
}

export default TextAttributeBody
