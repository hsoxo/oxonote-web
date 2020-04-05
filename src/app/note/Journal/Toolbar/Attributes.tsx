import * as React from 'react';
import {
  Button, Popover, ListItem, ListItemIcon, ListItemText,
  ListItemSecondaryAction, Switch, Box
} from "@material-ui/core";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks'
import styled from "styled-components";
import {NoteState} from "@/store/note/types";
import action, {useSelector} from "@/store";
import notePropTypes from "@/constants/note-attributes";
import NOTE_ACT from "@/store/note/action-declares";
import {JournalView} from "@/types/journal";
import { DenseListItemBox, DenseListItemIcon } from "@/components/OxOUI/List";
import { AntSwitch } from "@/components/OxOUI/Switch";

type ViewsManagerProps = {
  jourId: string
  viewId: string
}

const InfileBox = styled(Box)`
  margin: 0.3rem 0;
`

const AttributeSetting: React.FunctionComponent<ViewsManagerProps> = (props) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const { curJournal }: NoteState = useSelector(state => state.get('note'))
  const { views, jourAttrs } = curJournal

  let attributes = jourAttrs.map(x => ({...notePropTypes[x.type], ...x}))
  const curJourView = views.find(x => x.viewId === props.viewId) as JournalView
  let attrSetting: Array<{ attrId: string, status: boolean}> = []
  if (curJourView) {
    attrSetting = curJourView.attribute
  }
  const onToggle = (attrId: string) => {
    let newAttrSetting = attrSetting.slice()
    const toggledAttrIndex = newAttrSetting.findIndex(x => x.attrId === attrId)
    if (toggledAttrIndex >= 0) {
      newAttrSetting.splice(toggledAttrIndex, 1, {
        attrId,
        status: !newAttrSetting[toggledAttrIndex].status
      })
    } else {
      newAttrSetting.push({
        attrId,
        status: true
      })
    }
    const newViews = views.slice()
    newViews.splice(newViews.findIndex(x => x.viewId === props.viewId), 1, {
      ...curJourView,
      attribute: newAttrSetting,
    })
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews})
  }

  return (
    <div>
      <Button {...bindTrigger(popupState)}>
        显示 / 隐藏属性
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            minWidth: '200px'
        }}}
      >
        <InfileBox>
          {attributes.map(x =>
            <DenseListItemBox key={x.attrId}>
              <DenseListItemIcon>
                {x.icon}
              </DenseListItemIcon>
              {x.label}
              <ListItemSecondaryAction>
                <AntSwitch
                  checked={(attrSetting.find(y => y.attrId === x.attrId) || {}).status || false}
                  onChange={() => onToggle(x.attrId)}
                />
              </ListItemSecondaryAction>
            </DenseListItemBox>)}
        </InfileBox>
      </Popover>
    </div>
  );
};

export default AttributeSetting;