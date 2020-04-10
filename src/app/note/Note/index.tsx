import React, { useEffect, useState } from 'react'
import { Divider } from '@material-ui/core'
import AttributeBlock from './Attributes'
import action, {useSelector} from "@/store";
import NOTE_ACT from '@/store/note/action-declares'

import TitleBlock from "../components/Title";
import OxOEditor from "@/components/Editor";
import {NoteState} from "@/store/note/types";
import { PrismStyled } from "./PrismStyleEditor";

const NoteEditor = (props: React.ComponentProps<any>) => {
  const noteId = props.match.params.id

  const { curNote: { content }}: NoteState = useSelector(state => state.get('note'))

  useEffect(() => {
    action(NOTE_ACT.SAGA_READ_NOTE, noteId)
  }, [noteId])

  const handleContentChange = (value: any) => {
    action(NOTE_ACT.SAGA_UPDATE_NOTE, { content: value })
  }

  return (
    <div className="oxo-editor">
      <React.Fragment>
        <TitleBlock type="note"/>
        <AttributeBlock/>
        <Divider />
        <PrismStyled style={{ color: '#222222' }}>
          <OxOEditor value={content} onChange={handleContentChange} />
        </PrismStyled>
      </React.Fragment>
    </div>
  )
}

export default NoteEditor
