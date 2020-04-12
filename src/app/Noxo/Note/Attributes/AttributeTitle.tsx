import React from "react";
import {Popover} from "@material-ui/core";
import {
  usePopupState,
  bindToggle,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { NoteAttribute } from "@/types/note";
import {NoteState} from "@/types/states";
import { BootstrapInput } from "@/components/OxOUI/Input";
import { MarginDivider5 } from "@/components/OxOUI/Divider";
import { AttributeNameWrapper, AttributeLabel, AttributeIcon, AttributeName } from "./StyledComponents";
import notePropTypes from "@/types/constants/note-attributes";
import action from '@/store'
import { useSelector } from "@/store";
import NOTE_ACT from "@/store/note/actions";
import {v4 as uuid} from "uuid";
import styled from "styled-components";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {DenseListItem, DenseListItemHeader, DenseListItemIcon} from "@/components/OxOUI/List";

const InfileBootstrapInput = styled(BootstrapInput)`
  padding-bottom: 0.2rem;
`

const AttributeTitle: React.FunctionComponent<NoteAttribute> = props => {
  const { curJournal: { jourAttrs }, curNote: { attributes } }: NoteState = useSelector(state => state.get('note'))
  const jourAttrIndex = jourAttrs.findIndex(x => x.attrId === props.attrId)
  const jourAttr = jourAttrs[jourAttrIndex]
  const { type, label } = jourAttr
  const popupState = usePopupState({
    variant: "popover",
    popupId: "propertyTitlePopup",
  });

  const handleChangeType = (newType: string) => {
    const newAttrInfo = notePropTypes[newType]
    const newJourAttrs = jourAttrs.slice()
    popupState.toggle()
    if (jourAttr.type !== newType) {
      const newAttrId = uuid()
      newJourAttrs.splice(jourAttrIndex, 1, {
        attrId: newAttrId,
        type: newType,
        label: newAttrInfo.defaultLabel
      })
      const newAttributes = attributes.slice()
      const attrIndex = newAttributes.findIndex(x => x.attrId === props.attrId);
      newAttributes.splice(attrIndex, 1, {
        attrId: newAttrId,
        value: newAttrInfo.defaultValue()
      })
      action(NOTE_ACT.SAGA_UPDATE_ALL,
        { journal: { jourAttrs: newJourAttrs }, note: { attributes: newAttributes } })
    }
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    if (label !== newTitle) {
      const newJourAttrs = jourAttrs.slice()
      newJourAttrs[jourAttrIndex].label = newTitle
      action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { jourAttrs: newJourAttrs })
    }
  }

  const handleRemove = () => {
    const newJourAttrs = jourAttrs.slice()
    newJourAttrs.splice(jourAttrIndex, 1)
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { jourAttrs: newJourAttrs })
  }

  return (
    <AttributeNameWrapper>
      <AttributeName {...bindToggle(popupState)}>
        <AttributeIcon>
          {notePropTypes[type].icon}
        </AttributeIcon>
        <AttributeLabel>
          {label || notePropTypes[type].defaultLabel}
        </AttributeLabel>
      </AttributeName>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...bindMenu(popupState)}>
        <InfileBootstrapInput
          defaultValue={label}
          // @ts-ignore
          onBlur={handleChangeTitle}
        />
        <MarginDivider5 />
        <DenseListItemHeader>
          {"修改属性类型"}
        </DenseListItemHeader>
        {Object.entries(notePropTypes).map(([k, v]) =>
          k !== '0' ?
          <DenseListItem key={k} button={true} onClick={() => handleChangeType(k)}>
            <DenseListItemIcon>
              {v.icon}
            </DenseListItemIcon>
            {v.defaultLabel}
          </DenseListItem>
            :
          <></>
        )}
        <MarginDivider5 />
        <DenseListItem button={true} onClick={handleRemove}>
          <DenseListItemIcon>
            <HighlightOffIcon fontSize="inherit"/>
          </DenseListItemIcon>
          {"删除属性"}
        </DenseListItem>
        <div style={{height: '0.3rem'}} />
      </Popover>
    </AttributeNameWrapper>
  )
}

export default AttributeTitle