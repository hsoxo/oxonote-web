import React, { useContext } from 'react'
import { FlexBox, FlexCenteredBox, RightBox } from '@/components/OxOUI/OxOBox'
import ViewsManager from './Views'
import AttributeSetting from './Attributes'
import NewNote from './NewNote'
import GroupBySetting from '@/app/Noxo/Journal/Toolbar/Groupby'
import { JournalContext } from '@/app/Noxo/Journal'
import { JournalState } from '@/types/states'
import { useSelector } from '@/store'
import { JOURNAL_KANBAN_VIEW, JournalView } from '@/types/journal'

const JournalToolbar = () => {
  const context = useContext(JournalContext)
  const { viewId } = context

  const { views }: JournalState = useSelector(state => state.get('journal'))

  const curView = views.find(x => x._id === viewId) as JournalView

  return (
    <FlexCenteredBox>
      <FlexBox>
        <ViewsManager />
      </FlexBox>
      <RightBox>
        {curView.type === JOURNAL_KANBAN_VIEW ? <GroupBySetting /> : null}
        <AttributeSetting />
        {/*<FilterSetting />*/}
        {/*<SortSetting />*/}
        <NewNote />
      </RightBox>
    </FlexCenteredBox>
  )
}

export default JournalToolbar
