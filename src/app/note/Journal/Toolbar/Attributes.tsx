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
import {useSelector} from "@/store";
import notePropTypes from "@/constants/note-attributes";

const DenseListItem = styled(ListItem)`
  width: 300px;
  height: 2.5rem;
  &:focus {
    background-color: var(--secondary-bg-hover);
    color: var(--secondary-text);
  }
`

const DenseListItemIcon = styled(ListItemIcon)`
  min-width: 1.5rem;
  font-size: 1.2rem;
`

const DenseListItemText = styled(ListItemText)`
  font-size: 1rem;
`

const Attributes = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const { curJournal }: NoteState = useSelector(state => state.get('note'))
  const { jourAttrs } = curJournal

  let attributes = jourAttrs.map(x => ({...notePropTypes[x.type], ...x}))
  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <Button variant="contained" {...bindTrigger(popupState)}>
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
      >
        <Box>
          {attributes.map(x =>
            // @ts-ignore
            <DenseListItem key={x.attrId}>
              <DenseListItemIcon>
                {x.icon}
              </DenseListItemIcon>
              <DenseListItemText primary={x.label} />
              <ListItemSecondaryAction>
                <Switch
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </ListItemSecondaryAction>
            </DenseListItem>)}
        </Box>
      </Popover>
    </div>
  );
};

export default Attributes;