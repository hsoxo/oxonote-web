import React, {useContext, useState} from 'react'
import AddIcon from '@material-ui/icons/Add'
import {
  AttributeNameWrapper,
  AttributeLabel,
  AttributeIcon,
  AttributeName,
  AttributeTitlePopover
} from './UI'
import notePropTypes from '@/types/constants/note-attributes'
import action, { useSelector } from '@/store'
import NOTE_ACT from '@/store/note/actions'
import { NoteState } from '@/types/states'
import { v4 as uuid } from 'uuid'
import {bindMenu, bindToggle, usePopupState} from 'material-ui-popup-state/hooks'
import { Popover } from '@material-ui/core'
import AttributeTypeEditor from '@/app/Noxo/Note/Attributes/components/AttributeTypeEditor'

const AddNew = () => {
  const {
    curJournal: { jourAttrs },
    curNote: { attributes }
  }: NoteState = useSelector(state => state.get('note'))
  const [title, setTitle] = useState('新属性')
  const popupState = usePopupState({
    variant: "popover",
    popupId: "propertyTitlePopup",
  });

  const handleCreateAttr = (newType: string) => {
    const newAttrInfo = notePropTypes[newType]
    const newJourAttrs = jourAttrs.slice()
    const newAttrId = uuid()
    newJourAttrs.push({
      _id: newAttrId,
      _rev: '',
      attrId: newAttrId,
      type: newType,
      label: title
    })

    const newAttributes = attributes.slice()
    newAttributes.push({
      attrId: newAttrId,
      value: newAttrInfo.defaultValue()
    })

    action(NOTE_ACT.SAGA_UPDATE_ALL, {
      journal: { jourAttrs: newJourAttrs },
      note: { attributes: newAttributes }
    })
    popupState.toggle()
    setTitle('新属性')
  }

  return (
    <AttributeNameWrapper>
      <AttributeName
        color="primary"
        onClick={handleCreateAttr}
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

export default AddNew
