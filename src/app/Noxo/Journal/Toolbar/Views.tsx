import React, {useContext} from "react";
import {bindPopover, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {Box, Button, IconButton, Popover} from "@material-ui/core";
import {JournalState} from "@/types/states";
import {useSelector} from "@/store";
import {DenseListItem, DenseListItemIcon} from "@/components/OxOUI/List";
import DeleteIcon from "@material-ui/icons/Delete";
import {MarginDivider5} from "@/components/OxOUI/Divider";
import ViewCreate from "./ViewCreate";
import {JournalContext} from "@/app/Noxo/Journal";

const ViewsManager: React.FunctionComponent = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoPopover' })

  const context = useContext(JournalContext)
  const { viewId, handleChangeView } = context
  const { views, journal: { viewIds } }: JournalState = useSelector(state => state.get('journal'))

  let sortedViews = views
    .filter(x => viewIds.indexOf(x._id) > -1)
    .sort((a, b) => viewIds.indexOf(a._id) - viewIds.indexOf(b._id))

  const curView = views.find(x => x._id === viewId)

  return (
    <div>
      <Button {...bindTrigger(popupState)}>
        {curView ? curView.label : 'Error'}
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
          {sortedViews.map(x =>
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