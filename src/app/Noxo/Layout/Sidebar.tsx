import React, { useCallback, useState, useRef } from 'react'
import { Box, Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { sidebarWidth } from './config'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useMappedState} from 'redux-react-hook';
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom'
import action, {useSelector} from "@/store";
import noteAct from "@/store/note/actions"
import clsx from "clsx";
import {NoteState} from "@/types/states";
import {JournalObject} from "@/types/journal";
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import JournalTreeView from "@/app/Noxo/Layout/SidebarJournalTree";

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
        action(noteAct.SAGA_CREATE_JOURNAL)
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
