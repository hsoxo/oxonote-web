import React, {Suspense, useEffect, useState} from 'react'
import { Route } from 'react-router-dom'
import { InnerRouteProps } from '@/routes'
import Sidebar from './Layout/Sidebar'
import Navbar from './Layout/Navbar'

import { sidebarWidth, navbarHeight } from './Layout/config'
import '@/styles/base.css'
import { FlexBox } from '@/components/OxOUI/OxOBox'
import styled from 'styled-components'
import {GlobalState} from "@/types/states";
import sagaAction, {action, useSelector} from "@/store";
import {CircularProgress} from "@material-ui/core";
import PouchDB from "pouchdb-browser";
import {put} from "redux-saga/effects";
import {SAGA_LOAD_USER, setDBSyncStatus} from "@/store/global/actions";

const SidebarWrapper = styled(Sidebar)``

const NavbarWrapper = styled(Navbar)``

type ToggleProps = {
	sidebar: boolean
}


const MainWrapper = styled.div`
  ${(p: ToggleProps) => ``};
  flex-grow: 1;
  padding: 3rem;
  transition: margin ease 200ms;
  margin-left: 0;
  margin-top: ${navbarHeight}px;
  background-color: var(--primary-bg);
  overflow-y: scroll;
  font-size: 1rem;
  color: var(--primary-color);
  height: calc(100vh - ${navbarHeight}px);
  width: 100vw;
  ${(p: ToggleProps) => {
	if (p.sidebar) return `
		margin-left: ${sidebarWidth}px;
		width: calc(100vw - ${sidebarWidth}px);
	`
	else return `
		margin-left: 0;
		width: 100vw;
	`
}};
`

const NoteLayout = (props: InnerRouteProps) => {
  const [state, toggleState] = React.useState(true)
  const handleToggleState = () => toggleState(!state)

  const { routes } = props

  const { dbSyncStatus, browserDBConn, remoteDBInfo }: GlobalState = useSelector(state => state.get('global'))
  const [syncHandler, setSyncHandler] = useState<PouchDB.Replication.Sync<{}> | null>(null)

  useEffect(() => {
    if (!browserDBConn) {
      sagaAction({ type: SAGA_LOAD_USER })
    }
  }, [browserDBConn])

  useEffect(() => {
    if (browserDBConn && remoteDBInfo) {
      const {user: pdbUser, password: pdbPass, database} = remoteDBInfo
      const RemoteDB = new PouchDB(`http://${pdbUser}:${pdbPass}@47.104.154.230:6381/${database}`)
      const sync = browserDBConn.sync(RemoteDB, {
        live: true,
        retry: true,
      }).on('change', (info) => {
        console.log(info)
      }).on('paused', (err) => {
        action(setDBSyncStatus('idle'))
      }).on('active', () => {
        action(setDBSyncStatus('syncing'))
      }).on('denied', (err) => {
        action(setDBSyncStatus('error'))
      }).on('complete', (info) => {
        // handle complete
      }).on('error', (err) => {
        action(setDBSyncStatus('error'))
      });
      setSyncHandler(sync)
    }
    return () => {
      if (syncHandler) syncHandler.cancel()
    }
  }, [browserDBConn, remoteDBInfo])
  // PouchDB.sync(PDB, RemoteDB, {
  //   live: true,
  //   heartbeat: false,
  //   timeout: false,
  //   retry: true
  // })
  //   .on('change', (info) => {
  //     console.log('sync onChange', info)
  //   })
  //   .on('paused', (err) => {
  //     // console.log(TAG, 'sync onPaused', err)
  //     // if (this.isAtCurrentScreen) {
  //     //   this.getListNoteFromDb()
  //     // }
  //   })
  //   .on('active', () => {
  //     // console.log(TAG, 'sync onActive')
  //   })
  //   .on('denied', (err) => {
  //     // console.log(TAG, 'sync onDenied', err)
  //   })
  //   .on('complete', (info) => {
  //     // console.log(TAG, 'sync onComplete', info)
  //   })
  //   .on('error', (err) => {
  //     // console.log(TAG, 'sync onError', err)
  //   })

  return (
    <FlexBox>
      <Suspense fallback="loading...">
        {browserDBConn ?
          <React.Fragment>
            <SidebarWrapper onToggleSidebar={handleToggleState} active={state} />
            <NavbarWrapper onToggleSidebar={handleToggleState} shift={state} />
            <div style={{height: '100vh'}}>

              <MainWrapper sidebar={state}>
                {routes.map((r, key) => {
                  return (
                    <Route
                      component={r.component}
                      exact
                      key={r.path + key}
                      path={r.path}
                    />
                  )
                })}
              </MainWrapper>

            </div>
          </React.Fragment>
          : null}
      </Suspense>
    </FlexBox>
  )
}

export default NoteLayout
