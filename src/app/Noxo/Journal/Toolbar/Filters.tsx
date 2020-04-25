import React, {Fragment, useContext} from 'react'
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks'
import {
  Box,
  Button,
  MenuItem,
  Popover,
  IconButton,
  FormControl
} from '@material-ui/core'
import {JournalState} from '@/types/states'
import { useSelector } from '@/store'
import {AttributeRangeType, JournalView, JournalViewFiltersSetting} from '@/types/journal'
import DeleteIcon from '@material-ui/icons/Delete'
import notePropTypes from '@/types/constants/note-attributes'
import {
  DenseListItem,
  DenseListItemBoxNoHover,
  DenseListItemIcon
} from '@/components/OxOUI/List'
import { MarginDivider5 } from '@/components/OxOUI/Divider'
import AddIcon from '@material-ui/icons/Add'
import { DenseSelect, DenseSelectItem } from "@/components/OxOUI/Select";
import {BootstrapInput} from "@/components/OxOUI/Input";
import {JournalContext} from "@/app/Noxo/Journal";


interface JournalViewFiltersSettingEnhanced extends JournalViewFiltersSetting {
  type: string
}

const FilterSetting: React.FunctionComponent = () => {
  const context = useContext(JournalContext)
  const { viewId } = context

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover'
  })
  const {
    views, attrs: jourAttrs
  }: JournalState = useSelector(state => state.get('journal'))
  const curViewIndex = views.findIndex(x => x.viewId === viewId)
  const curViewInfo = views[curViewIndex] as JournalView

  const handleChange = (index: number, payload: any) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === viewId)
    let newSetting = newViews[viewIndex].filters.settings
    newSetting[index] = {
      ...newSetting[index],
      ...payload
    }
    // action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleChangeRelation = (relation: any) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === viewId)
    newViews[viewIndex].filters.relation = relation
    // action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleDelete = (index: number) => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === viewId)
    let newSetting = newViews[viewIndex].filters.settings
    newSetting.splice(index, 1)
    // action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  const handleNewFilter = () => {
    let newViews = JSON.parse(JSON.stringify(views)) as Array<JournalView>
    let viewIndex = newViews.findIndex(x => x.viewId === viewId)
    newViews[viewIndex].filters.settings.push({
      attrId: '',
      operator: '',
      target: '',
      date: 0
    })
    // action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { views: newViews })
  }

  if (!viewId) return <Button>筛选</Button>

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
              {setting.attrId && setting.operator && notePropTypes[setting.type].operators.map(x => {
                if (x.label === setting.operator) {
                  if (x.target === 'input') {
                    return (
                      <BootstrapInput
                        key={x.label}
                        value={setting.target}
                        onChange={e =>
                          handleChange(index, { target: e.target.value })
                        }
                      />
                    )
                  } else if (x.target === 'selection') {
                    const range: Array<AttributeRangeType> = jourAttrs[jourAttrs.findIndex(x => x.attrId === setting.attrId)].range || []
                    return (
                      <DenseSelect
                        key={x.label}
                        variant="outlined"
                        value={setting.target}
                        onChange={e =>
                          handleChange(index, { target: e.target.value })
                        }
                        displayEmpty>
                        {range.map(r => (
                          <DenseSelectItem key={r.id} value={r.id}>
                            {r.label}
                          </DenseSelectItem>
                        ))}
                      </DenseSelect>
                    )
                  } else {
                    return <Fragment key={x.label}/>
                  }
                } else {
                  return <Fragment key={x.label}/>
                }
              })}
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
