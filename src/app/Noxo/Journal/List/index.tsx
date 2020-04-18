import React from 'react'
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import JournalListViewRow from './Row'

import { MarginBox } from "@/components/OxOUI/OxOBox";
import {JournalState, NoteState} from "@/types/states";
import {useSelector} from "@/store";
import {JournalView} from "@/types/journal";
import listHelper from "./list-helper";

type JournalListViewProps = {
  viewId: string
}

const JournalListView = (props: JournalListViewProps) => {
  const { journal, views, notes, attrs }: JournalState = useSelector(state => state.get('journal'))
  const curViewSetting = views.find(x => x.viewId === props.viewId)

  if (!curViewSetting)
    return <Box>Error</Box>

  const showedNotes = listHelper(journal, notes, curViewSetting)
  return (
    <MarginBox>
      { curViewSetting &&
        showedNotes.map(x => (
        <Link to={`/o/editor/${x._id}`} key={x._id}>
          <JournalListViewRow key={x._id} info={x} viewSetting={curViewSetting} jourAttrs={attrs}/>
        </Link>
        ))}
    </MarginBox>
  )
}

export default React.memo(
  JournalListView,
  (prev, next) => prev.viewId === next.viewId
)


