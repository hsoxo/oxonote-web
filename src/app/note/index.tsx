import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import clsx from 'clsx'

import { Box } from '@material-ui/core/'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { InnerRouteProps } from "@/routes";
import action from "@/store";

import * as nt from '@/store/note/types'
import Sidebar from './components/Layout/Sidebar'
import Navbar from './components/Layout/Navbar'

import { sidebarWidth, navbarHeight } from "./components/Layout/config";
import '@/styles/base.css'
import { FlexBox } from "@/components/UI/FlexBox";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: 0,
		marginTop: navbarHeight,
		backgroundColor: 'var(--primary-bg)',
		color: 'var(--primary-color)',
		height: `calc(100vh - ${navbarHeight}px)`,
		width: `100vw`,
	},
	contentShift: {
		transition: theme.transitions.create('all', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: sidebarWidth,
		marginTop: navbarHeight,
		width: `calc(100vw - ${sidebarWidth}px)`,
	},
}));

const NoteLayout = (props: InnerRouteProps) => {
	const classes = useStyles();

    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

	const { routes } = props

	return (
		<FlexBox>
			<Suspense fallback="loading...">
				<Sidebar onToggleSidebar={toggleSidebar} active={sidebarOpen} />
				<Navbar onToggleSidebar={toggleSidebar} shift={sidebarOpen} />
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: sidebarOpen,
					})}>
					{routes.map((r, key) => {
						return (
							<Route
								component={r.component}
								exact={true}
								key={r.path + key}
								path={r.path}
							/>
						)
					})}
				</main>
			</Suspense>
		</FlexBox>
	)
}

export default NoteLayout
