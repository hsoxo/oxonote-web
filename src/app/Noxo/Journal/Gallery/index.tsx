import React, {useContext} from 'react'
import {Box, Grid} from "@material-ui/core";
import GalleryCard from './Card'

import {MarginBox} from "@/components/OxOUI/OxOBox";
import {JournalState} from "@/types/states";
import {useSelector} from "@/store";
import {JournalContext} from "@/app/Noxo/Journal";

type JournalListViewProps = {
  viewId: string
}

const JournalGalleryView = (props: JournalListViewProps) => {
  const { journal, views, notes, attrs }: JournalState = useSelector(state => state.get('journal'))
  const context = useContext(JournalContext)
  const { viewId } = context
  const curView = views.find(x => x._id === viewId)

  if (!curView)
    return <Box>Error</Box>

  return (
    <MarginBox>
      <Grid container>
        { curView &&
        notes.map(x => (
          <Grid item xs={3} key={x._id}>
            <GalleryCard {...x}/>
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


