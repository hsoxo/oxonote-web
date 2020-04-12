import React, { useState } from 'react'
import { ContentPopoverProps } from '@/app/Noxo/Note/Attributes/Element/Base'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import {
  getItemStyle,
  getListStyle,
  reorder
} from '@/app/Noxo/Note/Attributes/Element/dnd-helper'
import { AttributeRangeType } from '@/types/journal'
import { tagColorList } from '@/types/constants/colors'
import { v4 as uuid } from 'uuid'
import { Box, Button, Chip, Divider, TextField } from '@material-ui/core'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import {NoBorderInput} from "@/components/OxOUI/Input";
import { FlexCenteredBox } from "@/components/OxOUI/OxOBox";
import styled from "styled-components";
import { MarginRightChip } from "@/components/OxOUI/Chip";

interface SelectTypeContentPopoverProps extends ContentPopoverProps {
  isMulti: boolean
}

const InfileFlexCenteredBox = styled(FlexCenteredBox)`
  background-color: var(--secondary-bg);
  padding: 0 0.3rem;
`

const HoverBox = styled.div`
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`

const NoHoverButton = styled(Button)`
  display: block;
  text-align: left;
  &:hover {
    background-color: unset;
  }
`

const ClickableChip = styled(Chip)`
  &:hover {
    cursor: pointer;
  }
`


const BaseSelectEditor: React.FunctionComponent<SelectTypeContentPopoverProps> = ({
  isMulti,
  noteAttr,
  jourAttr,
  onNoteAttrChange,
  onJourAttrChange,
  onBothAttrChange,
  popupState
}) => {
  const [value, setValue] = useState('')

  let range = jourAttr.range || []

  const curSelections = isMulti
    // @ts-ignore
    ? range.filter(x => noteAttr.value.includes(x.id))
    : range.filter(x => x.id === noteAttr.value)

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const newRange = reorder(
      range,
      result.source.index,
      result.destination.index
    )
    onJourAttrChange({ range: newRange })
  }

  const onChange = (selectionId: string) => {
    if (isMulti) {
      // @ts-ignore
      const newValue = noteAttr.value.slice()
      newValue.push(selectionId)
      onNoteAttrChange({ value: newValue })
    } else {
      onNoteAttrChange({ value: selectionId })
    }
    popupState.toggle()
  }

  const handleSubmit = (label: string) => {
    if (!label) {
      return
    }
    let newRange = range.slice()
    let labelIndex = range.findIndex(x => x.label === label)
    let usedColors = range.map(x => x.color)

    if (labelIndex >= 0) {
      onNoteAttrChange({
        ...noteAttr,
        value: range[labelIndex].id
      })
    } else {
      let availColor = tagColorList.filter(x => !usedColors.includes(x))
      if (availColor.length === 0) {
        availColor = tagColorList
      }
      const newId = uuid()
      newRange.push({
        id: newId,
        label,
        color: availColor[Math.floor(Math.random() * availColor.length)]
      })
      let newValue: string | Array<string>
      if (isMulti) {
        // @ts-ignore
        newValue = noteAttr.value.slice()
        // @ts-ignore
        newValue.push(newId)
      } else {
        newValue = newId
      }
      onBothAttrChange({
        note: { value: newValue },
        journal: { range: newRange }
      })
      setValue('')
    }
    popupState.toggle()
  }

  const handleKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (e.key === 'Enter') handleSubmit(e.target.value)
  }

  let listedItems: Array<AttributeRangeType> = []
  if (range) {
    listedItems = range.filter(x => (x.label || '').indexOf(value) !== -1)
  }

  return (
    <React.Fragment>
      <InfileFlexCenteredBox>
        {curSelections.map(x =>
          <MarginRightChip
            key={x.id}
            style={{ backgroundColor: x.color }}
            size="small"
            label={x.label}
          />
        )}
        <NoBorderInput
          value={value}
          autoFocus={true}
          onChange={e => setValue(e.target.value)}
          // @ts-ignore
          onKeyDown={handleKeyDown}
        />
      </InfileFlexCenteredBox>
      <Box>
        {value && (!range || !range.some(x => x.label === value)) && (
          <HoverBox>
            <NoHoverButton style={{ width: '100%' }} onClick={() => handleSubmit(value)}>
              <ClickableChip size="small" label={`新建选项: ${value}`} />
            </NoHoverButton>
          </HoverBox>
        )}
        {(!range || range.length === 0) && !value ? (
          <NoHoverButton style={{ width: '100%' }}>
            <ClickableChip size="small" label={`开始输入并新建选项`} />
          </NoHoverButton>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {listedItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <HoverBox>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}>
                            <DragIndicatorIcon
                              style={{ fontSize: '1rem', maxWidth: '1rem' }}
                            />
                            <NoHoverButton
                              style={{ width: 'calc(100% - 1rem)' }}
                              onClick={() => onChange(item.id)}>
                              <ClickableChip
                                style={{ backgroundColor: item.color }}
                                size="small"
                                label={item.label}
                              />
                            </NoHoverButton>
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
        )}
      </Box>
    </React.Fragment>
  )
}

export default BaseSelectEditor
