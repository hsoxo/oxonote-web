import React from 'react'
import { Box, Button } from '@material-ui/core'
import { NoteObject } from '@/types/note'
import styled from 'styled-components'

const NoteCard: React.FC<{ note: NoteObject }> = ({ note: noteInfo }) => {
  return (
    <StyledPaper>
      <TitleWrapper id="title">
        <Box marginRight={'auto'}>
          {noteInfo.titleIcon || '📄'} {noteInfo.title || '未命名笔记'}
        </Box>
        <Action id="action">
          <Button>123</Button>
        </Action>
      </TitleWrapper>
    </StyledPaper>
  )
}

const StyledPaper = styled.div`
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 2px 4px;
  border-radius: 3px;
  margin: 5px;
  &:hover {
    background-color: var(--secondary-bg-hover);
  }
  &:hover > #title > #action {
    opacity: 1;
  }
`
const TitleWrapper = styled.div`
  margin: 0.5rem;
  display: flex;
  align-items: center;
`
const Action = styled.div`
  opacity: 0;
  transition: opacity ease 400ms;
`

export default NoteCard
