import React, {FocusEvent, KeyboardEvent, FunctionComponent, useState, ChangeEvent} from 'react'
import { ElementProps } from './types'
import { NoBorderInput } from '@/components/OxOUI/Input'
import BaseElement from './Base'

import { ContentViewProps, ContentPopoverProps } from './Base'

export const TextContent = ({ noteAttr }: ContentViewProps) => {
  return noteAttr.value
}

export const TextContentView: FunctionComponent<ContentViewProps> = ({
  noteAttr
}) => {
  return (
    <React.Fragment>
      {noteAttr.value || <span style={{ color: 'grey' }}>请输入描述</span>}
    </React.Fragment>
  )
}

const TextEditor: FunctionComponent<ContentPopoverProps> = ({
  noteAttr,
  onNoteAttrChange,
  popupState
}) => {
  const [value, setValue] = useState(noteAttr.value)
  const handleCommit = () => {
    onNoteAttrChange({ value })
    popupState.toggle()
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommit()
    }
  }
  return (
    <NoBorderInput
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      autoFocus={true}
      onKeyDown={handleKeyDown}
      onBlur={handleCommit}
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
