import React from 'react'
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";

import { MarginBox } from "@/components/OxOUI/OxOBox";
import {NoteState} from "@/types/states";
import {useSelector} from "@/store";
import {JournalView} from "@/types/journal";

type JournalListViewProps = {
  viewId: string
}

const JournalTableView = (props: JournalListViewProps) => {
  const { curJournal }: NoteState = useSelector(state => state.get('note'))
  const { views, notes } = curJournal
  const curViewSetting = views.find(x => x.viewId === props.viewId)

  return (
    <MarginBox>
      { curViewSetting &&
      notes.map(x => (
        <Link to={`/o/editor/${x._id}`} key={x._id}>
        </Link>
      ))}
    </MarginBox>
  )
}

export default React.memo(
  JournalTableView,
  (prev, next) => prev.viewId === next.viewId
)


