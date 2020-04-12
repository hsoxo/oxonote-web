import React, { useMemo, useCallback } from "react";

import {createEditor, Editor, Element as SlateElement, Range, Transforms, Text} from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import MarkdownPlugin from "./plugins/Markdown";

import withPlugins from "./utils/withPlugins";
import Element from "./blocks";
import handleKeyDown from "./handlers/OnKeyDown";
import HoveringToolbar from "./toolbar/HoverToolbar";
import Leaf from "./blocks/Leaf";
import * as NAMES from "./constants/names";
import PathSelect from "./utils/pathSelect";
import Prism from 'prismjs'
import './utils/prism'
// import 'katex/dist/katex.min.css';
import {withHistory} from "slate-history";

interface OxOEditorProps {
  value: any
  onChange: (value: any) => void
}

const plugins = [
  MarkdownPlugin,
]

const OxOEditor = ({value, onChange}: OxOEditorProps) => {
  const editor = useMemo(() => withHistory(withPlugins(withReact(createEditor()), plugins)), [])
  const { insertBreak, insertText } = editor
  const decorate = useCallback(([node, path]) => {
    const ranges: Array<any> = []
    // @ts-ignore
    if (!Text.isText(node)) {
      return ranges
    }
    const parentNode = Editor.node(editor, path.slice(0, -1))[0] as unknown as SlateElement
    if (parentNode.type === NAMES.CODE) {
      const grammar = Prism.languages[parentNode.lang || 'javascript'];
      if (!grammar) {
        return ranges
      }
      const getLength = (token: any) => {
        if (typeof token === 'string') {
          return token.length
        } else if (typeof token.content === 'string') {
          return token.content.length
        } else {
          return token.content.reduce((l: number, t: number) => l + getLength(t), 0)
        }
      }
      const tokens = Prism.tokenize(node.text, grammar)
      let start = 0
      for (const token of tokens) {
        const length = getLength(token)
        const end = start + length

        if (typeof token !== 'string') {
          ranges.push({
            [token.type]: true,
            anchor: {path, offset: start},
            focus: {path, offset: end},
          })
        }
        start = end
      }
      return ranges
    }
    return ranges
  }, [])



  editor.insertBreak = () => {
    const { selection } = editor
    const curBlock = Editor.above(editor, {
      match: n => Editor.isBlock(editor, n),
    })

    if (selection && Range.isCollapsed(selection) && curBlock) {
      const { anchor } = selection
      const [curBlockInfo, curBlockPath] = curBlock

      const curBlockStart = Editor.start(editor, curBlockPath)
      const rangeStartFromBlock = { anchor, focus: curBlockStart }
      const forwardTextInBlock = Editor.string(editor, rangeStartFromBlock)

      const curBlockEnd = Editor.end(editor, curBlockPath)
      const rangeEndToBlock = {anchor, focus: curBlockEnd}
      const afterwardTextInBlock = Editor.string(editor, rangeEndToBlock)

      const curLeafStart = PathSelect.setOffset(anchor, 0)
      const rangeStartFromLeaf = { anchor, focus: curLeafStart }
      const forwardTextInLeaf = Editor.string(editor, rangeStartFromLeaf)

      let parentAnchor = JSON.parse(JSON.stringify(anchor))
      parentAnchor.path = parentAnchor.path.slice(0, -1)
      const parentBlock = Editor.node(editor, parentAnchor)[0] as unknown as SlateElement

      let listParentAnchor
      let listParentBlock
      if (anchor.path.length > 2) {
        listParentAnchor = JSON.parse(JSON.stringify(anchor))
        listParentAnchor.path = listParentAnchor.path.slice(0, -2)
        listParentBlock = Editor.node(editor, listParentAnchor)[0] as unknown as SlateElement
      }

      if (afterwardTextInBlock) {
        if (parentBlock.type === NAMES.BLOCKQUOTE || parentBlock.type === NAMES.CODE) {
          insertText('\n')
        } else {
          Transforms.splitNodes(editor, {
            always: true
          })
        }
      } else if (listParentAnchor && listParentBlock) {
        /**
         * Handle list
         */
        const { children: siblings, type: parentType } = listParentBlock
        if (anchor.path.slice(-2)[0] === siblings.length - 1 && forwardTextInBlock + afterwardTextInBlock === '') {
          if (siblings.length === 1) {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === curBlockInfo.type,
            })
            Transforms.unwrapNodes(editor, {
              match: n => n.type === parentType,
            })
          } else {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === curBlockInfo.type,
            })
          }
          Transforms.insertNodes(editor, {
            children:[{ text : ""}],
            type: NAMES.PARAGRAPH
          }, {
            match: n => n.type === parentType,
          })
        } else {
          Transforms.insertNodes(editor, {
            children:[{ text : ""}],
            type: curBlockInfo.type === NAMES.LIST_ITEM ? NAMES.LIST_ITEM : NAMES.PARAGRAPH
          })
        }
      } else {
        /**
         * Handle quote / code block end
         */
        if (parentBlock.type === NAMES.BLOCKQUOTE || parentBlock.type === NAMES.CODE) {
          if ((forwardTextInBlock + afterwardTextInBlock).endsWith('\n')) {
            Transforms.delete(editor, {
              unit: 'character',
              reverse: true
            })
            Transforms.insertNodes(editor, {
              children: [{text: ""}],
              type: NAMES.PARAGRAPH
            })
          } else if ((forwardTextInBlock + afterwardTextInBlock === '')) {
            Transforms.setNodes(editor, { type: NAMES.PARAGRAPH })
          } else {
            insertText('\n')
          }
        } else {
          Transforms.insertNodes(editor, {
            children:[{ text : ""}],
            type: NAMES.PARAGRAPH
          })
        }
      }
    }
  }
  console.log(JSON.stringify(value, null, 2))

  const renderElement = useCallback(props => <Element editor={editor} {...props}/>, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const slateProps = {
    editor,
    value,
    onChange,
  }
  const editableProps = {
    onKeyDown: handleKeyDown(editor),
    renderElement,
    renderLeaf,
    decorate,
  }

  return (
    // @ts-ignore
    <Slate className="oxo-editor" {...slateProps}>
      <HoveringToolbar/>
      <Editable suppressContentEditableWarning={true} {...editableProps} />
    </Slate>
  )
}


export default OxOEditor
