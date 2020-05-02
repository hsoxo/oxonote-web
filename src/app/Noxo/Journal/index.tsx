import React, { createContext, Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Divider, Fade, LinearProgress, Slide } from '@material-ui/core'
import sagaAction, { useSelector } from '@/store'
import TitleBlock from '../components/Title'
import JournalToolbar from './Toolbar'
import JournalListView from '@/app/Noxo/Journal/List'
import { JournalState, NoteState } from '@/types/states'
import JournalGalleryView from '@/app/Noxo/Journal/Gallery'
import * as JOURNAL_ACT from '@/store/journal/actions'
import debounce from 'lodash/debounce'
import {useTransition, animated, config} from "react-spring";

export const JournalContext = createContext({
  viewId: '',
  handleChangeView: (viewId: string) => {}
})

const handleSaveInfo = debounce(
  (key: string, value: string) => {
    sagaAction({
      type: JOURNAL_ACT.SAGA_UPDATE_INFO,
      payload: { [key]: value }
    })
  },
  1000
)

const Journal = (props: React.ComponentProps<any>) => {
  const history = useHistory()
  const journalId = props.match.params.id
  const viewId = props.match.params.view
  const [activeViewId, setActiveViewId] = useState(viewId)

  const { journal, views }: JournalState = useSelector(state =>
    state.get('journal')
  )

  const handleChangeView = (viewId: string) => {
    setActiveViewId(viewId)
  }

  useEffect(() => {
    sagaAction({ type: JOURNAL_ACT.SAGA_JOURNAL_READ, journalId: journalId })
  }, [journalId])

  useEffect(() => {
    if (!viewId && Array.isArray(views) && views.length > 0 && views[0]._id.startsWith(journalId))
      history.push(`/o/journal/${journalId}/${views[0]._id}`)
    if (viewId !== activeViewId)
      setActiveViewId(viewId)
  }, [viewId, activeViewId, views, setActiveViewId])

  let viewInfo = views.filter(x => x._id === activeViewId)

  const transitions = useTransition(viewInfo, item => item._id, {
    from: { transform: 'translate3d(0,80px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { opacity: 0, height: 0 },
    config: function(item) {
      const state = arguments[1]
      if (state === 'leave') return {duration: 0}
      return config.default
    }
  })

  return (
    <div>
      {transitions.map(({ item, props, key }) =>
        item ? (
          <animated.div key={key} style={props}>
            <JournalContext.Provider
              value={{
                viewId: activeViewId,
                handleChangeView
              }}
            >
              {viewInfo.length > 0 && (
                <Fragment>
                  <TitleBlock
                    title={journal.title}
                    titleIcon={journal.titleIcon}
                    onChange={handleSaveInfo}
                  />
                  <JournalToolbar />
                  <Divider />
                  {viewInfo[0].type === 'list' && <JournalListView />}
                  {viewInfo[0].type === 'board' && <JournalListView />}
                  {viewInfo[0].type === 'gallery' && (
                    <JournalGalleryView viewId={activeViewId} />
                  )}
                  {viewInfo[0].type === 'table' && <JournalListView />}
                </Fragment>
              )}
            </JournalContext.Provider>
          </animated.div>
      ) : null)}
    </div>
  )
}

export default React.memo(
  Journal,
  (prev, next) =>
    prev.match.params.id === next.match.params.id &&
    prev.match.params.view === next.match.params.view
)
