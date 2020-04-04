import React from 'react'
import loadable from '@loadable/component'
// default
const defaultLoad = () => <div />

export interface InnerRouteProps {
	routes: Array<RouteObject>
}

export interface InnerRouteState {
	something: number
}

interface RouteObject {
	path: string
	component: any
	routes?: Array<RouteObject>
}

const config: Array<RouteObject> = [
	// {
	// 	path: '/',
	// 	exact: true,
	// 	component: Layout,
	// },
	// {
	// 	path: '/login',
	// 	component: Loadable({
	// 		loader: () => import('../pages/Login'),
	// 		loading: defaultLoad,
	// 	}),
	// },
	{
		path: '/o',
		component: loadable(() => import('@/app/note/index')),
		routes: [
			{
				path: '/o/journal/:id',
				component: loadable(() => import('@/app/note/Journal/index')),
			},
			// {
			//     path: '/note/editor/:id',
			//     component: Loadable({
			//         loader: () => import('../pages/Note'),
			//         loading: defaultLoad
			//     }),
			// },
		],
	},
]

export default config
