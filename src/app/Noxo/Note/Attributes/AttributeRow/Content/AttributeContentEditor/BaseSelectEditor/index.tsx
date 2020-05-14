import React, {useState} from 'react'
import {ContentPopoverProps} from '../Base'
import {DropResult} from 'react-beautiful-dnd'
import {reorder} from '../../../../utils/dnd-helper'
import {AttributeRangeType} from '@/types/journal'
import {Box} from '@material-ui/core'
import {NoBorderInput} from '@/components/OxOUI/Input'
import {FlexCenteredBox} from '@/components/OxOUI/OxOBox'
import styled from 'styled-components'
import {MarginRightChip} from '@/components/OxOUI/Chip'
import {ClickableChip, HoverBox, NoHoverButton} from '../../../../StyledComponents'
import SelectionList from './SelectionList'
import sagaAction, {useSelector} from "@/store";
import * as NOTE_ACT from "@/store/note/actions";
import {NoteState} from "@/types/states";

interface SelectTypeContentPopoverProps extends ContentPopoverProps {
  isMulti: boolean
}

const InfileFlexCenteredBox = styled(FlexCenteredBox)`
  background-color: var(--mu-bg);
  padding: 0 0.3rem;
`

const handleRangeChange = (attrId: string, newRange: Array<AttributeRangeType>) => {
  sagaAction({ type: NOTE_ACT.SAGA_UPDATE_ATTRIBUTE_SELECT_RANGE, attrId, newRange })
}

const handleValueChange = (noteId: string, attrId: string, value: string | Array<string>) => {
  sagaAction({ type: NOTE_ACT.SAGA_UPDATE_ATTRIBUTE_VALUE, noteId, attrId, newValue: value })
}

const Index: React.FunctionComponent<SelectTypeContentPopoverProps> = ({
  isMulti,
  noteAttr,
  jourAttr,
  popupState
}) => {
  const { note, journalAttrs }: NoteState = useSelector(state => state.get('note'))
  const { attrId } = noteAttr
  const [value, setValue] = useState('')

  let range = jourAttr.range || []

  const curSelections: Array<AttributeRangeType> = isMulti
    // @ts-ignore
    ? range.filter(x => noteAttr.value.includes(x.id))
    : range.filter(x => x.id === noteAttr.value)

  const handleDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const newRange = reorder(
      range,
      result.source.index,
      result.destination.index
    )
    handleRangeChange(attrId, newRange)
  }

  const handleChange = (selectionId: string) => {
    if (isMulti && Array.isArray(noteAttr.value)) {
      const newValue = noteAttr.value.slice()
      if (!newValue.includes(selectionId)) {
        newValue.push(selectionId)
        handleValueChange(note._id, attrId, newValue)
      }
    } else {
      handleValueChange(note._id, attrId, selectionId)
    }
    popupState.toggle()
  }

  const handleRemove = (selectionId: string) => {
    if (isMulti && Array.isArray(noteAttr.value)) {
      const newValue: Array<string> = noteAttr.value.slice()
      const index = newValue.findIndex(x => x === selectionId)
      if (index > -1) {
        newValue.splice(index, 1)
        handleValueChange(note._id, attrId, newValue)
      }
    }
    popupState.toggle()
  }

  const handleSelectionColorChange = (selectionId: string, color: string) => {
    let newRange = range.slice()
    let labelIndex = range.findIndex(x => x.id === selectionId)
    newRange[labelIndex].color = color
    handleRangeChange(attrId, newRange)
  }

  const handleSelectionDelete = (selectionId: string) => {
    let newRange = range.slice()
    newRange.splice(range.findIndex(x => x.id === selectionId), 1)
    handleRangeChange(attrId, newRange)
  }

  const handleSubmit = (label: string) => {
    if (!label) {
      return
    }
    let newValue: string | Array<string>
    if (isMulti) {
      if (Array.isArray(noteAttr.value)) {
        newValue = noteAttr.value.slice()
        newValue.push(label)
      } else {
        newValue = [label]
      }
      handleValueChange(note._id, attrId, newValue)
    } else {
      handleValueChange(note._id, attrId, label)
    }
    setValue('')
    popupState.toggle()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        {curSelections.map(x => (
          <MarginRightChip
            key={x.label}
            style={{ backgroundColor: x.color }}
            size="small"
            label={x.label}
            onDelete={isMulti ? () => {handleRemove(x.label)} : undefined}
          />
        ))}
        <NoBorderInput
          value={value}
          autoFocus={true}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </InfileFlexCenteredBox>
      <Box>
        {value && (!range || !range.some(x => x.label === value)) && (
          <HoverBox>
            <NoHoverButton
              style={{ width: '100%' }}
              onClick={() => handleSubmit(value)}>
              <ClickableChip size="small" label={`新建选项: ${value}`} />
            </NoHoverButton>
          </HoverBox>
        )}
        {(!range || range.length === 0) && !value ? (
          <NoHoverButton style={{ width: '100%' }}>
            <ClickableChip size="small" label={`开始输入并新建选项`} />
          </NoHoverButton>
        ) : (
          <SelectionList
            listedItems={listedItems}
            handleReorder={handleDragEnd}
            handleSelectionClick={handleChange}
            handleSelectionColorChange={handleSelectionColorChange}
            handleDelete={handleSelectionDelete}
          />
        )}
      </Box>
    </React.Fragment>
  )
}

export default Index
