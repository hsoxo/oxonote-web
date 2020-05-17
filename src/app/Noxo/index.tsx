import React, { Suspense, useEffect, useState } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { animated, useSpring, useTransition } from 'react-spring'
import styled from 'styled-components'
import PouchDB from 'pouchdb-browser'

import { FlexBox } from '@/components/OxOUI/OxOBox'
import ClapSpinner from '@/components/Spiner'
import { InnerRouteProps } from '@/routes'
import { GlobalState } from '@/types/states'
import sagaAction, { action, useSelector } from '@/store'
import { SAGA_LOAD_USER, setDBSyncStatus } from '@/store/global/actions'
import { getToken } from '@/utils/auth'

import { navbarHeight, sidebarWidth } from './Layout/config'
import Sidebar from './Layout/Sidebar'
import Navbar from './Layout/Navbar'

PouchDB.plugin(require('pouchdb-authentication'))

const NoteLayout: React.FunctionComponent<
  InnerRouteProps & RouteComponentProps
> = props => {
  const [state, toggleState] = React.useState(true)
  const handleToggleState = () => toggleState(!state)

  const { routes } = props

  const {
    globalLoading,
    browserDBConn,
    remoteDBInfo
  }: GlobalState = useSelector(state => state.get('global'))
  const [
    syncHandler,
    setSyncHandler
  ] = useState<PouchDB.Replication.Sync<{}> | null>(null)

  useEffect(() => {
    if (!browserDBConn) {
      sagaAction({ type: SAGA_LOAD_USER, payload: props.location.pathname })
    }
  }, [browserDBConn])

  useEffect(() => {
    if (browserDBConn && remoteDBInfo) {
      const { user: pdbUser, database } = remoteDBInfo
      var remote = new PouchDB(
        `${process.env.NOXO_COUCH_ADDRESS}/${database}`,
        {
          skip_setup: true,
          fetch: function (url, opts) {
            // @ts-ignore
            opts.headers.set('x-noxo-token', getToken())
            // @ts-ignore
            opts.headers.set('x-noxo-key', pdbUser)
            return PouchDB.fetch(url, opts)
          }
        }
      )
      const sync = browserDBConn
        .sync(remote, {
          live: true,
          retry: true
        })
        .on('change', info => {})
        .on('paused', err => {
          action(setDBSyncStatus('idle'))
        })
        .on('active', () => {
          action(setDBSyncStatus('syncing'))
        })
        .on('denied', err => {
          action(setDBSyncStatus('error'))
        })
        .on('complete', info => {
          // handle complete
        })
        .on('error', err => {
          action(setDBSyncStatus('error'))
        })
      setSyncHandler(sync)
    }
    return () => {
      if (syncHandler) syncHandler.cancel()
    }
  }, [browserDBConn, remoteDBInfo])

  const leftStyle = useSpring({
    width: state ? `${sidebarWidth}px` : '0',
    minWidth: state ? `${sidebarWidth}px` : '0',
    maxWidth: state ? `${sidebarWidth}px` : '0'
  })

  const transitions = useTransition(!!browserDBConn, null, {
    from: { opacity: 0, width: '100%', display: 'flex', position: 'absolute' },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 280, friction: 30 }
  })
  const props1 = useSpring({ width: state ? 220 : 0 })

  leftStyle.width
  return (
    <FlexBox>
      <Suspense fallback="loading...">
        {transitions.map(({ item, key, props }) =>
          item ? (
            <animated.div key={1} style={props}>
              <animated.div style={leftStyle}>
                <Sidebar onToggleSidebar={handleToggleState} active={state} />
              </animated.div>
              <animated.div
                style={{
                  width: '100%',
                  position: 'absolute',
                  paddingLeft: leftStyle.width.interpolate((x: any) => x),
                  zIndex: -1
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Navbar onToggleSidebar={handleToggleState} shift={state} />
                  <MainWrapper>
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
              </animated.div>
            </animated.div>
          ) : (
            <animated.div key={2} style={props}>
              <StyledWrapper>
                <ClapSpinner size={60} />
              </StyledWrapper>
            </animated.div>
          )
        )}
      </Suspense>
    </FlexBox>
  )
}

const StyledWrapper = styled.div`
  margin-top: 30%;
  margin-left: 45%;
  transform: translateX(50%);
  font-size: 10%;
  //margin-top: 30%;
  text-align: center;
`

const MainWrapper = styled.div`
  flex-grow: 1;
  padding: 1.5rem 3rem;
  transition: margin ease 200ms;
  margin-left: 0;
  background-color: var(--primary-bg);
  overflow-y: scroll;
  font-size: 1rem;
  color: var(--primary-color);
  height: calc(100vh - ${navbarHeight}px);
`

export default NoteLayout
