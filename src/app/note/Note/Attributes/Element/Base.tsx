import React, { useEffect, useRef, useState } from 'react'
import { Box, Popover } from '@material-ui/core'
import { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { BootstrapInput } from '@/components/OxOUI/Input'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { JournalAttribute } from '@/types/journal'
import {NoteAttribute, NoteShortType, NoteType} from '@/types/note'
import { NoteState } from '@/store/note/types'
import action, { useSelector } from '@/store'
import NOTE_ACT from '@/store/note/action-declares'

export type ContentViewProps = {
  attrId: string
  noteInfo: NoteShortType
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

const BaseElement: React.FunctionComponent<BaseElementProps> = props => {
  const {
    curJournal: { jourAttrs },
    curNote
  }: NoteState = useSelector(state => state.get('note'))
  const { attributes } = curNote
  const attrIndex = attributes.findIndex(x => x.attrId === props.attrId)
  const curAttr = attributes[attrIndex]
  const jourAttrIndex = jourAttrs.findIndex(x => x.attrId === props.attrId)
  const jourAttr = jourAttrs[jourAttrIndex]

  const ref = useRef<HTMLDivElement>(null)
  const [popWidth, setPopWidth] = useState(200)
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0
    setPopWidth(width)
  }, [ref, setPopWidth])

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopper'
  })

  const onNoteAttrChange = (newValue: any) => {
    const newAttributes = attributes.slice()
    newAttributes.splice(attrIndex, 1, {
      ...curAttr,
      ...newValue,
    })
    action(NOTE_ACT.SAGA_UPDATE_NOTE, { attributes: newAttributes })
  }

  const onJourAttrChange = (newValue: any) => {
    const newJourAttrs = jourAttrs.slice()
    newJourAttrs.splice(jourAttrIndex, 1, {
      ...jourAttr,
      ...newValue
    })
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { jourAttrs: newJourAttrs })
  }

  const onBothAttrChange = (newValue: any) => {
    const newAttributes = attributes.slice()
    const newJourAttrs = jourAttrs.slice()
    if (['note', 'journal'].every(x => !(x in newValue))) {
      console.warn('onBothAttrChange may get wrong argument' ,newValue)
      return
    }
    if ('note' in newValue) {
      newAttributes.splice(attrIndex, 1, {
        ...curAttr,
        ...newValue.note,
      })}
    if ('journal' in newValue) {
      newJourAttrs.splice(jourAttrIndex, 1, {
        ...jourAttr,
        ...newValue.journal,
      })}
    action(NOTE_ACT.SAGA_UPDATE_ALL, {
      note: { attributes: newAttributes },
      journal: { jourAttrs: newJourAttrs },
    })
  }

  const handleClick = () => {
    if (props.isToggle && (typeof curAttr.value === "boolean")) {
      onNoteAttrChange({ value: !curAttr.value })
    }
  }

  return (
    <div ref={ref} style={{ width: '100%' }} onClick={handleClick}>
      {props.popover ? (
        <React.Fragment>
          <Box {...bindTrigger(popupState)}>
            <props.display
              attrId={props.attrId}
              noteInfo={curNote}
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
              elevation: 2,
              style: {
                width: popWidth,
                marginTop: '-0.5rem',
                marginLeft: '-0.5rem',
              }
            }}>
            <props.popover
              {...{
                attrId: props.attrId,
                jourAttr,
                noteAttr: curAttr,
                onNoteAttrChange,
                onJourAttrChange,
                onBothAttrChange,
                popupState,
              }}
            />
          </Popover>
        </React.Fragment>
      ) : (
        <Box {...bindTrigger(popupState)}>
          <props.display
            attrId={props.attrId}
            noteInfo={curNote}
            jourAttr={jourAttr}
            noteAttr={curAttr}
          />
        </Box>
      )}
    </div>
  )
}

export default BaseElement
