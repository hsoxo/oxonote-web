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
  ListItemText,
  FormControl
} from "@material-ui/core";
import {NoteState} from "@/store/note/types";
import action, {useSelector} from "@/store";
import {JournalView, JournalViewFiltersSetting} from "@/types/journal";
import DeleteIcon from '@material-ui/icons/Delete';
import NOTE_ACT from "@/store/note/action-declares";
import notePropTypes from "@/constants/note-attributes";
import { DenseListItemBox, DenseListItemIcon } from "@/components/OxOUI/List";

type ViewsManagerProps = {
  jourId: string
  viewId: string
}

interface JournalViewFiltersSettingEnhanced extends JournalViewFiltersSetting {
  type: string
}

const FilterSetting: React.FunctionComponent<ViewsManagerProps> = (props) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const { curJournal: { views, jourAttrs } }: NoteState = useSelector(state => state.get('note'))
  const curViewIndex = views.findIndex(x => x.viewId === props.viewId)
  const curViewInfo = views[curViewIndex] as JournalView

  const handleChange = (index: number, payload: any) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === props.viewId)
    let newSetting = newViews[viewIndex].filters.settings
    newSetting[index] = {
      ...newSetting[index],
      ...payload
    }
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleChangeRelation = (relation: any) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === props.viewId)
    newViews[viewIndex].filters.relation = relation
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleDelete = (index: number) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === props.viewId)
    let newSetting = newViews[viewIndex].filters.settings
    newSetting.splice(index, 1)
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleNewFilter = () => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === props.viewId)
    newViews[viewIndex].filters.settings.push({ attrId: '', operator: '', target: '', date: 0 })
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  if (!props.viewId) return (
    <Button>
      筛选
    </Button>
  )

  const { relation, settings } = curViewInfo.filters || {}

  const enhancedSettings: Array<JournalViewFiltersSettingEnhanced> = []
  for (const item of settings) {
    const jourAttr = jourAttrs.find(x => x.attrId === item.attrId)
    enhancedSettings.push({
      ...item,
      type: jourAttr ? jourAttr.type : '',
    })
  }
  console.log(settings, enhancedSettings)

  return (
    <div>
      <Button {...bindTrigger(popupState)}>
        筛选
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
          {enhancedSettings.map((setting, index) =>
            <ListItem key={index}>
              {enhancedSettings.length > 1 && index > 0 &&
                <FormControl disabled={index > 1}>
                  <Select
                    value={relation}
                    onChange={(e) => handleChangeRelation(e.target.value)}
                    displayEmpty

                  >
                    <MenuItem value="and">并且</MenuItem>
                    <MenuItem value="or">或者</MenuItem>
                  </Select>
                </FormControl>
              }
              <Select
                value={setting.attrId}
                onChange={(e) => handleChange(index, { attrId: e.target.value })}
                displayEmpty
              >
                {jourAttrs.map(attr => (
                  <MenuItem value={attr.attrId} key={attr.attrId}>{attr.label}</MenuItem>
                ))}
              </Select>
              {setting.attrId &&
              <Select
                value={setting.operator}
                onChange={(e) => handleChange(index, { operator: e.target.value })}
                displayEmpty
              >
                {notePropTypes[setting.type].operators.map(op => <MenuItem key={op.label} value={op.label}>{op.label}</MenuItem>)}
              </Select>}
              {setting.attrId && setting.operator &&
              <Select
                value={setting.operator}
                onChange={(e) => handleChange(index, { operator: e.target.value })}
                displayEmpty
              >
                {notePropTypes[setting.type].operators.map(op => <MenuItem key={op.label} value={op.label}>{op.label}</MenuItem>)}
              </Select>}
              <ListItemSecondaryAction>
                <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
          <ListItem onClick={handleNewFilter}>
            <ListItemText primary={'新增筛选'} />
          </ListItem>
        </Box>
      </Popover>
    </div>
  )
}

export default FilterSetting