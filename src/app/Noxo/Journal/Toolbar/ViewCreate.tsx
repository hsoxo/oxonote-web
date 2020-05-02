import React, {ChangeEvent, ReactNode, useState} from 'react';
import {MarginDivider5} from "@/components/OxOUI/Divider";
import {DenseListItem, DenseListItemIcon} from "@/components/OxOUI/List";
import AddIcon from "@material-ui/icons/Add";
import {Box, Button, Grid, ListItem, Popover} from "@material-ui/core";
import {bindPopover, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import sagaAction, { useSelector } from "@/store";
import CheckIcon from '@material-ui/icons/Check';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import ViewModuleRoundedIcon from '@material-ui/icons/ViewModuleRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import {BootstrapInput} from "@/components/OxOUI/Input";
import {JournalState, NoteState} from "@/types/states";
import {v4 as uuid} from "uuid";
import {JournalViewTypes} from "@/types/journal";
import {nanoid} from "nanoid";
import {SAGA_CREATE_VIEW} from "@/store/journal/actions";

interface ViewTypeSetting {
  id: JournalViewTypes
  label: string
  icon: ReactNode
  desc: string
}

const ViewTypes: Array<ViewTypeSetting> = [
  {
    id: 'list',
    label: '列表',
    icon: <ViewListRoundedIcon color="inherit"/>,
    desc: '基本的视图，适合笔记'
  },
  {
    id: 'table',
    label: '表格',
    icon: <TableChartRoundedIcon />,
    desc: '显示所有的属性，比较适合结构化数据'
  },
  {
    id: 'gallery',
    label: '画廊',
    icon: <DashboardRoundedIcon />,
    desc: '网格状的卡片'
  },
  {
    id: 'board',
    label: '看板',
    icon: <ViewModuleRoundedIcon />,
    desc: '看版型的视图，比较适合项目计划'
  },
]

const ViewCreate = () => {
  const [name, setName] = useState('')
  const [view, setView] = useState<JournalViewTypes>('list')

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })

  const handleCreate = () => {
    if (!name) return;
    sagaAction({ type: SAGA_CREATE_VIEW, viewType: view, viewLabel: name})
  }

  return (
    <div>
      <DenseListItem button={true} {...bindTrigger(popupState)}>
        <DenseListItemIcon>
          <AddIcon fontSize="small" />
        </DenseListItemIcon>
        {'新建视图'}
      </DenseListItem>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            minWidth: '200px'
          }}}
      >
        <Box>
          <div style={{ height: '0.6rem' }} />
          <BootstrapInput
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
          {ViewTypes.map(x => (
            <ListItem button key={x.id} onClick={() => setView(x.id)}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={2}>
                  {x.icon}
                </Grid>
                <Grid item xs={10}>
                  <Box display="flex" height="1.5rem">
                    <Box marginRight="auto">
                      {x.label}
                    </Box>
                    {view === x.id && <CheckIcon/>}
                  </Box>
                  <Box color="var(--secondary-text)">
                    {x.desc}
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <Button variant="contained" color="primary" fullWidth onClick={handleCreate}>
            创建
          </Button>
          <Box height="0.3rem"/>
          <MarginDivider5 />
          <DenseListItem button>
            {"❓️更多帮助"}
          </DenseListItem>
          <div style={{ height: '0.3rem' }} />
        </Box>
      </Popover>
    </div>
  );
};

export default ViewCreate;