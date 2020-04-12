import React, {Suspense, useEffect} from 'react'
import { Route } from 'react-router-dom'
import { InnerRouteProps } from '@/routes'
import Sidebar from './Layout/Sidebar'
import Navbar from './Layout/Navbar'

import { sidebarWidth, navbarHeight } from './Layout/config'
import '@/styles/base.css'
import { FlexBox } from '@/components/OxOUI/OxOBox'
import styled from 'styled-components'
import NOTE_ACT from "@/store/note/action-declares";
import action from "@/store";


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
  useEffect(() => {
      action(NOTE_ACT.SAGA_READ_ALL_JOURNALS)
  }, [])

  return (
    <FlexBox>
      <Suspense fallback="loading...">
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
      </Suspense>
    </FlexBox>
  )
}

export default NoteLayout
