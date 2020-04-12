import React, {useContext} from 'react'
import AddIcon from '@material-ui/icons/Add';
import { AttributeNameWrapper, AttributeLabel, AttributeIcon, AttributeName, AttributeTitlePopover } from "./StyledComponents";
import notePropTypes from "@/types/constants/note-attributes";
import action, {useSelector} from "@/store";
import NOTE_ACT from "@/store/note/actions";
import {NoteState} from "@/types/states";
import { v4 as uuid} from "uuid";

const AddNew = () => {
  const { curJournal: { jourAttrs }, curNote: { attributes } }: NoteState = useSelector(state => state.get('note'))

  const handleCreateAttr = () => {
    const newType = '7'
    const newAttrInfo = notePropTypes[newType]
    const newJourAttrs = jourAttrs.slice()
    const newAttrId = uuid()
    newJourAttrs.push({
      attrId: newAttrId,
      type: newType,
      label: newAttrInfo.defaultLabel
    })

    const newAttributes = attributes.slice()
    newAttributes.push({
      attrId: newAttrId,
      value: newAttrInfo.defaultValue()
    })

    action(NOTE_ACT.SAGA_UPDATE_ALL,
      { journal: { jourAttrs: newJourAttrs }, note: { attributes: newAttributes } })
  }

  return (
      <AttributeNameWrapper>
        <AttributeName color="primary" onClick={handleCreateAttr}>
          <AttributeIcon>
            <AddIcon fontSize="inherit"/>
          </AttributeIcon>
          <AttributeLabel>
            {"新增属性"}
          </AttributeLabel>
        </AttributeName>
      </AttributeNameWrapper>
  )
}

export default AddNew