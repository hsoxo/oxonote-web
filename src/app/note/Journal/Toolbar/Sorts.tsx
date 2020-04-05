import React from "react";
import {bindPopover, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {
  Box,
  Button,
  Select,
  ListItem,
  MenuItem,
  ListItemSecondaryAction,
  Popover,
  IconButton,
  ListItemText
} from "@material-ui/core";
import {NoteState} from "@/store/note/types";
import action, {useSelector} from "@/store";
import {JournalView} from "@/types/journal";
import DeleteIcon from '@material-ui/icons/Delete';
import NOTE_ACT from "@/store/note/action-declares";

type ViewsManagerProps = {
  jourId: string
  viewId: string
}

const SortSetting: React.FunctionComponent<ViewsManagerProps> = (props) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const { curJournal: { views, jourAttrs } }: NoteState = useSelector(state => state.get('note'))
  const curViewIndex = views.findIndex(x => x.viewId === props.viewId)
  const curViewInfo = views[curViewIndex] as JournalView

  const handleChange = (attrId: string, payload: any) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === props.viewId)
    let attrIndex = newViews[viewIndex].sorts.findIndex(x => x.attrId === attrId)
    newViews[viewIndex].sorts[attrIndex] = {
      ...newViews[viewIndex].sorts[attrIndex],
      ...payload
    }
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleDelete = (index: number) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === props.viewId)
    newViews[viewIndex].sorts.splice(index, 1)
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleNewSort = () => {
    if (sorts.length >= jourAttrs.length) {
      return
    }
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === props.viewId)
    newViews[viewIndex].sorts.push({
      attrId: '',
      direction: ''
    })
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  if (!props.viewId) return (
    <Button>
      排序
    </Button>
  )

  const sorts = curViewInfo.sorts || []
  const availableAttrs = jourAttrs.filter(x => !sorts.some(y => y.attrId === x.attrId))

  return (
    <div>
      <Button {...bindTrigger(popupState)}>
        排序
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
          {sorts.map((x, index) =>
            <ListItem key={index}>
              <Select
                value={x.attrId}
                onChange={(e) => handleChange(x.attrId, { attrId: e.target.value })}
                displayEmpty
              >
                {availableAttrs.map(attr => (
                  <MenuItem value={attr.attrId} key={attr.attrId}>{attr.label}</MenuItem>
                ))}
                {x.attrId &&
                <MenuItem value={x.attrId}>
                  {(jourAttrs.find(y => x.attrId === y.attrId) || {}).label}
                </MenuItem>}
              </Select>
              <Select
                value={x.direction}
                onChange={(e) => handleChange(x.attrId, { direction: e.target.value })}
                displayEmpty
              >
                <MenuItem value="+">升序</MenuItem>
                <MenuItem value="-">降序</MenuItem>
              </Select>
              <ListItemSecondaryAction>
                <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
          <ListItem onClick={handleNewSort}>
            <ListItemText primary={'新增排序'} />
          </ListItem>
        </Box>
      </Popover>
    </div>
  )
}

export default SortSetting