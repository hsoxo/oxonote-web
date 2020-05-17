import React, { useContext } from 'react'
import { JournalContext } from '@/app/Noxo/Journal'
import { JournalState } from '@/types/states'
import sagaAction, { useSelector } from '@/store'
import { JournalAttribute, JournalView } from '@/types/journal'
import Column from '@/app/Noxo/Journal/Kanban/Column'
import styled from 'styled-components'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { reorder } from '@/app/Noxo/Note/Attributes/utils/dnd-helper'
import { SAGA_UPDATE_ATTRIBUTE_VALUE } from '@/store/note/actions'
import { SAGA_UPDATE_ATTR_RANGE } from '@/store/journal/actions'
import { SINGLE_SELECT } from '@/types/constants/note-attributes'

const JournalKanbanView = () => {
  const context = useContext(JournalContext)
  const { viewId } = context
  const { views, attrs: jourAttrs, notes }: JournalState = useSelector(state =>
    state.get('journal')
  )

  const curView = views.find(x => x._id === viewId) as JournalView
  const curAttr = jourAttrs.find(
    x => x._id === curView.kanbanAttrId
  ) as JournalAttribute

  const uncategorized = notes.filter(x => {
    const na = x.attributes.find(y => y.attrId === curAttr._id)
    if (!na) return true
    if (!na.value) return true
    return false
  })

  const columnData =
    curAttr.range?.map(x => ({
      ...x,
      notes: notes.filter(
        n => n.attributes.find(y => y.attrId === curAttr._id)?.value === x.id
      )
    })) || []

  const handleDragEnd = (result: DropResult) => {
    const { type, draggableId, source, destination } = result
    console.log(result)
    if (!destination) return
    if (type === 'COLUMN') {
      if (source.index === -1) {
        return
      }
      if (Array.isArray(curAttr.range)) {
        const reordered = reorder(
          curAttr.range,
          source.index,
          destination.index
        )
        sagaAction({
          type: SAGA_UPDATE_ATTR_RANGE,
          attrId: curAttr._id,
          newRange: reordered
        })
      }
    } else if (type === 'NOTE') {
      if (curAttr.type === SINGLE_SELECT) {
        sagaAction({
          type: SAGA_UPDATE_ATTRIBUTE_VALUE,
          noteId: draggableId,
          attrId: curAttr._id,
          newValue: destination.droppableId
        })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        // ignoreContainerClipping={Boolean(containerHeight)}
        // isCombineEnabled={this.props.isCombineEnabled}
      >
        {(provided, snapshot) => (
          <KanbanWrapper ref={provided.innerRef} {...provided.droppableProps}>
            {uncategorized.length > 0 && (
              <Column
                id="0"
                label="未分类"
                color="#dddddd"
                notes={uncategorized}
                index={-1}
              />
            )}
            {columnData.map((x, index) => (
              <Column key={x.label} {...x} index={index} />
            ))}
            {provided.placeholder}
          </KanbanWrapper>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const KanbanWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  user-select: none;
  width: 100%;
  overflow-x: scroll;
`

export default JournalKanbanView
