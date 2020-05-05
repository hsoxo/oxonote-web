import * as React from 'react';
import {useContext} from 'react';
import {Box, Button, Popover} from "@material-ui/core";
import {bindPopover, bindTrigger, usePopupState,} from 'material-ui-popup-state/hooks'
import styled from "styled-components";
import {JournalState} from "@/types/states";
import {useSelector} from "@/store";
import notePropTypes, {MULTI_SELECT, SINGLE_SELECT} from "@/types/constants/note-attributes";
import {JOURNAL_KANBAN_VIEW, JournalAttribute, JournalView} from "@/types/journal";
import {DenseListItemBox, DenseListItemIcon} from "@/components/OxOUI/List";
import {JournalContext} from "@/app/Noxo/Journal";


const InfileBox = styled(Box)`
  margin: 0.3rem 0;
`

const GroupBySetting: React.FunctionComponent = () => {
  const context = useContext(JournalContext)
  const { viewId } = context

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const { views, attrs: jourAttrs, journal }: JournalState = useSelector(state => state.get('journal'))

  const curView = views.find(x => x._id === viewId) as JournalView

  if (curView.type !== JOURNAL_KANBAN_VIEW) return null

  const curAttr = jourAttrs.find(x => x._id === curView.kanbanAttrId) as JournalAttribute

  let attributes = jourAttrs
    .map(x => ({...notePropTypes[x.type], ...x}))
    .filter(x => journal.attrIds.indexOf(x._id) > -1 && (x.type === SINGLE_SELECT || x.type === MULTI_SELECT))
    .sort((a, b) => journal.attrIds.indexOf(a._id) - journal.attrIds.indexOf(b._id))

  return (
    <div>
      <Button {...bindTrigger(popupState)}>
        分组：{curAttr.label}
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
          {attributes.map((x) =>
            <DenseListItemBox key={x.attrId}>
              <DenseListItemIcon>
                {x.icon}
              </DenseListItemIcon>
              {x.label}
            </DenseListItemBox>
          )}
        </InfileBox>
      </Popover>
    </div>
  );
};

export default GroupBySetting;