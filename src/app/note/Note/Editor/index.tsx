// @ts-nocheck

import React, { useEffect, useMemo, useState, useCallback } from "react";

// Import the Slate Editor factory.
import { createEditor,Transforms,Editor,Text } from 'slate'
import { Map } from 'immutable';

import { Slate, Editable, withReact,  } from 'slate-react'
import withShortcuts from "./plugins/markdown-shortcuts";
import { ElementWrapper, Leaf } from "./elements";
// import handleKeyDown from './shortcuts'
import OxOEditorContext from './utils/context';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  seed: 'edd'
});

interface OxOEditorProps {
  value: any
  onChange: (value: any) => void
  [string]?: any
}

const OxOEditor = ({value, onChange}: OxOEditorProps) => {
  const editor = useMemo(() => {
    return withShortcuts(withReact(createEditor()))
  }, [])

  // Add the initial value when setting up our state.
  const renderElement = useCallback(props => ElementWrapper(props), [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const slateProps = {
    editor,
    value,
    onChange,
  }

  const editableProps = {
    // onKeyDown: handleKeyDown(editor),
    renderElement,
    renderLeaf
  }

  return (
    // <OxOEditorContext.Provider>
      <StylesProvider generateClassName={generateClassName}>
        <Slate className="oxo-editor" {...slateProps}>
          <Editable {...editableProps} />
        </Slate>
      </StylesProvider>
    // </OxOEditorContext.Provider>
  )
}


export default OxOEditor
