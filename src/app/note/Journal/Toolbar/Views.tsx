import React from "react";
import {bindPopover, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {Box, Button, ListItemIcon, ListItem, ListItemText, ListItemSecondaryAction, Popover, Switch} from "@material-ui/core";
import {NoteState} from "@/store/note/types";
import {useSelector} from "@/store";

type ViewsManagerProps = {
  jourId: string
  viewId: string
}

const ViewsManager: React.FunctionComponent<ViewsManagerProps> = (props) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })

  const { curJournal: { views } }: NoteState = useSelector(state => state.get('note'))


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
      >
        <Box>
          {views.map(x =>
            <ListItem key={x.viewId}>
              <ListItemIcon>
                {/*{x.icon}*/}
              </ListItemIcon>
              <ListItemText primary={x.label} />
            </ListItem>
          )}
        </Box>
      </Popover>
    </div>
  )
}

export default ViewsManager