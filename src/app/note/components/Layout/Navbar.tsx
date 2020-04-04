import React, {useCallback} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { navbarHeight, sidebarWidth } from './config'
import clsx from "clsx";
import {useMappedState} from "redux-react-hook";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        minHeight: navbarHeight,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'var(--primary-bg)',
        color: 'var(--primary-text)',
        boxShadow: 'none',
    },
    appBarShift: {
        width: `calc(100% - ${sidebarWidth}px)`,
        marginLeft: sidebarWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxShadow: 'none',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
}));

interface SidebarProps {
    shift: boolean
    onToggleSidebar: {(): void}
}

const Navbar = (props: SidebarProps) => {
    const classes = useStyles();

    const title = '';

    return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: props.shift,
					})}>
					<Toolbar className={classes.toolbar}>
						<IconButton
							size="small"
							color="inherit"
							aria-label="open drawer"
							onClick={props.onToggleSidebar}
							edge="start"
							className={clsx(classes.menuButton, props.shift && classes.hide)}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							{title}
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		)
}

export default Navbar