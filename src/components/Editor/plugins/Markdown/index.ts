import {Editor, Element, Point, Range, Transforms} from "slate";
import * as P_BLOCK from '../../constants/md-block-pattern'
import * as P_INLINE from '../../constants/md-inline-pattern'
import * as NAMES from '../../constants/names'

import PathSelect from "../../utils/pathSelect";
import {langList} from "../../utils/prism";

const insertLeafWithMark = (editor: Editor, text: string, markName: string, marker: string, additional: Array<Array<string>> = []) => {
  Editor.addMark(editor, markName, true)
  Editor.addMark(editor, 'marker', marker)
  for (const [mName, mValue] of additional) {
    Editor.addMark(editor, mName, mValue)
  }
  editor.originalInsertText(text)
  Editor.removeMark(editor, markName)
  Editor.removeMark(editor, 'marker')
  for (const [mName, mValue] of additional) {
    Editor.removeMark(editor, mName)
  }
}

function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array))
      return l;
  }
  return -1;
}

const ListTypes = [NAMES.BULLET_LIST, NAMES.ORDERED_LIST]

const MarkdownPlugin = (editor: Editor) => {
  const { deleteBackward, insertText, insertNode, insertBreak, isInline } = editor
  editor.originalInsertText = insertText

  editor.isInline = element => {
    return element.type === NAMES.INLINE_LINK ? true : isInline(element)
  }

  editor.insertText = text => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection

      const curBlock = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      const curBlockPath = curBlock ? curBlock[1] : []
      const curBlockStart = Editor.start(editor, curBlockPath)
      const rangeStartFromBlock = { anchor, focus: curBlockStart }
      const forwardTextInBlock = Editor.string(editor, rangeStartFromBlock)

      const curLeafStart = PathSelect.setOffset(anchor, 0)
      const rangeStartFromLeaf = { anchor, focus: curLeafStart }
      const forwardTextInLeaf = Editor.string(editor, rangeStartFromLeaf)

      if (anchor.path.length === 2 && anchor.path[1] === 0) {
        /**
         * Block Pattern Check
         */
        let matchRes: any
        let matchName
        if (!!(matchRes = forwardTextInBlock.match(P_BLOCK.HEADER))) {
          switch (matchRes[0].length) {
            case 1: { matchName = NAMES.H1; break }
            case 2: { matchName = NAMES.H2; break }
            case 3: { matchName = NAMES.H3; break }
            case 4: { matchName = NAMES.H4; break }
            case 5: { matchName = NAMES.H5; break }
            case 6: { matchName = NAMES.H6; break }
          }
        } else if (!!(matchRes = forwardTextInBlock.match(P_BLOCK.BLOCKQUOTE))) {
          matchName = NAMES.BLOCKQUOTE
        } else if (!!(matchRes = forwardTextInBlock.match(P_BLOCK.CODE))) {
          matchName = NAMES.CODE
        } else if (!!(matchRes = forwardTextInBlock.match(P_BLOCK.CODE_ALT))) {
          matchName = NAMES.CODE
        } else if (!!(matchRes = forwardTextInBlock.match(P_BLOCK.BLOCKQUOTE))) {
          matchName = NAMES.BLOCKQUOTE
        } else if (!!(matchRes = forwardTextInBlock.match(P_BLOCK.HR))) {
          matchName = NAMES.HR
        } else if (!!(matchRes = forwardTextInBlock.match(P_BLOCK.BULLET_LIST))) {
          matchName = NAMES.BULLET_LIST
        } else if (!!(matchRes = forwardTextInBlock.match(P_BLOCK.ORDERED_LIST))) {
          matchName = NAMES.ORDERED_LIST
        }

        if (matchName) {
          Transforms.select(editor, rangeStartFromBlock)
          Transforms.delete(editor)
          if (ListTypes.includes(matchName)) {
            Transforms.setNodes(editor, {type: NAMES.LIST_ITEM}, { match: n => Editor.isBlock(editor, n) })
            const list = {type: matchName, children: []}
            Transforms.wrapNodes(editor, list, { match: n => n.type === NAMES.LIST_ITEM })
          } else if (matchName === NAMES.CODE && matchRes) {
            let matchLang = ''
            if (matchRes[1]) {
              const tmp = langList.filter(x => x[1] === matchRes[1].toLowerCase())
              matchLang = tmp.length ? tmp[0][1] : ''
            }
            Transforms.setNodes(editor, { type: matchName, lang: matchLang }, { match: n => Editor.isBlock(editor, n) }
            )
          } else {
            Transforms.setNodes(editor, { type: matchName }, { match: n => Editor.isBlock(editor, n) })
          }

          return
        }
      }

      // just want a closure
      if (true) {
        /**
         * Inline Pattern Check
         */
        let matchRes
        let matchName
        if (!!(matchRes = forwardTextInLeaf.match(P_INLINE.INLINE_CODE))) {
          matchName = NAMES.INLINE_CODE
        // } else if (!!(matchRes = forwardTextInLeaf.match(P_INLINE.INLINE_BOLD_ITALIC))) {
        //   matchName = NAMES.INLINE_BOLD_ITALIC
        } else if (!!(matchRes = forwardTextInLeaf.match(P_INLINE.INLINE_BOLD))) {
          matchName = NAMES.INLINE_BOLD
        } else if (!!(matchRes = forwardTextInLeaf.match(P_INLINE.INLINE_ITALIC))) {
          matchName = NAMES.INLINE_ITALIC
        } else if (!!(matchRes = forwardTextInLeaf.match(P_INLINE.INLINE_IMAGE))) {
          matchName = NAMES.IMAGE
        } else if (!!(matchRes = forwardTextInLeaf.match(P_INLINE.INLINE_LINK))) {
          matchName = NAMES.INLINE_LINK
        }

        if (matchName && matchRes) {
          const [matchText, marker, innerText, ...args] = matchRes
          const matchStart = matchRes.index as number
          const inlinePatternStart = PathSelect.setOffset(anchor, matchStart)
          // const inlineInnerTextStart = PathSelect.setOffset(anchor, matchStart + marker.length)
          // const inlineInnerTextEnd = PathSelect.setOffset(anchor, matchStart + marker.length + innerText.length)
          const inlinePatternEnd = PathSelect.setOffset(anchor, matchStart + matchText.length)
          Transforms.delete(editor, {
            at: inlinePatternStart,
            distance: inlinePatternEnd.offset - inlinePatternStart.offset
          })
          if (matchName === NAMES.IMAGE) {
            Transforms.splitNodes(editor, { always: true })
            Transforms.insertNodes(editor, {
              type: NAMES.IMAGE,
              src: innerText,
              children: [{ text: '' }],
            })
            return;
          } else if (matchName === NAMES.INLINE_LINK) {
            const link = {
              type: NAMES.INLINE_LINK,
              href: innerText,
              children: [{ text: marker }],
            }
            Transforms.insertNodes(editor, link)
            // insertLeafWithMark(editor, marker, matchName, '[l](a)', [['href', innerText]])
            insertText(' ')
            return;
          } else {
            insertLeafWithMark(editor, innerText, matchName, marker)
            return;
          }
        }
      }

    }
    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection, insertText } = editor

    if (selection && Range.isCollapsed(selection)) {
      const curBlock = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      if (curBlock) {
        const { anchor } = selection
        const [curBlockInfo, curBlockPath] = curBlock

        const curBlockStart = Editor.start(editor, curBlockPath)
        const rangeStartFromBlock = { anchor, focus: curBlockStart }
        const forwardTextInBlock = Editor.string(editor, rangeStartFromBlock)

        const curLeafStart = PathSelect.setOffset(anchor, 0)
        const rangeStartFromLeaf = { anchor, focus: curLeafStart }
        const forwardTextInLeaf = Editor.string(editor, rangeStartFromLeaf)

        /**
         * Block Pattern Reverse
         */
        if (
          curBlockInfo.type !== NAMES.PARAGRAPH &&
          Point.equals(anchor, curBlockStart)
        ) {
          if (curBlockInfo.type === NAMES.LIST_ITEM) {
            Transforms.unwrapNodes(editor, { match: n => n.type === NAMES.LIST_ITEM })
            if (anchor.path.slice(-2)[0] === 0) {
              Transforms.unwrapNodes(editor, { match: n => n.type === NAMES.LIST_ITEM })
              Transforms.setNodes(editor, { type: NAMES.PARAGRAPH })
            }
          } else {
            Transforms.setNodes(editor, { type: NAMES.PARAGRAPH })
          }
          return
        }

        /**
         * Inline Pattern Check
         */
        const forwardLeafs = curBlockInfo.children.slice(0, anchor.path.slice(-1)[0] + 1)
        if (curBlockInfo.children.slice(-1)[0]['marker']) {
          if (forwardLeafs.slice(-1)[0]['marker']) {
            let marker = forwardLeafs.slice(-1)[0]['marker']
            let inlinePatternStart = JSON.parse(JSON.stringify(anchor)) as Point
            inlinePatternStart.offset = 0
            const formattedLeaf = forwardLeafs.slice(-1)[0]
            Transforms.delete(editor, {
              at: inlinePatternStart,
              distance: formattedLeaf.text.length
            })
            // @ts-ignore
            Object.keys(Editor.marks(editor)).map(x => Editor.removeMark(editor, x))
            insertText(marker + formattedLeaf.text + marker)
            return;
          }
        } else if (curBlockInfo.children.slice(-1)[0].text === ' ' || curBlockInfo.children.slice(-1)[0].text === '') {
          if (curBlockInfo.children.length > 1 && curBlockInfo.children.slice(-2)[0].type === NAMES.INLINE_LINK) {
            const forwardPath = JSON.parse(JSON.stringify(anchor.path))
            forwardPath[forwardPath.length - 1] = forwardPath[forwardPath.length - 1] - 1
            if (forwardPath.every((x: number) => x>= 0)) {
              const forwardNode = Editor.node(editor, forwardPath)[0] as unknown as Element
              Transforms.delete(editor, { at: forwardPath })
              insertText(`[${forwardNode.children[0].text}](${forwardNode.href})`)
              return;
            }
          }
        }
      }
      deleteBackward(...args)
    }

  }
  return editor
}

export default MarkdownPlugin