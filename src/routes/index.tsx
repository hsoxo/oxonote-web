import React from 'react'
import loadable from '@loadable/component'
// default

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


export const publicRoutes: Array<RouteObject> = [
  {
    path: '/login',
    component: loadable(() => import('@/app/Login'))
  },
]

export const privateRoutes: Array<RouteObject> = [
  {
    path: '/o',
    component: loadable(() => import('@/app/Noxo/index')),
    routes: [
      {
        path: '/o/journal/:id',
        component: loadable(() => import('@/app/Noxo/Journal/index'))
      },
      {
        path: '/o/journal/:id/:view',
        component: loadable(() => import('@/app/Noxo/Journal/index'))
      },
      {
        path: '/o/editor/:id',
        component: loadable(() => import('@/app/Noxo/Note/index'))
      }
    ]
  }
]

