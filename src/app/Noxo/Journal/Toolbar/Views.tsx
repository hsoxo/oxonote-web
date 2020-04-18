import React, {useContext} from "react";
import {bindPopover, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {
  Box,
  Button,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Popover,
  Switch,
  IconButton
} from "@material-ui/core";
import {JournalState, NoteState} from "@/types/states";
import {useSelector} from "@/store";
import {DenseSelect, DenseSelectItem} from "@/components/OxOUI/Select";
import {DenseListItem, DenseListItemBoxNoHover, DenseListItemIcon} from "@/components/OxOUI/List";
import DeleteIcon from "@material-ui/icons/Delete";
import {MarginDivider5} from "@/components/OxOUI/Divider";
import ViewCreate from "./ViewCreate";
import {JournalContext} from "@/app/Noxo/Journal";

type ViewsManagerProps = {
  jourId: string
  viewId: string
}

const ViewsManager: React.FunctionComponent<ViewsManagerProps> = (props) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })

  const context = useContext(JournalContext)

  const { views }: JournalState =
    useSelector(state => state.get('journal'))

  return (
    <div>
      <Button {...bindTrigger(popupState)}>
        视图
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
        <Box>
          <div style={{ height: '0.6rem' }} />
          {views.map(x =>
            <DenseListItem button key={x.viewId} onClick={() => context.handleChangeView(x.viewId)}>
              {x.label}
              <DenseListItemIcon style={{marginLeft: 'auto'}}>
                <IconButton size="small" aria-label="delete">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </DenseListItemIcon>
            </DenseListItem>
          )}
          <div style={{ height: '0.3rem' }} />
          <MarginDivider5 />
          <ViewCreate />
          <div style={{ height: '0.3rem' }} />
        </Box>
      </Popover>
    </div>
  )
}

export default ViewsManager