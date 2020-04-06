import React, { useMemo, useCallback } from "react";

import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import MarkdownPlugin from "./plugins/Markdown";

import withPlugins from "./utils/withPlugins";
import Element from "./blocks";

import handleKeyDown from "./handlers/OnKeyDown";
import {PrismStyled} from "@/app/note/Note/PrismStyleEditor";


interface OxOEditorProps {
  value: any
  onChange: (value: any) => void
}

const plugins = [
  MarkdownPlugin,
]

const OxOEditor = ({value, onChange}: OxOEditorProps) => {
  const editor = useMemo(() => withPlugins(withReact(createEditor()), plugins), [])

  const renderElement = useCallback(props => <Element editor={editor} {...props} />, [])
  
  const slateProps = {
    editor,
    value,
    onChange,
  }
  const editableProps = {
    onKeyDown: handleKeyDown(editor),
    renderElement,
    // renderLeaf
  }

  return (
    // @ts-ignore
    <Slate className="oxo-editor" {...slateProps}>
      <Editable suppressContentEditableWarning={true} {...editableProps} />
    </Slate>
  )
}


export default OxOEditor
