import {Editor, Transforms, Point, Range, Text} from "slate";
import { BlockSetting } from "../../blocks";
import BlockTypes from '../../constants/block'

const MarkdownPlugin = (editor: Editor) => {
  const { deleteBackward, insertText, insertNode } = editor

  editor.insertText = text => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      let matchedBlockName = null

      for (const [key, value] of Object.entries(BlockSetting)) {
        if (value.pattern && value.pattern.test(beforeText)){
          matchedBlockName = key
          break
        }
      }

      if (matchedBlockName) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        Transforms.setNodes(
          editor,
          { type: matchedBlockName },
          { match: n => Editor.isBlock(editor, n) }
        )

        if (matchedBlockName === 'list-item') {
          const list = { type: 'bulleted-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'bulleted-list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
    editor.insertBreak = () => {
      const { selection } = editor
      if (selection && Range.isCollapsed(selection)) {
        const {anchor} = selection
        const block = Editor.above(editor, {
          match: n => Editor.isBlock(editor, n),
        })
        const path = block ? block[1] : []
        const end = Editor.end(editor, path)
        const range = {anchor, focus: end}
        const afterText = Editor.string(editor, range)
        if (afterText) {
          Transforms.splitNodes(editor, {
            always: true
          });
        } else {
          Transforms.insertNodes(editor, {
            type: BlockTypes.PARAGRAPH,
            children:[{ text : ""}]
          })
        }
      }
    }
  }
  return editor
}

export default MarkdownPlugin