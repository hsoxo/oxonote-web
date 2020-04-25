import React, { useEffect, useRef, useState } from 'react'
import { Box, Popover } from '@material-ui/core'
import { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { JournalAttribute } from '@/types/journal'
import { NoteAttribute, NoteSummaryObject } from '@/types/note'
import { NoteState } from '@/types/states'
import sagaAction, { useSelector } from '@/store'
import * as NOTE_ACT from '@/store/note/actions'

export type ContentViewProps = {
  attrId: string
  noteInfo: NoteSummaryObject
  jourAttr: JournalAttribute
  noteAttr: NoteAttribute
}

export type ContentPopoverProps = {
  attrId: string
  jourAttr: JournalAttribute
  noteAttr: NoteAttribute
  onNoteAttrChange: any
  onJourAttrChange: any
  onBothAttrChange: any
  popupState: any
}

type BaseElementProps = {
  attrId: string
  editable: boolean
  display: React.FunctionComponent<ContentViewProps>
  popover?: React.FunctionComponent<ContentPopoverProps>
  onClick?: any
  isToggle?: true
}

const BaseElement: React.FunctionComponent<BaseElementProps> = ({
  attrId,
  isToggle,
  popover: PopoverComponent,
  display: DisplayComponent
}) => {
  const { note, journalAttrs }: NoteState = useSelector(state => state.get('note'))

  const { attributes } = note
  const curAttr = attributes[attributes.findIndex(x => x.attrId === attrId)]
  const jourAttr = journalAttrs[journalAttrs.findIndex(x => x._id === attrId)]

  // handle popover width
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopper'
  })
  const ref = useRef<HTMLDivElement>(null)
  const [popWidth, setPopWidth] = useState(200)
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0
    setPopWidth(width)
  }, [ref, setPopWidth])

  const handleAttrValueChange = (newValue: any) => {
    sagaAction({ type: NOTE_ACT.SAGA_UPDATE_ATTRIBUTE_VALUE, noteId: note._id, attrId, newValue })
  }

  const handleClick = () => {
    if (isToggle && (typeof curAttr.value === "boolean")) {
      handleAttrValueChange(!curAttr.value)
    }
  }

  return (
    <div ref={ref} style={{ width: '100%' }} onClick={handleClick}>
      {PopoverComponent ? (
        <React.Fragment>
          <Box {...bindTrigger(popupState)}>
            <DisplayComponent
              attrId={attrId}
              noteInfo={note}
              jourAttr={jourAttr}
              noteAttr={curAttr}
            />
          </Box>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            PaperProps={{
              style: {
                width: popWidth,
                marginTop: '-0.5rem',
                marginLeft: '-0.5rem',
                boxShadow: 'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
              }
            }}>
            <PopoverComponent
              {...{
                attrId: attrId,
                jourAttr,
                noteAttr: curAttr,
                onNoteAttrChange: handleAttrValueChange,
                onJourAttrChange: () => {},
                onBothAttrChange: () => {},
                popupState,
              }}
            />
          </Popover>
        </React.Fragment>
      ) : (
        <Box {...bindTrigger(popupState)}>
          <DisplayComponent
            attrId={attrId}
            noteInfo={note}
            jourAttr={jourAttr}
            noteAttr={curAttr}
          />
        </Box>
      )}
    </div>
  )
}

export default BaseElement
