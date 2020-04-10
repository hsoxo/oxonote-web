// @ts-nocheck
import React, {useContext, useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'
import {useSlate, ReactEditor} from "slate-react";
import {Editor, Transforms, Range} from "slate";
import styled from "styled-components";
import {Paper, IconButton} from "@material-ui/core";
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import CodeIcon from '@material-ui/icons/Code';
import * as NAMES from '../constants/names'
import { toggleFormat } from "../utils/toggleFormat";


export const _Menu = React.forwardRef(({ className, ...props }: any, ref) => {
  const editor = useSlate()
  return   (
    <div
      {...props}
      ref={ref}
    >
      <Paper>
        <IconButton size="small" onClick={e => toggleFormat(e, editor, NAMES.INLINE_BOLD)}>
          <FormatBoldIcon/>
        </IconButton>
        <IconButton size="small" onClick={e => toggleFormat(e, editor, NAMES.INLINE_ITALIC)}>
          <FormatItalicIcon/>
        </IconButton>
        <IconButton size="small" onClick={e => toggleFormat(e, editor, NAMES.INLINE_CODE)}>
          <CodeIcon/>
        </IconButton>
      </Paper>
    </div>)
})

const Menu = styled(_Menu)`
position: absolute;
display: none;
& > * {
  display: inline-block;
}
& > * + * {
  margin-left: 15px;
}
`

export const Portal = ({ children }: any) => {
  return ReactDOM.createPortal(children, document.body)
}


const HoveringToolbar = () => {
  const ref = useRef()
  const editor = useSlate()
  const [state, setState] = useState([])

  useEffect(() => {
    const el = ref.current
    const { selection } = editor
    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection() as Selection
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.display = 'block'
    el.style.opacity = 1
    el.style.zIndex = 2147483647
    el.style.position = 'absolute'
    el.style.top = `${rect.top - rect.height - 20}px`
    el.style.left = `${rect.left}px`
  })

  return (
    <Portal>
        <Menu ref={ref}/>
    </Portal>
  )
}

export default HoveringToolbar