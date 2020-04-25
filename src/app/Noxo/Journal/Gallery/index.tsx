import React from 'react'
import {Box, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import GalleryCard from './Card'

import { MarginBox } from "@/components/OxOUI/OxOBox";
import {JournalState, NoteState} from "@/types/states";
import {useSelector} from "@/store";
import {JournalView} from "@/types/journal";

type JournalListViewProps = {
  viewId: string
}

const JournalGalleryView = (props: JournalListViewProps) => {
  const { journal, views, notes }: JournalState = useSelector(state => state.get('journal'))
  const curViewSetting = views.find(x => x.viewId === props.viewId)

  return (
    <MarginBox>
      <Grid container>
        { curViewSetting &&
        notes.map(x => (
          <Grid item xs={3}>
           <GalleryCard key={x._id} {...x}/>
          </Grid>
        ))}
      </Grid>
    </MarginBox>
  )
}

export default React.memo(
  JournalGalleryView,
  (prev, next) => prev.viewId === next.viewId
)


