import {KeyboardEvent, MouseEvent} from 'react'
import {Editor} from "slate";
import * as NAMES from '../constants/names'

const defaultMarker = {
  [NAMES.INLINE_BOLD]: '**',
  [NAMES.INLINE_ITALIC]: '*',
  [NAMES.INLINE_CODE]: '`',
}

declare type Marker = typeof NAMES.INLINE_BOLD | typeof NAMES.INLINE_ITALIC | typeof NAMES.INLINE_CODE

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const toggleFormat = (e: KeyboardEvent | MouseEvent, editor: Editor, marker: Marker) => {
  e.preventDefault()
  const isActive = isMarkActive(editor, marker)
  if (isActive) {
    Editor.removeMark(editor, marker)
    Editor.removeMark(editor, 'marker')
  } else {
    Editor.addMark(editor, marker, true)
    Editor.addMark(editor, 'marker', defaultMarker[marker])
  }
}