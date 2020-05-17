// @ts-nocheck
import { Transforms } from 'slate'
import * as NAMES from '../../constants/names'
import { toggleFormat } from '../../utils/toggleFormat'

const handleKeyDown = editor => {
  return event => {
    // soft line break
    if (event.shiftKey) {
      switch (event.key) {
        case 'Enter': {
          event.preventDefault()
          Transforms.insertText(editor, '\n')
          break
        }
        default: {
          return
        }
      }
    }

    // keyboard handlers
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '`': {
          toggleFormat(event, editor, NAMES.INLINE_CODE)
          break
        }
        case 'b': {
          toggleFormat(event, editor, NAMES.INLINE_BOLD)
          break
        }
        case 'i': {
          toggleFormat(event, editor, NAMES.INLINE_ITALIC)
          break
        }
        default: {
          return
        }
      }
    }

    if (event.key === '13') {
    }
  }
}

export default handleKeyDown
