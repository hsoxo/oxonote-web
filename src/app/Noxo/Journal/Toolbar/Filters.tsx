import React from 'react'
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks'
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
} from '@material-ui/core'
import { NoteState } from '@/types/states'
import action, { useSelector } from '@/store'
import { JournalView, JournalViewFiltersSetting } from '@/types/journal'
import DeleteIcon from '@material-ui/icons/Delete'
import NOTE_ACT from '@/store/note/actions'
import notePropTypes from '@/types/constants/note-attributes'
import {
  DenseListItem,
  DenseListItemBoxNoHover,
  DenseListItemIcon
} from '@/components/OxOUI/List'
import { MarginDivider5 } from '@/components/OxOUI/Divider'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'
import { DenseSelect, DenseSelectItem } from "@/components/OxOUI/Select";


type ViewsManagerProps = {
  jourId: string
  viewId: string
}

interface JournalViewFiltersSettingEnhanced extends JournalViewFiltersSetting {
  type: string
}

const FilterSetting: React.FunctionComponent<ViewsManagerProps> = props => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover'
  })
  const {
    curJournal: { views, jourAttrs }
  }: NoteState = useSelector(state => state.get('note'))
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
    newViews[viewIndex].filters.settings.push({
      attrId: '',
      operator: '',
      target: '',
      date: 0
    })
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  if (!props.viewId) return <Button>筛选</Button>

  const { relation, settings } = curViewInfo.filters || {}

  const enhancedSettings: Array<JournalViewFiltersSettingEnhanced> = []
  for (const item of settings) {
    const jourAttr = jourAttrs.find(x => x.attrId === item.attrId)
    enhancedSettings.push({
      ...item,
      type: jourAttr ? jourAttr.type : ''
    })
  }

  return (
    <div>
      <Button {...bindTrigger(popupState)}>筛选</Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          style: {
            minWidth: '200px'
          }
        }}>
        <Box>
          <div style={{ height: '0.6rem' }} />
          {enhancedSettings.map((setting, index) => (
            <DenseListItemBoxNoHover key={index}>
              {enhancedSettings.length > 1 && index > 0 && (
                <FormControl
                  size="small"
                  disabled={index > 1}>
                  <DenseSelect
                    variant="outlined"
                    value={relation}
                    onChange={e => handleChangeRelation(e.target.value)}
                    displayEmpty>
                    <DenseSelectItem value="and">并且</DenseSelectItem>
                    <MenuItem value="or">或者</MenuItem>
                  </DenseSelect>
                </FormControl>
              )}
              <DenseSelect
                variant="outlined"
                value={setting.attrId}
                onChange={e => handleChange(index, { attrId: e.target.value })}
                displayEmpty>
                {jourAttrs.map(attr => (
                  <DenseSelectItem value={attr.attrId} key={attr.attrId}>
                    {attr.label}
                  </DenseSelectItem>
                ))}
              </DenseSelect>
              {setting.attrId && (
                <DenseSelect
                  variant="outlined"
                  value={setting.operator}
                  onChange={e =>
                    handleChange(index, { operator: e.target.value })
                  }
                  displayEmpty>
                  {notePropTypes[setting.type].operators.map(op => (
                    <DenseSelectItem key={op.label} value={op.label}>
                      {op.label}
                    </DenseSelectItem>
                  ))}
                </DenseSelect>
              )}
              {setting.attrId && setting.operator && (
                <DenseSelect
                  variant="outlined"
                  value={setting.operator}
                  onChange={e =>
                    handleChange(index, { operator: e.target.value })
                  }
                  displayEmpty>
                  {notePropTypes[setting.type].operators.map(op => (
                    <DenseSelectItem key={op.label} value={op.label}>
                      {op.label}
                    </DenseSelectItem>
                  ))}
                </DenseSelect>
              )}
              <DenseListItemIcon style={{marginLeft: 'auto'}}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </DenseListItemIcon>
            </DenseListItemBoxNoHover>
          ))}
          <div style={{ height: '0.3rem' }} />
          <MarginDivider5 />
          <DenseListItem button={true} onClick={handleNewFilter}>
            <DenseListItemIcon>
              <AddIcon fontSize="inherit" />
            </DenseListItemIcon>
            {'新增筛选'}
          </DenseListItem>
          <div style={{ height: '0.3rem' }} />
        </Box>
      </Popover>
    </div>
  )
}

export default FilterSetting
