import React, {useContext} from "react";
import {bindPopover, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {
  Box,
  Button,
  Popover,
  IconButton,
} from "@material-ui/core";
import {JournalState} from "@/types/states";
import {useSelector} from "@/store";
import {JournalView} from "@/types/journal";
import DeleteIcon from '@material-ui/icons/Delete';
import { DenseSelect, DenseSelectItem } from "@/components/OxOUI/Select";
import {
  DenseListItem,
  DenseListItemBoxNoHover,
  DenseListItemIcon
} from '@/components/OxOUI/List'
import {MarginDivider5} from "@/components/OxOUI/Divider";
import AddIcon from "@material-ui/icons/Add";
import {JournalContext} from "@/app/Noxo/Journal";



const SortSetting: React.FunctionComponent = () => {
  const context = useContext(JournalContext)
  const { viewId } = context

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const { views, attrs: jourAttrs }: JournalState = useSelector(state => state.get('journal'))
  const curViewIndex = views.findIndex(x => x.viewId === viewId)
  const curViewInfo = views[curViewIndex] as JournalView

  const handleChange = (attrId: string, payload: any) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === viewId)
    let attrIndex = newViews[viewIndex].sorts.findIndex(x => x.attrId === attrId)
    newViews[viewIndex].sorts[attrIndex] = {
      ...newViews[viewIndex].sorts[attrIndex],
      ...payload
    }
    // action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleDelete = (index: number) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === viewId)
    newViews[viewIndex].sorts.splice(index, 1)
    // action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleNewSort = () => {
    if (sorts.length >= jourAttrs.length) {
      return
    }
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === viewId)
    newViews[viewIndex].sorts.push({
      attrId: '',
      direction: ''
    })
    // action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  if (!viewId) return (
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
          <div style={{ height: '0.6rem' }} />
          {sorts.map((x, index) =>
            <DenseListItemBoxNoHover key={index}>
              <DenseSelect
                variant="outlined"
                value={x.attrId}
                onChange={(e) => handleChange(x.attrId, { attrId: e.target.value })}
                displayEmpty
              >
                {availableAttrs.map(attr => (
                  <DenseSelectItem value={attr.attrId} key={attr.attrId}>{attr.label}</DenseSelectItem>
                ))}
                {x.attrId &&
                <DenseSelectItem value={x.attrId}>
                  {(jourAttrs.find(y => x.attrId === y.attrId) || {}).label}
                </DenseSelectItem>}
              </DenseSelect>
              <DenseSelect
                variant="outlined"
                value={x.direction}
                onChange={(e) => handleChange(x.attrId, { direction: e.target.value })}
                displayEmpty
              >
                <DenseSelectItem value="+">升序</DenseSelectItem>
                <DenseSelectItem value="-">降序</DenseSelectItem>
              </DenseSelect>
              <DenseListItemIcon style={{marginLeft: 'auto'}}>
                <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </DenseListItemIcon>
            </DenseListItemBoxNoHover>
          )}
          <div style={{ height: '0.3rem' }} />
          <MarginDivider5 />
          <DenseListItem button={true} onClick={handleNewSort}>
            <DenseListItemIcon>
              <AddIcon fontSize="inherit" />
            </DenseListItemIcon>
            {'新增排序'}
          </DenseListItem>
          <div style={{ height: '0.3rem' }} />
        </Box>
      </Popover>
    </div>
  )
}

export default SortSetting