import React from 'react'
import { Popover } from '@material-ui/core'
import {
  bindMenu,
  bindToggle,
  usePopupState
} from 'material-ui-popup-state/hooks'
import { NoteAttribute } from '@/types/note'
import { NoteState } from '@/types/states'
import {
  AttributeIcon,
  AttributeLabel,
  AttributeName,
  AttributeNameWrapper
} from '../../StyledComponents'
import notePropTypes from '@/types/constants/note-attributes'
import sagaAction, { useSelector } from '@/store'
import * as NOTE_ACT from '@/store/note/actions'
import AttributeTypeEditor from './AttributeTypeEditor'

const Index: React.FunctionComponent<NoteAttribute> = ({ attrId }) => {
  const {
    note: { attributes },
    journalAttrs
  }: NoteState = useSelector(state => state.get('note'))

  const { type, label } = journalAttrs[
    journalAttrs.findIndex(x => x._id === attrId)
  ]
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'propertyTitlePopup'
  })

  const handleChangeType = (newType: string) => {
    popupState.toggle()
    if (type !== newType) {
      sagaAction({ type: NOTE_ACT.SAGA_UPDATE_ATTRIBUTE_TYPE, attrId, newType })
    }
  }

  const handleChangeLabel = (newTitle: string) => {
    sagaAction({ type: NOTE_ACT.SAGA_UPDATE_ATTRIBUTE_TITLE, attrId, newTitle })
  }

  const handleRemove = () => {
    sagaAction({ type: NOTE_ACT.SAGA_REMOVE_ATTRIBUTE, attrId })
  }

  return (
    <AttributeNameWrapper>
      <AttributeName {...bindToggle(popupState)}>
        <AttributeIcon>{notePropTypes[type].icon}</AttributeIcon>
        <AttributeLabel>
          {label || notePropTypes[type].defaultLabel}
        </AttributeLabel>
      </AttributeName>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        {...bindMenu(popupState)}
      >
        <AttributeTypeEditor
          label={label}
          onLabelChange={handleChangeLabel}
          onTypeChange={handleChangeType}
          onDelete={handleRemove}
        />
      </Popover>
    </AttributeNameWrapper>
  )
}

export default Index
