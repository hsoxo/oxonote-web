import React, { useEffect, Fragment } from 'react'
import {Box, CircularProgress, Divider, FormControlLabel, Fade, Paper, Switch} from '@material-ui/core'
import AttributeBlock from './Attributes'
import action, {useSelector} from "@/store";
import NOTE_ACT from '@/store/note/actions'

import TitleBlock from "../components/Title";
import OxOEditor from "@/components/Editor";
import {NoteState} from "@/types/states";
import { PrismStyled } from "./PrismStyleEditor";

const handleContentChange = (value: any) => {
  action(NOTE_ACT.SAGA_UPDATE_CONTENT, { content: value })
}

const handleAttributeChange = (payload: any) => {
  action(NOTE_ACT.SAGA_UPDATE_NOTE_ATTRIBUTE, payload)
}

const handleInfoChange = (key: string, value: string) => {
  action(NOTE_ACT.SAGA_UPDATE_NOTE_INFO, { [key]: value })
}

const NoteEditor = (props: React.ComponentProps<any>) => {
  const noteId = props.match.params.id
  const { note, content: { content } }: NoteState = useSelector(state => state.get('note'))

  useEffect(() => {
    action(NOTE_ACT.SAGA_READ_NOTE, noteId)
  }, [noteId])

  return (
    <div className="oxo-editor">
      <Fade
        in={noteId===note._id}
        {...(noteId===note._id ? { timeout: 1000 } : {})}>
        <Box>
          <TitleBlock
            title={note.title}
            titleIcon={note.titleIcon}
            onChange={handleInfoChange}
          />
          <AttributeBlock/>
          <Divider/>
          <PrismStyled style={{color: '#222222'}}>
            <OxOEditor value={content} onChange={handleContentChange}/>
          </PrismStyled>
        </Box>
      </Fade>
    </div>
  )
}

export default NoteEditor
