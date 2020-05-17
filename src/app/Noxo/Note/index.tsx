import React, { useEffect, useState } from 'react'
import { Box, Divider, Fade } from '@material-ui/core'
import AttributeBlock from './Attributes'
import sagaAction, { useSelector } from '@/store'
import * as NOTE_ACT from '@/store/note/actions'

import TitleBlock from '../components/Title'
import OxOEditor from '@/components/Editor'
import { NoteState } from '@/types/states'
import { PrismStyled } from './PrismStyleEditor'
import debounce from 'lodash/debounce'

const handleSaveContent = debounce(
  (value: any) => {
    sagaAction({ type: NOTE_ACT.SAGA_UPDATE_CONTENT, content: value })
  },
  1000,
  { maxWait: 5000 }
)

const handleSaveInfo = debounce((key: string, value: string) => {
  sagaAction({ type: NOTE_ACT.SAGA_UPDATE_INFO, payload: { [key]: value } })
}, 1000)

const NoteEditor = (props: React.ComponentProps<any>) => {
  const noteId: string = props.match.params.id
  const {
    note,
    content: { content }
  }: NoteState = useSelector(state => state.get('note'))

  const [value, setValue] = useState(content)

  const handleContentChange = (value: any) => {
    setValue(value)
    handleSaveContent(value)
  }

  useEffect(() => {
    sagaAction({ type: NOTE_ACT.SAGA_READ_NOTE, noteId })
  }, [noteId])

  useEffect(() => {
    setValue(content)
  }, [setValue, content])

  return (
    <div className="oxo-editor">
      <Fade
        in={noteId === note._id}
        {...(noteId === note._id ? { timeout: 1000 } : {})}
      >
        <Box>
          <TitleBlock
            title={note.title}
            titleIcon={note.titleIcon}
            onChange={handleSaveInfo}
          />
          <AttributeBlock />
          <Divider />
          <PrismStyled style={{ color: '#222222' }}>
            <OxOEditor value={value} onChange={handleContentChange} />
          </PrismStyled>
        </Box>
      </Fade>
    </div>
  )
}

export default NoteEditor
