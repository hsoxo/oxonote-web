import React, {useContext, useState} from 'react'
import AddIcon from '@material-ui/icons/Add'
import {
  AttributeNameWrapper,
  AttributeLabel,
  AttributeIcon,
  AttributeName,
} from '../../StyledComponents'
import notePropTypes from '@/types/constants/note-attributes'
import action, { useSelector } from '@/store'
import * as NOTE_ACT from '@/store/note/actions'
import { NoteState } from '@/types/states'
import { v4 as uuid } from 'uuid'
import {bindMenu, bindToggle, usePopupState} from 'material-ui-popup-state/hooks'
import { Popover } from '@material-ui/core'
import AttributeTypeEditor from './AttributeTypeEditor'

const CreateNew = () => {
  const { note }: NoteState = useSelector(state => state.get('note'))
  const [title, setTitle] = useState('新属性')
  const popupState = usePopupState({
    variant: "popover",
    popupId: "propertyTitlePopup",
  });

  const handleCreateAttr = (newType: string) => {
    action({ type: NOTE_ACT.SAGA_CREATE_ATTRIBUTE, noteId: note._id, attrType: newType, label: title })
  }

  return (
    <AttributeNameWrapper>
      <AttributeName
        color="primary"
        {...bindToggle(popupState)}>
        <AttributeIcon>
          <AddIcon fontSize="inherit" />
        </AttributeIcon>
        <AttributeLabel>{'新增属性'}</AttributeLabel>
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
        {...bindMenu(popupState)}>
        <AttributeTypeEditor
          label={title}
          onLabelChange={setTitle}
          onTypeChange={handleCreateAttr}
        />
      </Popover>
    </AttributeNameWrapper>
  )
}

export default CreateNew
