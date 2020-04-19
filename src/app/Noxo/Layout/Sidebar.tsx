import React from 'react'
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
import action from "@/store";
import * as JOURNAL_ACT from "@/store/journal/actions"
import JournalTreeView from "./SidebarJournalTree";

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

const btm = [
    {
        label: 'Help',
        icon: <HelpIcon/>
    },
    {
        label: 'Setting',
        icon: <SettingsIcon/>
    },
    {
        label: 'Trash',
        icon: <DeleteForeverIcon/>
    },
]


interface SidebarProps {
    active: boolean
    onToggleSidebar: {(): void}
}

const Sidebar = (props: SidebarProps) => {
    const classes = useStyles();

    const handleCreateJournal = async () => {
        action({ type: JOURNAL_ACT.SAGA_JOURNAL_CREATE })
    }

    const { active } = props
    return (
        <Drawer
            className={clsx(classes.drawer)}
            variant="persistent"
            anchor="left"
            open={active}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <ListItem>
                <ListItemText primary={"OxO Notes"} />
                <ListItemIcon className={classes.menuIcon}>
                    <IconButton
                        edge="end"
                        // style={{float: "right"}}
                        size={"small"}
                        onClick={props.onToggleSidebar}>
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
                    {btm.map(item => (
                        <ListItem className={classes.listItem} button key={item.label}>
                            <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>

            </Box>
        </Drawer>
    )
}

export default Sidebar
