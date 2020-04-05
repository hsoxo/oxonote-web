import React from 'react'
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import JournalListViewRow from './Row'

import { MarginBox } from "@/components/OxOUI/OxOBox";
import {NoteState} from "@/store/note/types";
import {useSelector} from "@/store";
import {JournalView} from "@/types/journal";

type JournalListViewProps = {
  viewId: string
}

const JournalListView = (props: JournalListViewProps) => {
  const { curJournal }: NoteState = useSelector(state => state.get('note'))
  const { views, notes } = curJournal
  const curViewSetting = views.find(x => x.viewId === props.viewId)

  return (
    <MarginBox>
      { curViewSetting &&
        notes.map(x => (
        <Link to={`/o/editor/${x._id}`} key={x._id}>
          <JournalListViewRow key={x._id} info={x} viewSetting={curViewSetting} jourAttrs={curJournal.jourAttrs}/>
        </Link>
        ))}
    </MarginBox>
  )
}

export default React.memo(
  JournalListView,
  (prev, next) => prev.viewId === next.viewId
)


