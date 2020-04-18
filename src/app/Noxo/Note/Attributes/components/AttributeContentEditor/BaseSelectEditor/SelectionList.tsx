import React, { FunctionComponent } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import {
  getItemStyle,
  getListStyle
} from '@/app/Noxo/Note/Attributes/utils/dnd-helper'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import { AttributeRangeType } from '@/types/journal'
import { HoverBox, NoHoverButton, ClickableChip } from '../../UI'
import SelectionRow from "@/app/Noxo/Note/Attributes/components/AttributeContentEditor/BaseSelectEditor/SelectionRow";

interface SelectionListProps {
  listedItems: Array<AttributeRangeType>
  handleReorder: (result: DropResult) => void
  handleSelectionClick: (selectionId: string) => void
  handleSelectionColorChange: (selectionId: string, color: string) => void
  handleDelete: (selectionId: string) => void
}

const SelectionList: FunctionComponent<SelectionListProps> = ({
  listedItems,
  handleReorder,
  handleSelectionClick,
  handleSelectionColorChange,
  handleDelete
}) => {
  return (
    <DragDropContext onDragEnd={handleReorder}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {listedItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <HoverBox>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <SelectionRow
                        {...{
                          ...item,
                          handleSelectionClick,
                          handleSelectionColorChange,
                          handleDelete,
                        }}
                      />
                    </div>
                  </HoverBox>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SelectionList
