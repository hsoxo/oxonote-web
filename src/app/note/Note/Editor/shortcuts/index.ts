// @ts-nocheck
import {Editor, Text, Transforms} from "slate";

const handleKeyDown = (editor) => {
  return (event) => {
    if (event.shiftKey) {
      switch (event.key) {
        case 'Enter': {
          event.preventDefault()
          Transforms.insertText(
            editor,
            '\n')
          break
        }
        default: {
          return
        }
      }
    }

    if (event.ctrlKey) {
      switch (event.key) {
        // When "`" is pressed, keep our existing code block logic.
        case '`': {
          event.preventDefault()
          const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
          })
          Transforms.setNodes(
            editor,
            {type: match ? 'paragraph' : 'code'},
            {match: n => Editor.isBlock(editor, n)}
          )
          break
        }

        // When "B" is pressed, bold the text in the selection.
        case 'b': {
          event.preventDefault()
          Transforms.setNodes(
            editor,
            {bold: true},
            // Apply it to text nodes, and split the text node up if the
            // selection is overlapping only part of it.
            {match: n => Text.isText(n), split: true}
          )
          break
        }

        default: {
          return
        }
      }
    }
  }
}

export default handleKeyDown
