import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

import sagaAction from '@/store'
import * as JOURNAL_ACT from '@/store/journal/actions'

import { sidebarWidth } from '../config'
import JournalTreeView from './SidebarJournalTree'
import HeaderButton from '@/app/Noxo/Layout/Sidebar/HeaderButton'

const useStyles = makeStyles(theme => ({
  listItem: {
    height: 30,
    '&hover': {
      backgroundColor: 'var(--secondary-bg-hover)'
    }
  },
  listItemIcon: {
    minWidth: 30,
    flex: 'none'
  },
  drawer: {
    width: 0,
    flexShrink: 0
  },
  drawerPaper: {
    width: sidebarWidth,
    backgroundColor: 'var(--secondary-bg)',
    color: 'var(--secondary-text)',
    borderRight: 0,
    zIndex: 0
  },
  btmArea: {
    position: 'absolute',
    bottom: 0,
    width: sidebarWidth
  },
  menuIcon: {
    minWidth: 20
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}))

interface SidebarProps {
  active: boolean
  onToggleSidebar: { (): void }
}

const Index = ({ active, onToggleSidebar }: SidebarProps) => {
  const classes = useStyles()
  const springStyle = useSpring({
    to: { transform: active ? 'translateX(0%)' : 'translateX(-100%)' },
    config: { mass: 1, tension: 300, friction: 26 }
  })

  const handleCreateJournal = async () => {
    sagaAction({ type: JOURNAL_ACT.SAGA_JOURNAL_CREATE })
  }

  return (
    <SidebarWrapper style={springStyle}>
      <ToggleButtonWrapper
        style={{
          left: active ? `${sidebarWidth - 20}px` : `${sidebarWidth - 10}px`,
          zIndex: 20
        }}
        onClick={onToggleSidebar}
      >
        <NavigateBeforeIcon
          fontSize="small"
          style={{
            transform: active ? '' : 'rotate(180deg)',
            transition: 'transform ease 400ms'
          }}
        />
      </ToggleButtonWrapper>
      <HeaderButton />
      <div style={{ height: 40 }} />
      <List>
        <JournalTreeView />
      </List>
      <div className={classes.btmArea}>
        <List>
          <ListItem
            className={classes.listItem}
            button
            onClick={handleCreateJournal}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={'新建笔记本'} />
          </ListItem>
        </List>
      </div>
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled(animated.div)`
  height: 100vh;
  width: ${sidebarWidth}px;
  background-color: var(--secondary-bg);
  position: fixed;
`
const ToggleButtonWrapper = styled.button`
  position: absolute;
  top: 50px;
  background-color: var(--secondary-bg);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 2px;
  border: 0;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
`

export default Index
