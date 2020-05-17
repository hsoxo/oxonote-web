import React from 'react'
import ReactDOM from 'react-dom'
import { AttributeRangeType } from '@/types/journal'
import styled from 'styled-components'
import { NoteObject } from '@/types/note'
import { Box, Button, Chip } from '@material-ui/core'
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot
} from 'react-beautiful-dnd'
import NoteList from '@/app/Noxo/Journal/Kanban/NoteList'
import portal from './Portal'

const Column: React.FC<
  AttributeRangeType & { notes: Array<NoteObject>; index: number }
> = x => {
  return (
    <Draggable draggableId={x.label} index={x.index}>
      {(provided, snapshot) => (
        <PortalWrapper provided={provided} snapshot={snapshot} {...x} />
      )}
    </Draggable>
  )
}

const PortalWrapper: React.FC<
  AttributeRangeType & {
    provided: DraggableProvided
    snapshot: DraggableStateSnapshot
    notes: Array<NoteObject>
    index: number
  }
> = p => {
  const child = (
    <ColumnWrapper
      ref={p.provided.innerRef}
      {...p.provided.draggableProps}
      isDragging={p.snapshot.isDragging}
    >
      <LabelWrapper {...p.provided.dragHandleProps}>
        <Chip
          key={p.id}
          style={{ backgroundColor: p.color }}
          size="small"
          label={p.label}
        />
        <Box marginLeft={1}>{p.notes.length}</Box>
      </LabelWrapper>
      <NoteList label={p.label} notes={p.notes} />
      <StyledButton id="create">创建</StyledButton>
    </ColumnWrapper>
  )
  const usePortal: boolean = p.snapshot.isDragging

  if (!usePortal) {
    return child
  }

  // if dragging - put the item in a portal
  return ReactDOM.createPortal(child, portal)
}

const ColumnWrapper = styled.div<{ isDragging: boolean }>`
  min-width: 270px;
  max-width: 270px;
  border-radius: 6px;
  margin: 10px 5px;
  display: flex;
  flex-direction: column;
  &:hover > #create {
    opacity: 1;
  }
  ${p => (p.isDragging ? `background-color: var(--secondary-bg-hover);` : '')}
`
const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  max-width: calc(100% - 45px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 2rem;
  padding: 0.5rem;
`
const StyledButton = styled(Button)`
  margin: 10px 5px;
  justify-content: left;
  opacity: 0;
  transition: opacity ease 400ms;
`

export default Column
