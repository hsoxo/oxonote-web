import React, { useEffect, useState } from 'react'
import { Divider } from '@material-ui/core'
import AttributeBlock from './Attributes'
import action from "@/store";
import NOTE_ACT from '@/store/note/action-declares'

import TitleBlock from "../components/Title";

const NoteEditor = (props: React.ComponentProps<any>) => {
  const noteId = props.match.params.id

  useEffect(() => {
    action(NOTE_ACT.SAGA_READ_NOTE, noteId)
  }, [noteId])

  return (
    <div className="oxo-editor">
      <React.Fragment>
        <TitleBlock type="note"/>
        <AttributeBlock/>
        <Divider />
        <div>
        </div>
      </React.Fragment>
    </div>
  )
}

export default NoteEditor
