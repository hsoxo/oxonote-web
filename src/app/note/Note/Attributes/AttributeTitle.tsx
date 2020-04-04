import React, {useContext, useState} from "react";
import {Menu, Popover, MenuItem, ListItemText, ListItemIcon, ListItem} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import {
  usePopupState,
  bindToggle,
  bindMenu,
} from "material-ui-popup-state/hooks";
import DeleteIcon from '@material-ui/icons/Delete';
import { NoteAttribute } from "@/types/note";
import {NoteState} from "@/store/note/types";
import { BootstrapInput } from "@/components/OxOUI/Input";
import { MarginDivider5 } from "@/components/OxOUI/Divider";
import { AttributeNameWrapper, AttributeLabel, AttributeIcon, AttributeName, AttributeTitlePopover } from "./StyledComponents";
import notePropTypes from "@/constants/note-attributes";
import action from '@/store'
import { useSelector } from "@/store";
import NOTE_ACT from "@/store/note/action-declares";
import {v4 as uuid} from "uuid";

const DenseListItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
    height: '1.5rem',
    '& .MuiListItemIcon-root': {
      minWidth: '1.5rem',
      fontSize: '1rem',
      '& .MuiSvgIcon-root': {
        fontSize: 'inherit'
      }
    },
    '& .MuiListItemText-primary': {
      fontSize: '0.8rem',
    }
  },
}))(ListItem);

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
      action(NOTE_ACT.SAGA_UPDATE_NOTE, { jourAttrs: newJourAttrs })
    }
  }

  const handleRemove = () => {
    const newJourAttrs = jourAttrs.slice()
    newJourAttrs.splice(jourAttrIndex, 1)
    action(NOTE_ACT.SAGA_UPDATE_NOTE, { jourAttrs: newJourAttrs })
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
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        {...bindMenu(popupState)}>
        <BootstrapInput
          defaultValue={label}
          // @ts-ignore
          onBlur={handleChangeTitle}
        />
        <MarginDivider5 />
        {Object.entries(notePropTypes).map(([k, v]) =>
          k !== '0' ?
          <ListItem key={k} onClick={() => handleChangeType(k)}>
            <ListItemIcon>
              {v.icon}
            </ListItemIcon>
            <ListItemText primary={v.defaultLabel} />
          </ListItem>
            :
          <></>
        )}
        <MarginDivider5 />
        // @ts-ignore
        <DenseListItem onClick={handleRemove}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={"删除属性"} />
        </DenseListItem>
      </Popover>
    </AttributeNameWrapper>
  )
}

export default AttributeTitle