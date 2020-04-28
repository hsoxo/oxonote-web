// @ts-nocheck
import React, { useRef } from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';
import clsx from "clsx";

import { sidebarWidth } from './config'
import sagaAction from "@/store";
import * as JOURNAL_ACT from "@/store/journal/actions"
import JournalTreeView from "./SidebarJournalTree";
import {SAGA_LOGOUT} from "@/store/global/actions";
import {useTransition, useChain, animated, config, useSpring} from "react-spring";
import styled from "styled-components";
import {Transition} from "react-spring/renderprops-universal";

const useStyles = makeStyles((theme) => ({
  listItem: {
    height: 30,
    '&hover': {
      backgroundColor: 'var(--secondary-bg-hover)'
    }
  },
  listItemIcon: {
    minWidth: 30,
    flex: 'none',
  },
  btmArea: {
    position: 'absolute',
    bottom: 0,
    width: sidebarWidth,
  },
  drawer: {
    width: 0,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sidebarWidth,
    backgroundColor: 'var(--secondary-bg)',
    color: 'var(--secondary-text)',
    borderRight: 0,
    zIndex: 0,
  },
  menuIcon: {
    minWidth: 20,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));


interface SidebarProps {
  active: boolean
  onToggleSidebar: {(): void}
}

const Sidebar = ({ active, onToggleSidebar }: SidebarProps) => {
  const classes = useStyles();
  const springStyle = useSpring({
    to: { transform: active ? "translateX(0%)" : "translateX(-100%)" },
    config: { mass: 1, tension: 300, friction: 26 }
  })

  const handleCreateJournal = async () => {
    sagaAction({ type: JOURNAL_ACT.SAGA_JOURNAL_CREATE })
  }

  return (
    <div>
      <SidebarWrapper style={springStyle}>
        <ListItem>
          <ListItemText primary={"OxO Notes"} />
          <ListItemIcon className={classes.menuIcon}>
            <IconButton
              edge="end"
              // style={{float: "right"}}
              size={"small"}
              onClick={onToggleSidebar}>
              <NavigateBeforeIcon/>
            </IconButton>
          </ListItemIcon>
        </ListItem>
        <List>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}>
              <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary={"搜索"} />
          </ListItem>
          <ListItem className={classes.listItem} button onClick={handleCreateJournal}>
            <ListItemIcon className={classes.listItemIcon}>
              <AddIcon/>
            </ListItemIcon>
            <ListItemText primary={"新建笔记本"} />
          </ListItem>
        </List>
        <div style={{height: 20}} />
        <List>
          <JournalTreeView />
        </List>
        <div style={{height: 20}} />
        <Box className={classes.btmArea}>
          <List>
            <ListItem className={classes.listItem} button onClick={() => sagaAction({ type: SAGA_LOGOUT })}>
              <ListItemText primary={"Log out"} />
            </ListItem>
          </List>
        </Box>
      </SidebarWrapper>
    </div>
  )
}

const SidebarWrapper = styled(animated.div)`
  height: 100vh;
  width: ${sidebarWidth}px;
  background-color: var(--secondary-bg);
`

export default Sidebar
