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
import TableOfContent from "@/app/Noxo/Note/TableOfContent";
import styled from "styled-components";

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


const hideToc = debounce(() => {
  const el = document.getElementById('toc')
  if (el) { el.style.transform = 'translateY(-100%)' }
}, 1500)
const handleScroll = () => {
  const el = document.getElementById('toc')
  if (el) { el.style.transform = 'translateY(0%)' }
  setTimeout(hideToc, 0)
}


const NoteEditor = (props: React.ComponentProps<any>) => {
  const noteId: string = props.match.params.id
  const {
    note,
    content: noteContent
  }: NoteState = useSelector(state => state.get('note'))

  const { content } = noteContent
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

  useEffect(() => {
    let toc = document.getElementById("toc");
    window.addEventListener('scroll', handleScroll, true);
    toc?.addEventListener('mouseover', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      toc?.removeEventListener('mouseover', handleScroll);
    }
  })

  return (
    <div className="oxo-editor">
      <Fade
        in={noteId === note._id}
        {...(noteId === note._id ? { timeout: 1000 } : {})}
      >
        <Box>
          <ToCWrapper id="toc">
            {"Table of Content"}
            <TableOfContent noteContent={noteContent} />
          </ToCWrapper>
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

const ToCWrapper = styled.div`
  padding: 10px;
  position: fixed;
  right: 20px;
  top: 0;
  background-color: rgba(200, 200, 200, 0.6);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 350px;
  opacity: 0.8;
  transition: transform 500ms ease;
  transform: translateY(-100%);
  box-shadow: 0px 3px 14px 2px rgba(0,0,0,0.12);
`

export default NoteEditor
