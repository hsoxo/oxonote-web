import React, { useContext } from 'react'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import JournalListViewRow from './Row'

import { MarginBox } from '@/components/OxOUI/OxOBox'
import { JournalState } from '@/types/states'
import { useSelector } from '@/store'
import { JournalAttribute } from '@/types/journal'
import listHelper from './list-helper'
import { JournalContext } from '@/app/Noxo/Journal'

const JournalListView = () => {
  const { journal, views, notes, attrs }: JournalState = useSelector(state =>
    state.get('journal')
  )
  const context = useContext(JournalContext)
  const { viewId } = context
  const curView = views.find(x => x._id === viewId)

  if (!curView) return <Box>Error</Box>

  const activeAttrs: Array<JournalAttribute> = []
  journal.attrIds.forEach(attrId => {
    const exist = attrs.find(y => y._id === attrId)
    if (exist) {
      const isActive = curView.attribute.some(
        y => y.attrId === exist._id && y.status
      )
      if (isActive) {
        activeAttrs.push(exist)
      }
    }
  })

  const showedNotes = listHelper(journal, notes, curView)
  return (
    <MarginBox>
      {curView &&
        showedNotes.map(x => (
          <Link to={`/o/editor/${x._id}`} key={x._id}>
            <JournalListViewRow
              key={x._id}
              note={x}
              view={curView}
              activeAttrs={activeAttrs}
            />
          </Link>
        ))}
    </MarginBox>
  )
}

export default JournalListView
